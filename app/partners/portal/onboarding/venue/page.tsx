import { requirePartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";
import { VenueFormClient } from "./venue-form-client";

export default async function PartnerVenueOnboardingPage() {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    redirect("/partners/portal/onboarding/org");
  }

  return <VenueFormClient providerOrgId={partner.providerOrgId} />;
}
