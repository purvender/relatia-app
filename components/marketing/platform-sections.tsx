"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeIn,
  FadeInUp,
  FadeInScale,
} from "./animations";

/* ================================================================
   1. PLATFORM HERO
   ================================================================ */
export function PlatformHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background glow & subtle grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--m-accent-warm)]/40 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e1d8_1px,transparent_1px),linear-gradient(to_bottom,#e5e1d8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-bg)]/80 px-3.5 py-1 text-xs font-medium tracking-wide uppercase text-[var(--m-text-secondary)] shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--m-brand)]" />
              Platform Architecture
            </div>
          </FadeIn>

          <FadeInUp delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--m-text)] leading-[1.12]">
              The unified operating system for{" "}
              <span className="italic font-normal text-[var(--m-brand)]">relationship spend</span>.
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-[var(--m-text-secondary)] leading-relaxed font-light">
              Relatia replaces fractured email chains, rogue corporate credit cards, and untracked hospitality budgets with a single, verifiable workflow engineered for modern enterprises.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--m-brand)] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.02]"
              >
                Schedule Architecture Briefing
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href="#pillars"
                className="inline-flex items-center justify-center rounded-full border border-[var(--m-border)] bg-[var(--m-bg)] px-6 py-3 text-sm font-medium text-[var(--m-text)] hover:bg-[var(--m-bg-alt)] transition-colors"
              >
                Explore 5 Core Pillars
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Live Lifecycle Map Component */}
        <FadeInScale delay={0.4}>
          <div className="mt-16 rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-6 sm:p-8 lg:p-10 shadow-sm backdrop-blur">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--m-border)] gap-4">
              <div>
                <span className="text-xs font-mono tracking-wider text-[var(--m-text-muted)] uppercase">State Engine</span>
                <h3 className="text-lg font-semibold text-[var(--m-text)] mt-0.5">End-to-End Event Lifecycle Flow</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--m-brand)]/10 text-[var(--m-brand)] text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--m-brand)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--m-brand)]"></span>
                </span>
                Deterministic State Validation
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { step: "01", state: "DRAFT", title: "Event Spec", desc: "Brief, headcount, guest tier & budget allocation" },
                { step: "02", state: "REQUESTED", title: "Multi-Tier Approval", desc: "Manager & Finance policy clearance" },
                { step: "03", state: "APPROVED", title: "Venue Lock", desc: "Curated availability & private dining reservation" },
                { step: "04", state: "VENUE_SELECTED", title: "Contract Finalized", desc: "Set menu, dietary & AV coordination" },
                { step: "05", state: "BOOKED", title: "Paid & Verified", desc: "Razorpay escrow / invoice reconciliation" },
                { step: "06", state: "COMPLETED", title: "GST Settlement", desc: "Automated B2B GST tax credit capture" },
              ].map((item, idx) => (
                <div
                  key={item.state}
                  className="relative rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-4 hover:border-[var(--m-brand)]/50 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--m-text-muted)]">
                    <span className="font-mono">{item.step}</span>
                    <span className="font-mono text-[10px] bg-[var(--m-bg-alt)] px-1.5 py-0.5 rounded text-[var(--m-text)] font-semibold group-hover:text-[var(--m-brand)]">
                      {item.state}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-[var(--m-text)]">{item.title}</h4>
                  <p className="mt-1 text-xs text-[var(--m-text-secondary)] leading-relaxed">{item.desc}</p>
                  {idx < 5 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[var(--m-border-dark)] pointer-events-none">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeInScale>
      </div>
    </section>
  );
}

/* ================================================================
   2. THE 5 CORE PILLARS
   ================================================================ */
export function PlatformPillars() {
  const pillars = [
    {
      id: "venues",
      number: "01",
      badge: "Hospitality Network",
      title: "Intelligent Venue Discovery & Curated Enterprise Network",
      summary: "Curated access to India’s premier dining institutions, Michelin-pedigree chefs, and private corporate suites.",
      description:
        "Unlike consumer booking platforms, Relatia maintains pre-negotiated corporate terms with top luxury hospitality groups (The Leela, Taj, Oberoi, ITC, premium standalone dining). Our discovery engine matches dining requests to guest tier, seating acoustics, AV requirements, dietary restrictions, and privacy protocols.",
      bullets: [
        "Private dining room (PDR) guaranteed minimum spends pre-negotiated",
        "Acoustic ratings and privacy certifications for confidential board dinners",
        "Multi-course bespoke tasting menus with real-time dietary handling",
        "Dedicated hospitality partner management on ground",
      ],
      metric: "500+",
      metricLabel: "Pre-verified enterprise venues across Mumbai, Delhi NCR, Bengaluru & Hyderabad",
    },
    {
      id: "approvals",
      number: "02",
      badge: "Governance & Compliance",
      title: "Dynamic Multi-Tier Approvals & Policy Engine",
      summary: "Rule-based approval workflows directly in Slack, Microsoft Teams, and Email—no portal logins required.",
      description:
        "Define policy thresholds based on department, cost center, per-head budget caps, alcohol policy, or client tier. Relatia routes approval notifications with rich contextual summaries: client name, past relationship ROI, and line-item budget.",
      bullets: [
        "Contextual one-click approvals inside Slack & Microsoft Teams",
        "Automatic escalation timers to avoid booking forfeiture",
        "Strict per-head limit enforcement with exception approval paths",
        "Audit-ready logs capturing timestamps, approver ID, and commentary",
      ],
      metric: "4.2 min",
      metricLabel: "Average approval cycle time, down from 3.8 days via email",
    },
    {
      id: "booking",
      number: "03",
      badge: "Concierge & Operations",
      title: "Full Booking Lifecycle & Guest Experience Concierge",
      summary: "End-to-end reservation operations handled with zero friction.",
      description:
        "From personalized digital invitations and RSVP dietary collection to customized table placements and wine pairing protocols, Relatia synchronizes corporate hosts with venue banquet directors in real time.",
      bullets: [
        "Executive guest dietary profile memory (allergies, preferences)",
        "Calendar synchronization (Google Workspace & Outlook 365)",
        "Digital host check-in dashboard with real-time guest arrivals",
        "Direct venue manager messaging channel for on-the-night adjustments",
      ],
      metric: "99.8%",
      metricLabel: "Event fulfillment success rate without scheduling conflict",
    },
    {
      id: "finance",
      number: "04",
      badge: "Finance & Reconciliation",
      title: "Finance Automation, GST Invoicing & Razorpay Reconciliation",
      summary: "Eliminate employee expense reports and maximize GST tax credit recoveries.",
      description:
        "Relatia eliminates messy corporate credit cards and lost paper receipts. Every booking generates a 100% compliant B2B tax invoice with matching GSTIN, SAC/HSN codes, and corporate entity breakdown. Automated Razorpay integration enables instant corporate virtual card payment or central billing terms.",
      bullets: [
        "100% compliant Indian GST invoices with automated 2B matching",
        "Razorpay payment gateway & escrow protection for large deposits",
        "Multi-entity corporate billing with departmental cost allocation",
        "Automated reconciliation against corporate ledger accounts",
      ],
      metric: "18%",
      metricLabel: "Direct tax savings recovered through automated GST credit capture",
    },
    {
      id: "ai",
      number: "05",
      badge: "Predictive Analytics",
      title: "AI Intelligence & Relationship Spend Analytics",
      summary: "Turn corporate hospitality from an unmeasured expense into a strategic growth asset.",
      description:
        "Relatia's AI engine analyzes historical event outcomes, attendee engagement, and business pipeline progression. Discover which venues deliver the highest deal closing rates, forecast quarterly dining budgets, and benchmark spend across teams.",
      bullets: [
        "Client relationship velocity scoring linked to corporate CRM data",
        "Spend leakage detection flagging unauthorized venue premiums",
        "Automated quarterly budget forecasting for executive leadership",
        "Benchmarking against industry spend standards across peer enterprises",
      ],
      metric: "3.4x",
      metricLabel: "Measured increase in enterprise client deal velocity",
    },
  ];

  return (
    <section id="pillars" className="py-24 bg-[var(--m-bg-alt)] border-y border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Core Architecture
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--m-text)] tracking-tight">
              The Five Pillars of Relatia
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--m-text-secondary)] font-light">
              Each component is engineered to operate seamlessly as an integrated whole, delivering flawless execution for enterprise teams.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 space-y-16">
          {pillars.map((pillar, idx) => (
            <FadeInUp key={pillar.id} delay={0.1}>
              <div
                id={pillar.id}
                className={`rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg)] p-8 lg:p-12 shadow-sm transition-all hover:border-[var(--m-brand)]/40 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                } flex flex-col lg:flex-row items-center gap-10 lg:gap-14`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[var(--m-brand)] bg-[var(--m-brand)]/10 px-2.5 py-1 rounded-full">
                      Pillar {pillar.number}
                    </span>
                    <span className="text-xs font-medium text-[var(--m-text-muted)] tracking-wider uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--m-text)] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-base text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {pillar.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {pillar.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5 text-xs text-[var(--m-text)]">
                        <span className="text-[var(--m-brand)] font-bold mt-0.5">✓</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--m-border)] flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-[var(--m-text)]">{pillar.metric}</span>
                    <span className="text-xs text-[var(--m-text-muted)] max-w-xs">{pillar.metricLabel}</span>
                  </div>
                </div>

                <div className="w-full lg:w-96 rounded-xl border border-[var(--m-border)] bg-[var(--m-card)] p-6 shadow-inner">
                  <div className="text-xs font-mono text-[var(--m-text-muted)] border-b border-[var(--m-border)] pb-3 mb-4 flex justify-between">
                    <span>SPECIFICATION</span>
                    <span className="text-[var(--m-brand)]">ACTIVE</span>
                  </div>
                  <div className="space-y-3 font-mono text-xs text-[var(--m-text-secondary)]">
                    <div className="flex justify-between py-1 border-b border-[var(--m-border)]/50">
                      <span className="text-[var(--m-text-muted)]">Target Persona</span>
                      <span className="text-[var(--m-text)] font-sans">
                        {idx === 0 ? "Exec Assistants & Hosts" : idx === 1 ? "CXOs & Department Heads" : idx === 2 ? "Event Coordinators" : idx === 3 ? "CFOs & Finance Controllers" : "CROs & Strategy Teams"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--m-border)]/50">
                      <span className="text-[var(--m-text-muted)]">Data Standard</span>
                      <span className="text-[var(--m-text)] font-sans">JSON-Schema / REST</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--m-border)]/50">
                      <span className="text-[var(--m-text-muted)]">Audit Logging</span>
                      <span className="text-[var(--m-text)] font-sans">Append-only immutable</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[var(--m-text-muted)]">SLA Commitment</span>
                      <span className="text-[var(--m-text)] font-sans">99.95% uptime</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   3. INTERACTIVE ARCHITECTURE VIEW
   ================================================================ */
export function PlatformArchitecture() {
  const [activeTab, setActiveTab] = useState<"planner" | "approver" | "finance">("planner");

  const tabData = {
    planner: {
      title: "For Event Planners & Executive Assistants",
      desc: "Instant search across pre-vetted private dining rooms with live availability, dietary coordination, and pre-negotiated corporate minimums.",
      mockupHeader: "Event Request • Executive Client Dinner",
      badge: "Step 1 of 4",
      items: [
        { label: "Guest Tier", val: "Tier 1 — Strategic Account CXO" },
        { label: "Headcount", val: "8 Guests • Private Room" },
        { label: "Dietary", val: "2 Jain, 1 Gluten-Free, 5 Non-Veg" },
        { label: "Estimated Spend", val: "₹72,000 (Incl. 18% GST)" },
      ],
      resultTitle: "Recommended Match",
      resultName: "The Library Bar & Private Salon — The Leela Palace",
      resultMeta: "Soundproofed • Dedicated Sommelier • Direct Billing Active",
    },
    approver: {
      title: "For Approvers & Business Leaders",
      desc: "One-click authorization with total context. Review client relationship value, historic deal revenue, and policy compliance in seconds.",
      mockupHeader: "Approval Request #REQ-8821 • Slack Notification",
      badge: "Action Required",
      items: [
        { label: "Host", val: "Ananya Sharma (VP Strategic Sales)" },
        { label: "Client Account", val: "Tata Consultancy Services" },
        { label: "Deal Pipeline", val: "₹4.8 Cr (Q3 Expansion)" },
        { label: "Budget Remaining", val: "₹3,40,000 / ₹5,00,000" },
      ],
      resultTitle: "Policy Analysis",
      resultName: "✓ Compliant with FY26 Hospitality Policy",
      resultMeta: "Per-head cost ₹9,000 is within Tier-1 client ceiling of ₹12,000.",
    },
    finance: {
      title: "For Finance Controllers & Tax Leads",
      desc: "Centralized Razorpay settlement, automated GST credit verification, and seamless journal entry synchronization to your ERP.",
      mockupHeader: "Invoice Reconciliation & Payment Settlement",
      badge: "Verified • 100% Tax Credit Captured",
      items: [
        { label: "Invoice Number", val: "REL-2026-INV-0491" },
        { label: "Vendor GSTIN", val: "29AABCL1234F1Z8 (The Leela)" },
        { label: "Client GSTIN", val: "27AAACR4567M1Z2" },
        { label: "Tax Component", val: "₹10,983 (CGST + SGST)" },
      ],
      resultTitle: "Payment Gateway",
      resultName: "Razorpay Corporate Escrow Verified",
      resultMeta: "Order ID: order_N9xK23L • Payment ID: pay_N9xM89K • Webhook 200 OK",
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="py-24 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
            Tailored Experiences
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
            Designed for every stakeholder in the enterprise
          </h2>
          <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
            Select a role to see how Relatia streamlines their day-to-day operations.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[var(--m-border)] pb-4">
          {(
            [
              { key: "planner", label: "Executive Assistants" },
              { key: "approver", label: "Approvers & Leadership" },
              { key: "finance", label: "Finance & Tax Controllers" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[var(--m-brand)] text-white shadow-sm"
                  : "bg-[var(--m-bg-alt)] text-[var(--m-text-secondary)] hover:text-[var(--m-text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-serif text-2xl text-[var(--m-text)]">{current.title}</h3>
              <p className="text-base text-[var(--m-text-secondary)] font-light leading-relaxed">
                {current.desc}
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-[var(--m-brand)] hover:underline"
                >
                  Request a tailored walkthrough for your team →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--m-border)]">
                  <span className="text-xs font-mono font-medium text-[var(--m-text-muted)]">
                    {current.mockupHeader}
                  </span>
                  <span className="text-xs font-semibold text-[var(--m-brand)] bg-[var(--m-brand)]/10 px-2 py-0.5 rounded">
                    {current.badge}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {current.items.map((it) => (
                    <div key={it.label} className="rounded-lg bg-[var(--m-bg)] p-3 border border-[var(--m-border)]">
                      <span className="text-[11px] text-[var(--m-text-muted)] block uppercase">{it.label}</span>
                      <span className="text-xs font-semibold text-[var(--m-text)] mt-1 block">{it.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-[var(--m-brand)]/20 bg-[var(--m-brand)]/5 p-4">
                  <div className="text-[11px] font-semibold text-[var(--m-brand)] uppercase tracking-wider">
                    {current.resultTitle}
                  </div>
                  <div className="text-sm font-semibold text-[var(--m-text)] mt-1">
                    {current.resultName}
                  </div>
                  <div className="text-xs text-[var(--m-text-secondary)] mt-0.5 font-light">
                    {current.resultMeta}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================
   4. INTEGRATION ECOSYSTEM
   ================================================================ */
export function PlatformIntegrations() {
  const integrations = [
    { name: "SAP S/4HANA", category: "Enterprise ERP", desc: "Automated general ledger syncing & purchase order matching." },
    { name: "Oracle NetSuite", category: "Cloud ERP", desc: "Two-way expense reconciliation & cost center validation." },
    { name: "TallyPrime", category: "Indian Accounting", desc: "Automated voucher export formatted for Indian statutory books." },
    { name: "Zoho Books", category: "Accounting Suite", desc: "Real-time GST bill ingestion and invoice archiving." },
    { name: "Razorpay", category: "Payment Infrastructure", desc: "Virtual corporate cards, automated refunds, and webhook reconciliation." },
    { name: "Okta & Azure AD", category: "Identity & SSO", desc: "SAML 2.0 and SCIM directory provisioning for enterprise access." },
  ];

  return (
    <section className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Ecosystem Connectivity
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Plug into your existing enterprise stack
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              Relatia does not require replacing your accounting software, identity provider, or HR systems. We connect natively to the tools you already rely on.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item, idx) => (
            <FadeInUp key={item.name} delay={idx * 0.08}>
              <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-6 shadow-sm hover:border-[var(--m-brand)]/50 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-[var(--m-text)]">{item.name}</h4>
                  <span className="text-[10px] font-mono uppercase bg-[var(--m-bg-alt)] text-[var(--m-text-muted)] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="mt-3 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                  {item.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--m-brand)] font-medium">
                  <span>Native Connector</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. ENTERPRISE SECURITY & COMPLIANCE
   ================================================================ */
export function PlatformSecurity() {
  const securityFeatures = [
    {
      title: "India Data Localization (DPDP Act)",
      desc: "All financial data, guest identities, and transaction logs are stored exclusively in Tier-4 data centers within Indian geography.",
    },
    {
      title: "SOC 2 Type II & ISO 27001 Alignment",
      desc: "Architected around AICPA Trust Services Criteria with continuous automated security posture monitoring and third-party audit preparation.",
    },
    {
      title: "End-to-End Encryption",
      desc: "Data encrypted in transit via TLS 1.3 and at rest with AES-256 customer-managed encryption keys (CMEK).",
    },
    {
      title: "Granular Role-Based Access (RBAC)",
      desc: "Strict compartmentalization ensuring finance, department heads, and external venue managers see only authorized information.",
    },
  ];

  return (
    <section className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
                Enterprise Trust
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
                Institutional-grade security from day one
              </h2>
              <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light leading-relaxed">
                Relatia is engineered to meet the stringent security, compliance, and governance requirements of Fortune 500 banks, conglomerates, and high-growth technology firms.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--m-brand)] hover:underline"
                >
                  Request our Security & Compliance Whitepaper →
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityFeatures.map((feat) => (
                <div key={feat.title} className="rounded-xl border border-[var(--m-border)] bg-[var(--m-card)] p-5 shadow-sm">
                  <div className="h-8 w-8 rounded-lg bg-[var(--m-brand)]/10 text-[var(--m-brand)] flex items-center justify-center font-bold text-sm">
                    🔒
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-[var(--m-text)]">{feat.title}</h4>
                  <p className="mt-1 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. PLATFORM CTA
   ================================================================ */
export function PlatformCta() {
  return (
    <section className="py-20 bg-[var(--m-bg-dark)] text-[var(--m-text-on-dark)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent-warm)]">
            Ready to upgrade your enterprise hospitality?
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Experience the Relatia difference.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--m-text-muted)] max-w-2xl mx-auto font-light">
            Join hundreds of forward-thinking enterprise teams who have turned dining into a competitive relationship advantage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--m-brand)] px-8 py-3.5 text-sm font-medium text-white shadow-md hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.02]"
            >
              Schedule an Executive Briefing
            </Link>
            <Link
              href="/partners"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Explore Hospitality Network
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
