import { requirePartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { SubmitReviewClient } from "./submit-review-client";

export default async function PartnerSubmitOnboardingPage() {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    redirect("/partners/portal/onboarding/org");
  }

  // Gather summary for the review page
  const org = await db.orm.public.ProviderOrganization.where({
    id: partner.providerOrgId,
  }).first();

  const contacts = await db.orm.public.ProviderContact.where({
    providerOrgId: partner.providerOrgId,
  }).all();

  const venues = await db.orm.public.Venue.where({
    providerOrgId: partner.providerOrgId,
  }).all();

  // Fetch spaces per venue (ORM doesn't support { in: [...] })
  const allSpacesArrays = await Promise.all(
    venues.map((v) =>
      db.orm.public.BookableSpace.where({ venueId: v.id }).all(),
    ),
  );
  const spaces = allSpacesArrays.flat();

  const offerings = await db.orm.public.Offering.where({
    providerOrgId: partner.providerOrgId,
  }).all();

  const alreadySubmitted = partner.onboardingStep === "SUBMITTED";

  return (
    <SubmitReviewClient
      partner={{
        name: partner.name,
        email: partner.email,
        onboardingStep: partner.onboardingStep,
        submittedAt: partner.submittedAt ?? null,
      }}
      summary={{
        orgName: org?.name ?? null,
        orgType: org?.providerType ?? null,
        city: org?.city ?? null,
        contactCount: contacts.length,
        venueCount: venues.length,
        spaceCount: spaces.length,
        offeringCount: offerings.length,
      }}
      alreadySubmitted={alreadySubmitted}
    />
  );
}
