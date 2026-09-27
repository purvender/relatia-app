import { requirePartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { OfferingFormClient } from "./offering-form-client";

export default async function PartnerOfferingOnboardingPage() {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    redirect("/partners/portal/onboarding/org");
  }

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

  return (
    <OfferingFormClient
      providerOrgId={partner.providerOrgId}
      venues={venues.map((v) => ({ id: v.id, name: v.name }))}
      spaces={spaces.map((s) => ({ id: s.id, venueId: s.venueId, name: s.name }))}
    />
  );
}
