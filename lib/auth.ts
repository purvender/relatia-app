import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";

export type AppUserRole =
  | "PLATFORM_ADMIN"
  | "COMPANY_ADMIN"
  | "ADMIN"
  | "REQUESTER"
  | "APPROVER"
  | "FINANCE";

export type AppScope = "platform" | "tenant";

export type AppUserWithCompany = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  role: AppUserRole;
  companyId: number;
  company: {
    id: number;
    name: string;
    slug: string;
  };
  context: { scope: "tenant"; companyId: number };
};

export type PlatformAdminUser = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  role: "PLATFORM_ADMIN";
  companyId: number | null;
  company?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  context: { scope: "platform" };
};

export type ScopedUser = AppUserWithCompany | PlatformAdminUser;

function displayName(
  firstName: string | null,
  lastName: string | null,
  username: string | null,
) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return fullName || username || "User";
}

export async function requireClerkUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  return clerkUser;
}

export async function ensureAppUser() {
  const clerkUser = await requireClerkUser();

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("The signed-in Clerk user has no email address.");
  }

  const name = displayName(
    clerkUser.firstName,
    clerkUser.lastName,
    clerkUser.username,
  );

  let user = await db.orm.public.User.where({ clerkId: clerkUser.id }).first();

  if (!user) {
    // Check if user exists by email (e.g. seeded user logging in via Clerk)
    user = await db.orm.public.User.where({ email }).first();

    if (user) {
      // Re-bind clerkId and name to the live Clerk login
      await db.orm.public.User.where({ id: user.id }).update({
        clerkId: clerkUser.id,
        name,
      });
      user = {
        ...user,
        clerkId: clerkUser.id,
        name,
      };
    } else {
      user = await db.orm.public.User.create({
        clerkId: clerkUser.id,
        email,
        name,
        role: "REQUESTER",
      });
    }
  } else if (user.email !== email || user.name !== name) {
    await db.orm.public.User.where({ id: user.id }).update({
      email,
      name,
    });

    user = {
      ...user,
      email,
      name,
    };
  }

  return user;
}

export async function requirePlatformAdmin(): Promise<PlatformAdminUser> {
  const user = await ensureAppUser();

  if (user.role !== "PLATFORM_ADMIN") {
    redirect("/dashboard");
  }

  let company: { id: number; name: string; slug: string } | null = null;
  if (user.companyId != null) {
    const dbCompany = await db.orm.public.Company.where({ id: user.companyId }).first();
    if (dbCompany) {
      company = {
        id: dbCompany.id,
        name: dbCompany.name,
        slug: dbCompany.slug,
      };
    }
  }

  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    name: user.name,
    role: "PLATFORM_ADMIN",
    companyId: user.companyId ?? null,
    company,
    context: { scope: "platform" },
  };
}

export async function requireScopedUser(): Promise<ScopedUser> {
  const user = await ensureAppUser();

  // Platform scope: allow companyId NULL, no workspace requirement.
  if (user.role === "PLATFORM_ADMIN") {
    let company: PlatformAdminUser["company"] = null;
    if (user.companyId != null) {
      const dbCompany = await db.orm.public.Company.where({ id: user.companyId }).first();
      if (dbCompany) {
        company = { id: dbCompany.id, name: dbCompany.name, slug: dbCompany.slug };
      }
    }
    return {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      role: "PLATFORM_ADMIN",
      companyId: user.companyId ?? null,
      company,
      context: { scope: "platform" },
    };
  }

  // Tenant scope: companyId is required.
  if (user.companyId == null) {
    redirect("/onboarding");
  }

  const company = await db.orm.public.Company.where({ id: user.companyId }).first();

  if (!company) {
    throw new Error("This user is linked to a company that does not exist.");
  }

  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    name: user.name,
    role: user.role as AppUserRole,
    companyId: user.companyId,
    company: {
      id: company.id,
      name: company.name,
      slug: company.slug,
    },
    context: { scope: "tenant", companyId: user.companyId },
  };
}

export async function requireTenantUser(): Promise<AppUserWithCompany> {
  const user = await requireScopedUser();
  // Block platform scope from tenant routes unless explicit tenant switch/impersonation exists.
  if (user.context.scope === "platform") {
    redirect("/dashboard/admin/providers");
  }
  // redirect() throws, so a platform user never reaches here.
  return user as AppUserWithCompany;
}

export async function requireAppUser(): Promise<AppUserWithCompany> {
  // Back-compat tenant guard. Platform callers must use requireScopedUser/requirePlatformAdmin.
  return requireTenantUser();
}

export async function requireOnboardingUser() {
  const user = await ensureAppUser();

  if (user.role === "PLATFORM_ADMIN") {
    redirect("/dashboard/admin/providers");
  }

  if (user.companyId != null) {
    redirect("/dashboard");
  }

  return user;
}

export async function getSessionUserId() {
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  return session.userId;
}

export async function requireUserRole(
  allowedRoles: Array<AppUserRole>,
): Promise<AppUserWithCompany> {
  // Tenant-only: PLATFORM_ADMIN is redirected to platform context above.
  const user = await requireTenantUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}