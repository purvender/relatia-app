import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import {
  PartnersHero,
  PartnersSpacesTaxonomy,
  PartnersWorkflow,
  PartnersManagement,
  PartnersValue,
  PartnersTiers,
  PartnersTestimonials,
  PartnersApplication,
} from "@/components/marketing/partners-sections";

export const metadata: Metadata = {
  title: "Hospitality Partners & Venues — Relatia | High-Value Corporate Dining Network",
  description:
    "Partner with Relatia to host Fortune 500 executive dinners, board meetings, and client entertainment in private dining rooms and curated event spaces. Vetted corporate demand, structured host briefs, and B2B GST compliance.",
  openGraph: {
    title: "Relatia Hospitality Partners — Fill Private Dining Rooms with Enterprise Accounts",
    description:
      "Join India's curated network of luxury dining establishments, private clubs, and corporate event spaces.",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <MarketingLayout>
      <PartnersHero />
      <PartnersSpacesTaxonomy />
      <PartnersWorkflow />
      <PartnersManagement />
      <PartnersValue />
      <PartnersTiers />
      <PartnersTestimonials />
      <PartnersApplication />
    </MarketingLayout>
  );
}
