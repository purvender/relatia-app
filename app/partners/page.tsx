import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import {
  PartnersHero,
  PartnersValue,
  PartnersTiers,
  PartnersOperations,
  PartnersTestimonials,
  PartnersApplication,
} from "@/components/marketing/partners-sections";

export const metadata: Metadata = {
  title: "Hospitality Partners — Relatia | High-Value Corporate Dining Network",
  description:
    "Partner with Relatia to host Fortune 500 executive dinners, board meetings, and client entertainment. Guaranteed spends, verified budgets, and automated B2B settlements.",
  openGraph: {
    title: "Relatia Hospitality Partners — Fill Private Dining Rooms with Enterprise Accounts",
    description:
      "Join India's most exclusive network of luxury restaurants and luxury hotel dining rooms.",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <MarketingLayout>
      <PartnersHero />
      <PartnersValue />
      <PartnersTiers />
      <PartnersOperations />
      <PartnersTestimonials />
      <PartnersApplication />
    </MarketingLayout>
  );
}
