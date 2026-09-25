import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import {
  ContactHero,
  ContactFormSection,
  ContactFaq,
} from "@/components/marketing/contact-sections";

export const metadata: Metadata = {
  title: "Contact & Book Demo — Relatia | Enterprise Dining Operating System",
  description:
    "Schedule an executive consultation and live platform demo of Relatia. Streamline corporate dining approvals, GST invoicing, and relationship spend.",
  openGraph: {
    title: "Book a Demo — Relatia Enterprise Dining & Event Management",
    description:
      "Schedule a tailored consultation to see how Relatia eliminates expense friction and unlocks GST savings.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <MarketingLayout>
      <ContactHero />
      <ContactFormSection />
      <ContactFaq />
    </MarketingLayout>
  );
}
