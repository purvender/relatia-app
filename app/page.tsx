import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { HeroSection } from "@/components/marketing/hero-section";
import {
  TrustSection,
  FinanceSection,
  WorkflowSection,
  RolesSection,
  AISection,
  VenueSection,
  ReportingSection,
  TestimonialsSection,
  CtaSection,
} from "@/components/marketing/home-sections";

export const metadata: Metadata = {
  title: "Relatia — The Operating System for Enterprise Dining & Events",
  description:
    "Relatia helps enterprises discover venues, route approvals, control spend, issue GST-ready invoices, manage payments, and coordinate bookings — through one unified workflow.",
  openGraph: {
    title: "Relatia — Enterprise Dining & Events, Reimagined",
    description:
      "The unified platform for corporate dining, event planning, approvals, GST invoicing, and relationship-spend management.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <MarketingLayout>
      <HeroSection />
      <TrustSection />
      <WorkflowSection />
      <FinanceSection />
      <RolesSection />
      <AISection />
      <VenueSection />
      <ReportingSection />
      <TestimonialsSection />
      <CtaSection />
    </MarketingLayout>
  );
}