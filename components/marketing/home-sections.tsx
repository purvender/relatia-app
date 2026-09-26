"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FadeIn,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  FadeInScale,
  StaggerContainer,
  StaggerItem,
} from "./animations";

/* ================================================================
   Section 1 — Enterprise Verticals & Governance Standards
   ================================================================ */
const enterpriseSectors = [
  {
    num: "01",
    title: "BFSI & Private Wealth",
    subtitle: "Private wealth salons, investor dinners & board hospitality",
    tag: "High Compliance",
  },
  {
    num: "02",
    title: "Technology & GCCs",
    subtitle: "Leadership roundtables, executive offsites & team hosting",
    tag: "Scale & Control",
  },
  {
    num: "03",
    title: "Consulting & Law",
    subtitle: "Client entertainment, partner dining & confidential suites",
    tag: "Discreet PDRs",
  },
  {
    num: "04",
    title: "Private Equity & VC",
    subtitle: "Deal closing dinners, portfolio CEO mixers & founder summits",
    tag: "Prestige Venues",
  },
  {
    num: "05",
    title: "Enterprise Sales",
    subtitle: "CXO relationship dining, pipeline acceleration & quarterly QBRs",
    tag: "ROI Visibility",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-[var(--m-border-light)] py-14 bg-[var(--m-bg-alt)]/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--m-border)]">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--m-accent)]">
                Enterprise Sector Alignment
              </span>
              <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-[var(--m-text)]">
                Engineered for high-governance relationship spend
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--m-bg)] border border-[var(--m-border)] text-xs font-mono text-[var(--m-text-secondary)] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Multi-Tenant Architecture</span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {enterpriseSectors.map((sector) => (
            <FadeInUp key={sector.num} delay={Number(sector.num) * 0.05}>
              <div className="group h-full rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-5 hover:border-[var(--m-accent)]/50 transition-all shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--m-text-muted)]">
                    <span className="font-mono font-semibold text-[var(--m-accent)]">{sector.num}</span>
                    <span className="text-[10px] font-mono uppercase bg-[var(--m-bg-alt)] px-2 py-0.5 rounded text-[var(--m-text-secondary)]">
                      {sector.tag}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[var(--m-text)] tracking-tight">
                    {sector.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {sector.subtitle}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Operational Guarantees Strip */}
        <FadeIn delay={0.3}>
          <div className="mt-8 pt-6 border-t border-[var(--m-border)]/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2 text-[var(--m-text)]">
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="font-medium">100% B2B GST Invoicing</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--m-text)]">
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="font-medium">Multi-Tier Approvals</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--m-text)]">
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="font-medium">Per-Head Spend Limits</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--m-text)]">
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="font-medium">Immutable Audit Trail</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   Section 2 — Spend Control / Finance Narrative
   ================================================================ */
export function FinanceSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <FadeInLeft>
            <div className="max-w-lg">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
                Financial Operations
              </span>
              <h2
                className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Every rupee tracked.
                <br />
                Every invoice compliant.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--m-text-secondary)]">
                Relatia automates GST-ready invoice generation, processes digital payments
                via Razorpay (test-mode active) with full audit trails, and gives your finance
                team real-time visibility into corporate dining and event spend
                — down to the last paise.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-8">
                {[
                  { stat: "100%", label: "GST Compliant Invoices" },
                  { stat: "3x", label: "Faster Reconciliation (Target)" },
                  { stat: "₹0", label: "Lost Receipts" },
                  { stat: "Real-time", label: "Spend Visibility" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl font-bold text-[var(--m-text)]">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-xs text-[var(--m-text-secondary)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInLeft>

          <FadeInRight>
            <div className="relative">
              {/* Finance dashboard mockup */}
              <div className="rounded-2xl bg-white border border-[var(--m-border-light)] shadow-xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--m-text)]">
                    Finance Dashboard
                  </h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    All Reconciled
                  </span>
                </div>
                {/* Invoice rows */}
                {[
                  { inv: "INV-2024-0089", venue: "Taj Lands End", amount: "₹1,42,500", status: "Paid" },
                  { inv: "INV-2024-0090", venue: "ITC Grand Chola", amount: "₹2,18,000", status: "Paid" },
                  { inv: "INV-2024-0091", venue: "The Oberoi", amount: "₹89,400", status: "Processing" },
                ].map((row) => (
                  <div
                    key={row.inv}
                    className="flex items-center justify-between rounded-lg bg-[var(--m-bg)] px-4 py-3"
                  >
                    <div>
                      <p className="text-xs font-semibold font-mono text-[var(--m-text)]">
                        {row.inv}
                      </p>
                      <p className="text-[11px] text-[var(--m-text-secondary)]">
                        {row.venue}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--m-text)]">
                        {row.amount}
                      </p>
                      <span
                        className={`text-[10px] font-semibold ${
                          row.status === "Paid"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
                {/* GST Summary */}
                <div className="rounded-lg border border-[var(--m-border)] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--m-text-muted)] mb-2">
                    GST Summary — Q3 FY25
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--m-text-secondary)]">CGST</span>
                    <span className="font-semibold text-[var(--m-text)]">₹4,05,810</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-[var(--m-text-secondary)]">SGST</span>
                    <span className="font-semibold text-[var(--m-text)]">₹4,05,810</span>
                  </div>
                  <div className="mt-2 border-t border-[var(--m-border)] pt-2 flex justify-between text-xs">
                    <span className="font-bold text-[var(--m-text)]">Total Tax</span>
                    <span className="font-bold text-[var(--m-text)]">₹8,11,620</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Section 3 — Workflow Storytelling
   ================================================================ */
const workflowSteps = [
  {
    num: "01",
    title: "Request",
    desc: "Any team member creates an event request with date, city, headcount, and budget. Contextual validation happens instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Approve",
    desc: "Requests route automatically to the right approver based on your company's policy, budget tier, and org hierarchy.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Discover",
    desc: "Browse curated venues matched to your event. Structured rule-based filters match options based on cuisine, location, capacity, and budget rules.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Book",
    desc: "Select your venue, confirm details, and generate a booking. Venue coordination happens inside Relatia — with clear event tracking.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Invoice & Pay",
    desc: "A GST-compliant tax invoice is auto-generated. Process digital payments via Razorpay (test-mode active) with full audit trail.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Track & Report",
    desc: "Monitor spend by team, department, venue, and category. Generate compliance reports and relationship-spend insights.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export function WorkflowSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
            How It Works
          </span>
          <h2
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            From request to reconciliation,{" "}
            <span className="text-[var(--m-text-secondary)]">orchestrated effortlessly</span>
          </h2>
          <p className="mt-4 text-base text-[var(--m-text-secondary)]">
            Six steps. One platform. Complete control over every corporate dining and event engagement.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {workflowSteps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="group relative rounded-2xl bg-white border border-[var(--m-border-light)] p-7 h-full hover:shadow-lg hover:border-[var(--m-accent)]/30 transition-all duration-500">
                {/* Step number */}
                <span className="text-xs font-bold text-[var(--m-accent)] font-mono">
                  {step.num}
                </span>

                {/* Icon */}
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--m-bg-alt)] text-[var(--m-text)] group-hover:bg-[var(--m-accent-light)] group-hover:text-[var(--m-accent)] transition-colors">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-bold text-[var(--m-text)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--m-text-secondary)]">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ================================================================
   Section 4 — Role-Based Value
   ================================================================ */
const roles = [
  {
    title: "Event Requester",
    icon: "📋",
    benefits: [
      "Create event requests in under 60 seconds",
      "Get smart venue suggestions matched to criteria & policy",
      "Track booking status in real time",
    ],
  },
  {
    title: "Approver",
    icon: "✅",
    benefits: [
      "One-tap in-app approvals",
      "Policy-aware auto-routing",
      "Complete event and spend context before deciding",
    ],
  },
  {
    title: "Finance Team",
    icon: "📊",
    benefits: [
      "GST-ready invoices auto-generated",
      "Razorpay payment gateway integration (test mode active)",
      "Spend dashboards with department-level drill-down",
    ],
  },
  {
    title: "Admin / Ops",
    icon: "⚙️",
    benefits: [
      "Unified event overview across the company",
      "Venue partner curation and coordination",
      "Compliance and policy configuration controls",
    ],
  },
];

export function RolesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
            Built for Every Stakeholder
          </span>
          <h2
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            One platform, purpose-built for{" "}
            <span className="text-[var(--m-text-secondary)]">every role</span>
          </h2>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {roles.map((role) => (
            <StaggerItem key={role.title}>
              <div className="rounded-2xl bg-white border border-[var(--m-border-light)] p-7 h-full hover:shadow-lg transition-shadow duration-500">
                <span className="text-3xl">{role.icon}</span>
                <h3 className="mt-4 text-base font-bold text-[var(--m-text)]">
                  {role.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {role.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[var(--m-text-secondary)]">
                      <svg
                        className="mt-0.5 h-4 w-4 text-[var(--m-accent)] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ================================================================
   Section 5 — Intelligence & Roadmap
   ================================================================ */
export function AISection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg-dark)] text-[var(--m-text-on-dark)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Visual */}
          <FadeInLeft>
            <div className="relative rounded-2xl bg-[var(--m-bg-dark-alt)] border border-white/10 p-8 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--m-accent)] border-b border-white/10 pb-2">
                Roadmap Concept — Conversational Assistant Preview
              </div>
              {/* AI conversation mockup */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--m-accent)] text-white text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="rounded-xl rounded-tl-sm bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/90">
                    I found 3 venues in South Mumbai for your 40-guest dinner on Dec 15th.
                    Based on your team&apos;s past preferences, I&apos;d recommend{" "}
                    <span className="text-[var(--m-accent)] font-semibold">Masala Library</span>{" "}
                    — they had a 4.8 rating from your last 2 bookings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="rounded-xl rounded-tr-sm bg-[var(--m-accent)]/20 px-4 py-3">
                  <p className="text-sm text-white/90">
                    Great choice. Add it to the shortlist and send for approval to Priya in finance.
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white text-xs font-bold shrink-0">
                  RK
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--m-accent)] text-white text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="rounded-xl rounded-tl-sm bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/90">
                    Done. Masala Library is shortlisted and the approval request has been routed to Priya.
                    Estimated cost: ₹1,28,000 + GST. Within your Q3 budget.
                  </p>
                </div>
              </div>
            </div>
          </FadeInLeft>

          {/* Copy */}
          <FadeInRight>
            <div className="max-w-lg">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
                Intelligence &amp; Roadmap
              </span>
              <h2
                className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-white"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Rule-based precision today, AI spend intelligence on the roadmap
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                Relatia combines deterministic venue matching, strict policy compliance checks,
                and structured approval chains today — with predictive AI analytics, conversational
                booking, and automated budget forecasting planned in upcoming roadmap releases.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Deterministic venue matching based on headcount, budget, and location (Live)",
                  "Automatic policy and budget compliance checks (Live)",
                  "Smart routing of approvals to designated approver tiers (Live)",
                  "Generative spend insights, conversational booking & anomaly detection (Roadmap)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <svg className="h-4 w-4 text-[var(--m-accent)] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Section 6 — Venue Network
   ================================================================ */
export function VenueSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Copy */}
          <FadeInUp>
            <div className="max-w-lg">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
                Partner Network
              </span>
              <h2
                className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                India&apos;s finest venues,{" "}
                <span className="text-[var(--m-text-secondary)]">connected</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--m-text-secondary)]">
                From five-star hotel restaurants to curated private dining spaces,
                Relatia connects your team with premium venues across Mumbai, Delhi,
                Bangalore, Chennai, and beyond — all pre-vetted for corporate dining
                and event excellence.
              </p>
              <Link
                href="/partners"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--m-accent)] hover:text-[var(--m-accent-hover)] transition-colors"
              >
                Explore our partner network
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FadeInUp>

          {/* Visual */}
          <FadeInScale>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/marketing/venue-dining.png"
                alt="Premium corporate dining venue interior with elegant table settings"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 backdrop-blur-sm px-5 py-3 shadow-lg">
                <div>
                  <p className="text-sm font-bold text-[var(--m-text)]">Curated Network</p>
                  <p className="text-xs text-[var(--m-text-secondary)]">Mumbai · Delhi · Bangalore · Chennai</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--m-accent)]">500+</p>
                  <p className="text-[10px] text-[var(--m-text-secondary)]">Partner Venues</p>
                </div>
              </div>
            </div>
          </FadeInScale>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Section 7 — Reporting / ROI
   ================================================================ */
export function ReportingSection() {
  const stats = [
    { value: "42%", label: "Modeled cost savings on corporate dining", desc: "projected through negotiated corporate terms and policy controls" },
    { value: "18 hrs", label: "Estimated time saved per event cycle", desc: "from request creation to invoice reconciliation" },
    { value: "100%", label: "Invoice compliance rate", desc: "with automated GST-ready tax invoicing" },
    { value: "4.9/5", label: "Design partner feedback rating", desc: "from early enterprise pilot evaluations" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--m-accent)]">
            Modeled Impact &amp; Benchmarks
          </span>
          <h2
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Built to deliver{" "}
            <span className="text-[var(--m-text-secondary)]">verifiable ROI</span>
          </h2>
          <p className="mt-3 text-xs text-[var(--m-text-muted)]">
            Metrics reflect modeled operational benchmarks and enterprise design partner targets.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <p
                  className="text-4xl font-bold text-[var(--m-text)] font-serif"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--m-text)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[var(--m-text-secondary)]">
                  {stat.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ================================================================
   Section 8 — Testimonials
   ================================================================ */
const testimonials = [
  {
    quote:
      "Relatia transformed how our finance team handles corporate event spend. We went from spreadsheet chaos to real-time visibility — with every invoice GST-ready before we even ask.",
    name: "Priya Mehta",
    role: "VP Finance, Enterprise Design Partner",
    initials: "PM",
  },
  {
    quote:
      "The approval workflow alone saved us weeks of back-and-forth emails. Now our team requests, approves, and books corporate dinners in under 10 minutes.",
    name: "Arjun Kapoor",
    role: "Head of Operations, Pilot Cohort",
    initials: "AK",
  },
  {
    quote:
      "As a venue partner, Relatia brings us qualified corporate inquiries with clear requirements and guaranteed payments. It's the best channel for enterprise dining bookings.",
    name: "Chef Sandeep Rawat",
    role: "Executive Chef & Partner, Hospitality Network",
    initials: "SR",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-accent)]">
            Design Partner Feedback (Pilot Concept)
          </span>
          <h2
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Perspectives from enterprise{" "}
            <span className="text-[var(--m-text-secondary)]">design partners</span>
          </h2>
        </FadeInUp>

        <StaggerContainer className="grid gap-8 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="relative rounded-2xl bg-white border border-[var(--m-border-light)] p-8 h-full">
                {/* Quote mark */}
                <svg
                  className="h-8 w-8 text-[var(--m-accent)]/20 mb-4"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>

                <p className="text-sm leading-relaxed text-[var(--m-text-secondary)]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-[var(--m-border-light)] pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--m-bg-alt)] text-xs font-bold text-[var(--m-text)]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--m-text)]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[var(--m-text-secondary)]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ================================================================
   Section 9 — Final CTA
   ================================================================ */
export function CtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--m-bg-dark)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp className="text-center max-w-2xl mx-auto">
          <h2
            className="font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Ready to transform how your enterprise handles dining &amp; events?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 max-w-xl mx-auto">
            Join the enterprises already using Relatia to save time, control spend,
            and build stronger relationships — one perfectly coordinated event at a time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--m-accent)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--m-accent)]/25 hover:bg-[var(--m-accent-hover)] transition-all hover:shadow-xl"
            >
              Book a Demo
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Explore Platform
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
