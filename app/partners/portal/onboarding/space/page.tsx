import { requirePartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { SpaceFormClient } from "./space-form-client";

export default async function PartnerSpaceOnboardingPage() {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    redirect("/partners/portal/onboarding/org");
  }

  // Fetch partner's venues
  const venues = await db.orm.public.Venue.where({
    providerOrgId: partner.providerOrgId,
  }).all();

  if (venues.length === 0) {
    redirect("/partners/portal/onboarding/venue");
  }

  return (
    <SpaceFormClient
      providerOrgId={partner.providerOrgId}
      venues={venues.map((v) => ({ id: v.id, name: v.name }))}
    />
  );
}

