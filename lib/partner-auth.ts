import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";

export type PartnerUserRecord = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  providerOrgId: number | null;
  onboardingStep:
    | "ACCOUNT_CREATED"
    | "ORG_ADDED"
    | "CONTACT_ADDED"
    | "VENUE_ADDED"
    | "SPACE_ADDED"
    | "OFFERING_ADDED"
    | "SUBMITTED";
  submittedAt: string | null;
  acceptedAt: string | null;
  createdAt: string;
};

function displayName(
  firstName: string | null,
  lastName: string | null,
  username: string | null,
) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return fullName || username || "Partner";
}

/**
 * Ensure a PartnerUser record exists for the current Clerk session.
 * Creates one on first login. Does NOT require providerOrgId yet.
 */
export async function ensurePartnerUser(): Promise<PartnerUserRecord> {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/partners/login");
  }

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

  let partner = await db.orm.public.PartnerUser.where({
    clerkId: clerkUser.id,
  }).first();

  if (!partner) {
    // Check by email (e.g. pre-seeded partner or invite flow)
    partner = await db.orm.public.PartnerUser.where({ email }).first();

    if (partner) {
      await db.orm.public.PartnerUser.where({ id: partner.id }).update({
        clerkId: clerkUser.id,
        name,
      });
      partner = { ...partner, clerkId: clerkUser.id, name };
    } else {
      partner = await db.orm.public.PartnerUser.create({
        clerkId: clerkUser.id,
        email,
        name,
        onboardingStep: "ACCOUNT_CREATED",
      });
    }
  } else if (partner.email !== email || partner.name !== name) {
    await db.orm.public.PartnerUser.where({ id: partner.id }).update({
      email,
      name,
    });
    partner = { ...partner, email, name };
  }

  return {
    id: partner.id,
    clerkId: partner.clerkId,
    email: partner.email,
    name: partner.name,
    providerOrgId: partner.providerOrgId ?? null,
    onboardingStep: partner.onboardingStep as PartnerUserRecord["onboardingStep"],
    submittedAt: partner.submittedAt ?? null,
    acceptedAt: partner.acceptedAt ?? null,
    createdAt: partner.createdAt,
  };
}

/**
 * Require an authenticated partner. Redirects to /partners/login if no
 * Clerk session exists. Returns the PartnerUser record.
 */
export async function requirePartnerUser(): Promise<PartnerUserRecord> {
  return ensurePartnerUser();
}

/**
 * Assert that the current partner owns the given providerOrgId.
 * Throws if there is a mismatch (never silently continues).
 */
export function assertPartnerOwnsOrg(
  partner: PartnerUserRecord,
  providerOrgId: number,
): void {
  if (partner.providerOrgId !== providerOrgId) {
    throw new Error("Access denied: you do not own this provider organization.");
  }
}

/**
 * Update the partner user's onboarding step in the database.
 */
export async function advancePartnerStep(
  partnerId: number,
  step: PartnerUserRecord["onboardingStep"],
): Promise<void> {
  await db.orm.public.PartnerUser.where({ id: partnerId }).update({
    onboardingStep: step,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Link a partner user to a provider organization.
 */
export async function linkPartnerToOrg(
  partnerId: number,
  providerOrgId: number,
  step: PartnerUserRecord["onboardingStep"] = "ORG_ADDED",
): Promise<void> {
  await db.orm.public.PartnerUser.where({ id: partnerId }).update({
    providerOrgId,
    onboardingStep: step,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Mark the partner's profile as submitted for Relatia review.
 */
export async function submitPartnerForReview(
  partnerId: number,
): Promise<void> {
  await db.orm.public.PartnerUser.where({ id: partnerId }).update({
    onboardingStep: "SUBMITTED",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
