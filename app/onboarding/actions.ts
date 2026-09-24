"use server";

import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { requireOnboardingUser } from "@/lib/auth";

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

export async function createCompanyAction(formData: FormData) {
  const user = await requireOnboardingUser();

  const companyNameRaw = formData.get("companyName");

  if (typeof companyNameRaw !== "string") {
    throw new Error("Company name is required.");
  }

  const companyName = companyNameRaw.trim();

  if (companyName.length < 2) {
    throw new Error("Company name must be at least 2 characters long.");
  }

  if (companyName.length > 80) {
    throw new Error("Company name must be under 80 characters.");
  }

  const slug = await uniqueCompanySlug(slugify(companyName));

  const company = await db.transaction(async (tx) => {
    const createdCompany = await tx.orm.public.Company.create({
      name: companyName,
      slug,
    });

    await tx.orm.public.Policy.create({
      companyId: createdCompany.id,
      maxBudget: 50_000_000,
      perPersonCap: 1_000_000,
      allowedCities: [
        "Bengaluru",
        "Mumbai",
        "Delhi NCR",
        "Hyderabad",
        "Pune",
      ],
      approverRole: "APPROVER",
    });

    await tx.orm.public.User.where({ id: user.id }).update({
      companyId: createdCompany.id,
      role: "ADMIN",
    });

    return createdCompany;
  });

  redirect(`/dashboard`);
}