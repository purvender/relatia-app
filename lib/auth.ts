import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";

export type AppUserWithCompany = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  role: "ADMIN" | "REQUESTER" | "APPROVER" | "FINANCE";
  companyId: number;
  company: {
    id: number;
    name: string;
    slug: string;
  };
};

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

export async function requireAppUser(): Promise<AppUserWithCompany> {
  const user = await ensureAppUser();

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
    role: user.role as AppUserWithCompany["role"],
    companyId: user.companyId,
    company: {
      id: company.id,
      name: company.name,
      slug: company.slug,
    },
  };
}

export async function requireOnboardingUser() {
  const user = await ensureAppUser();

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
  allowedRoles: Array<AppUserWithCompany["role"]>,
): Promise<AppUserWithCompany> {
  const user = await requireAppUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}