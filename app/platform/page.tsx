import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { PlatformHero, PlatformPillars, PlatformArchitecture, PlatformIntegrations, PlatformSecurity, PlatformCta } from "@/components/marketing/platform-sections";

export const metadata: Metadata = {
  title: "Platform Architecture — Relatia | The Enterprise Dining Operating System",
  description:
    "Explore the Relatia platform architecture: Intelligent venue discovery, dynamic approval routing, GST-compliant invoicing, Razorpay corporate settlement, and AI spend intelligence.",
  openGraph: {
    title: "Relatia Platform — Enterprise Dining & Relationship Spend Architecture",
    description:
      "A complete walkthrough of Relatia's 5 core pillars, enterprise integration suite, and security compliance.",
    type: "website",
  },
};

export default function PlatformPage() {
  return (
    <MarketingLayout>
      <PlatformHero />
      <PlatformPillars />
      <PlatformArchitecture />
      <PlatformIntegrations />
      <PlatformSecurity />
      <PlatformCta />
    </MarketingLayout>
  );
}
