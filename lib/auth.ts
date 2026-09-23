import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";

function displayName(firstName: string | null, lastName: string | null, username: string | null) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return fullName || username || "User";
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "company";
}

async function uniqueCompanySlug(base: string) {
  let slug = base;
  let suffix = 2;

  while (await db.orm.public.Company.where({ slug }).first()) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function ensureUserAndCompany() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("The signed-in Clerk user has no email address.");
  }

  const name = displayName(clerkUser.firstName, clerkUser.lastName, clerkUser.username);

  let user = await db.orm.public.User.where({ clerkId: clerkUser.id }).first();

  if (!user) {
    user = await db.orm.public.User.create({
      clerkId: clerkUser.id,
      email,
      name,
      role: "REQUESTER",
    });
  } else if (user.email !== email || user.name !== name) {
    await db.orm.public.User.where({ id: user.id }).update({ email, name });
    user = { ...user, email, name };
  }

  if (user.companyId != null) {
    const company = await db.orm.public.Company.where({ id: user.companyId }).first();

    if (!company) {
      throw new Error("This user is linked to a company that does not exist.");
    }

    return { user, company };
  }

  const companyName = `${name} Company`;
  const slug = await uniqueCompanySlug(slugify(companyName));

  const company = await db.transaction(async (tx) => {
    const created = await tx.orm.public.Company.create({
      name: companyName,
      slug,
    });

    await tx.orm.public.User.where({ id: user.id }).update({
      companyId: created.id,
      role: "ADMIN",
    });

    return created;
  });

  return {
    user: { ...user, companyId: company.id, role: "ADMIN" as const },
    company,
  };
}
