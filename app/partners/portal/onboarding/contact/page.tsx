import { requirePartnerUser } from "@/lib/partner-auth";
import { redirect } from "next/navigation";
import { ContactFormClient } from "./contact-form-client";

export default async function PartnerContactOnboardingPage() {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    redirect("/partners/portal/onboarding/org");
  }

  return <ContactFormClient providerOrgId={partner.providerOrgId} email={partner.email} name={partner.name} />;
}
