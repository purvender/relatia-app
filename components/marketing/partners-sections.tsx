"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FadeIn,
  FadeInUp,
  FadeInScale,
} from "./animations";

/* ================================================================
   1. PARTNERS HERO
   ================================================================ */
export function PartnersHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--m-accent-warm)]/30 via-transparent to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-bg)]/80 px-3.5 py-1 text-xs font-medium tracking-wide uppercase text-[var(--m-text-secondary)] shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--m-brand)]" />
                Hospitality Partner Network
              </div>
            </FadeIn>

            <FadeInUp delay={0.1}>
              <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--m-text)] leading-[1.12]">
                Fill private dining rooms &amp; event spaces with{" "}
                <span className="italic font-normal text-[var(--m-brand)]">verified enterprise accounts</span>.
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="mt-6 text-lg sm:text-xl text-[var(--m-text-secondary)] leading-relaxed font-light">
                Relatia connects premier dining establishments, luxury hotel dining rooms, private clubs, and banquet suites directly with corporate hosts who possess pre-approved budgets and structured event briefs.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--m-brand)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.02]"
                >
                  Apply as a Partner
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link
                  href="/partners/login"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--m-border)] bg-[var(--m-bg)] px-6 py-3.5 text-sm font-medium text-[var(--m-text)] hover:bg-[var(--m-bg-alt)] transition-colors"
                >
                  Partner Portal Login →
                </Link>
                <a
                  href="#workflow"
                  className="text-xs font-semibold text-[var(--m-text-secondary)] hover:text-[var(--m-brand)] underline transition-colors"
                >
                  How Onboarding Works
                </a>
              </div>
            </FadeInUp>
          </div>

          <div className="lg:col-span-5">
            <FadeInScale delay={0.25}>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--m-border)] shadow-xl aspect-[4/3]">
                <Image
                  src="/images/marketing/partners-hospitality.png"
                  alt="Fine dining culinary excellence for Relatia hospitality partners"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--m-accent-warm)]">
                        Curated Partner Profile
                      </div>
                      <div className="text-sm font-semibold font-serif mt-0.5">The Chef’s Table &amp; Private Salon</div>
                    </div>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">PDR Capacity: 18</span>
                  </div>
                </div>
              </div>
            </FadeInScale>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. WHO IT'S FOR — SPACE & VENUE TAXONOMY
   ================================================================ */
export function PartnersSpacesTaxonomy() {
  const spaces = [
    {
      title: "Private Dining Rooms (PDRs)",
      desc: "Intimate, acoustically isolated dining salons (8–24 guests) suited for executive dinners, board reviews, and client celebrations.",
      icon: "🍷",
      tag: "High Demand",
    },
    {
      title: "Executive Boardrooms & Salons",
      desc: "Discreet hospitality spaces equipped for high-stakes deal negotiations with private butler service and AV capabilities.",
      icon: "💼",
      tag: "Corporate Essential",
    },
    {
      title: "Rooftop Terraces & Lounges",
      desc: "Open-air terraces, scenic mezzanine buyouts, and cocktail lounges for team milestones, networking, and offsite receptions.",
      icon: "🍸",
      tag: "Social Receptions",
    },
    {
      title: "Banquet Suites & Ballrooms",
      desc: "Full-service luxury banquet spaces (50–300+ guests) with tailored stage setups, projection systems, and bespoke catering packages.",
      icon: "🏛️",
      tag: "Large Scale",
    },
  ];

  return (
    <section id="spaces" className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Venue Categories &amp; Bookable Spaces
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--m-text)] tracking-tight">
              Spaces engineered for enterprise hospitality
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--m-text-secondary)] font-light">
              Relatia focuses exclusively on private corporate dining, executive entertaining, and curated event spaces.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((s, idx) => (
            <FadeInUp key={s.title} delay={idx * 0.1}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-6 shadow-sm hover:border-[var(--m-brand)]/50 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-[10px] font-mono font-semibold bg-[var(--m-bg-alt)] text-[var(--m-brand)] px-2 py-0.5 rounded">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--m-text)] group-hover:text-[var(--m-brand)] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {s.desc}
                  </p>
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
   3. HOW ONBOARDING WORKS — 4-STEP PROCESS
   ================================================================ */
export function PartnersWorkflow() {
  const steps = [
    {
      step: "01",
      title: "Apply & Register Profile",
      desc: "Submit your establishment details, key contact personnel, GSTIN, and preliminary private space specs.",
      note: "Takes under 5 minutes to submit initial application.",
    },
    {
      step: "02",
      title: "Configure Spaces & Packages",
      desc: "Catalog bookable rooms (PDRs, boardrooms, terraces), set menus, per-person pricing, and minimum spend rules.",
      note: "Full flexibility over dietary capabilities & AV add-ons.",
    },
    {
      step: "03",
      title: "Operational Verification Audit",
      desc: "Relatia’s partner team conducts a physical or virtual walkthrough to verify acoustic privacy, service readiness, and compliance.",
      note: "Verification recorded in provider governance registry.",
    },
    {
      step: "04",
      title: "Operator Review & Discovery Live",
      desc: "Once verified, listing visibility is activated for enterprise planners. Joining does not auto-publish without operator approval.",
      note: "Guarantees brand protection and quality control.",
    },
  ];

  return (
    <section id="workflow" className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Partner Onboarding Journey
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              From application to discovery, governed for quality
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              We maintain strict curation standards so enterprise clients trust every recommendation.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <FadeInUp key={item.step} delay={idx * 0.1}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg)] p-6 shadow-sm flex flex-col justify-between h-full relative">
                <div>
                  <div className="font-mono text-2xl font-bold text-[var(--m-brand)]">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--m-text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--m-border)]/70 text-[11px] text-[var(--m-text-muted)]">
                  {item.note}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.4}>
          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-center max-w-2xl mx-auto text-xs text-amber-900">
            <span className="font-semibold">Important Quality Boundary:</span> Joining Relatia creates your partner profile and space catalog. Your venue is published to enterprise search only after our operational audit and verification check are approved.
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ================================================================
   4. WHAT PARTNERS MANAGE — PORTAL CAPABILITIES
   ================================================================ */
export function PartnersManagement() {
  const capabilities = [
    {
      title: "Venue & Space Inventory",
      desc: "Manage floor plans, seating capacities, private acoustic configurations, and high-resolution space photography.",
      icon: "🏛️",
    },
    {
      title: "Packages & Set Menus",
      desc: "Configure fixed tasting menus, beverage packages, Jain/vegan adaptations, and custom per-person pricing tiers.",
      icon: "📋",
    },
    {
      title: "Commercial Minimum Spends",
      desc: "Establish weekday and weekend minimum spends, lead time requirements, and seasonal surge conditions.",
      icon: "💰",
    },
    {
      title: "Operational & Cancellation Rules",
      desc: "Specify cutoff windows, deposit policies, and explicit cancellation refund schedules.",
      icon: "⏱️",
    },
    {
      title: "Host Briefs & Dietary Alerts",
      desc: "Receive structured client briefs with exact guest headcounts, allergen warnings, and executive host notes.",
      icon: "🔔",
    },
    {
      title: "Publishing & Discoverability Status",
      desc: "Real-time visibility into your verification status, readiness score, and active discovery visibility state.",
      icon: "🛡️",
    },
  ];

  return (
    <section className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Partner Management Toolkit
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Total control over your spaces, menus &amp; commercial terms
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              Relatia gives banquet and restaurant leadership clear tools to manage offerings without disrupting table management workflows.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, idx) => (
            <FadeInUp key={c.title} delay={idx * 0.08}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-6 shadow-sm hover:border-[var(--m-brand)]/40 transition-all">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="mt-3 font-serif text-base font-semibold text-[var(--m-text)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                  {c.desc}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. PARTNER VALUE PROPOSITION & ECONOMICS
   ================================================================ */
export function PartnersValue() {
  const values = [
    {
      metric: "4.8x",
      label: "Higher Average Spend",
      desc: "Enterprise dining accounts order multi-course tasting menus, premium cellar selections, and full private room buyouts.",
    },
    {
      metric: "0%",
      label: "No-Show & Forfeiture Risk",
      desc: "All bookings are backed by pre-authorized corporate payment workflows and verified enterprise billing accounts.",
    },
    {
      metric: "72%",
      label: "Weekday PDR Utilization",
      desc: "Corporate dinners peak Tuesday through Thursday evenings—filling valuable capacity during off-peak consumer dining days.",
    },
    {
      metric: "100%",
      label: "GST SAC 996331 Compliance",
      desc: "Automated digital tax invoices generated with buyer GSTIN, ensuring friction-free corporate accounting.",
    },
  ];

  return (
    <section id="value" className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Partner Economics
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--m-text)] tracking-tight">
              Structured for high-margin, predictable corporate demand
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--m-text-secondary)] font-light">
              We connect you with corporate hosts who value privacy, culinary excellence, and seamless execution.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, idx) => (
            <FadeInUp key={item.label} delay={idx * 0.1}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg)] p-6 shadow-sm hover:border-[var(--m-brand)]/40 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[var(--m-brand)]">
                    {item.metric}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[var(--m-text)]">{item.label}</h3>
                  <p className="mt-2 text-xs text-[var(--m-text-secondary)] leading-relaxed font-light">
                    {item.desc}
                  </p>
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
   6. PARTNER TIERS & STANDARDS
   ================================================================ */
export function PartnersTiers() {
  const tiers = [
    {
      badge: "Tier 1",
      title: "Luxury Flagship Hotels & Banquets",
      description: "Dedicated private salons, presidential boardrooms, and grand hospitality suites.",
      partners: ["The Leela Palaces", "Taj Hotels & Palaces", "The Oberoi Group", "ITC Luxury Collection"],
      criteria: "Full acoustic isolation, dedicated butler service, sommelier pairing capacity.",
    },
    {
      badge: "Tier 2",
      title: "Chef-Driven Standalone Institutions",
      description: "Award-winning independent restaurants with exclusive private dining rooms or mezzanine buyout options.",
      partners: ["Modern European fine dining", "Progressive Indian cuisine", "Artisanal Japanese omakase", "Mediterranean grills"],
      criteria: "Bespoke corporate set menus, pre-printed branded menus, private entrance options.",
    },
    {
      badge: "Tier 3",
      title: "Private Members' Clubs & Lounges",
      description: "Discreet sanctuaries curated for high-stakes investor discussions and founder dinners.",
      partners: ["Exclusive business clubs", "Rooftop cigar and cognac salons", "Golf resort dining rooms"],
      criteria: "Strict privacy enforcement, confidential guest registry, bespoke AV equipment.",
    },
  ];

  return (
    <section id="standards" className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Curation Standards
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              The Relatia Hospitality Collection
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              Every venue in our network is physically vetted by our hospitality team to ensure exceptional dining standards.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <FadeInUp key={tier.title} delay={idx * 0.1}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-8 shadow-sm hover:border-[var(--m-brand)]/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--m-brand)]/10 text-[var(--m-brand)]">
                    {tier.badge}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--m-text)]">{tier.title}</h3>
                  <p className="mt-2 text-sm text-[var(--m-text-secondary)] font-light leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[var(--m-border)]">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--m-text-muted)] mb-2">
                      Representative Partners
                    </div>
                    <ul className="space-y-1.5">
                      {tier.partners.map((p) => (
                        <li key={p} className="text-xs text-[var(--m-text)] flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-[var(--m-brand)]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--m-border)]/60 text-[11px] text-[var(--m-text-muted)]">
                  <span className="font-semibold text-[var(--m-text)]">Standards: </span>
                  {tier.criteria}
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
   7. PARTNER TESTIMONIALS
   ================================================================ */
export function PartnersTestimonials() {
  const quotes = [
    {
      quote:
        "Relatia has completely transformed our Tuesday and Wednesday private dining room occupancy. The corporate guests arriving through Relatia spend substantially more on our reserve wine list and tasting menus.",
      author: "Vikramaditya Sengupta",
      title: "Director of Food & Beverage",
      property: "Luxury Hotel & Residences, Mumbai",
    },
    {
      quote:
        "The automated B2B invoicing and GST matching alone is a massive operational win. We used to spend days resolving credit card receipts with corporate accounting teams. With Relatia, settlements arrive cleanly with full audit trails.",
      author: "Radhika Mehra",
      title: "Managing Partner",
      property: "Bespoke Contemporary Indian Dining, Bengaluru",
    },
  ];

  return (
    <section className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((q) => (
            <FadeInUp key={q.author}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-8 shadow-sm flex flex-col justify-between h-full">
                <p className="font-serif text-lg text-[var(--m-text)] italic leading-relaxed">
                  “{q.quote}”
                </p>
                <div className="mt-8 pt-6 border-t border-[var(--m-border)]">
                  <div className="font-semibold text-sm text-[var(--m-text)]">{q.author}</div>
                  <div className="text-xs text-[var(--m-brand)]">{q.title}</div>
                  <div className="text-xs text-[var(--m-text-muted)] mt-0.5">{q.property}</div>
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
   8. PARTNER APPLICATION & FUNNEL INTAKE
   ================================================================ */
export function PartnersApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    establishmentName: "",
    spaceType: "Private Dining Room (PDR)",
    city: "Mumbai",
    capacityPdr: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Partner Intake Application
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Apply to the Relatia Collection
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              Submit your property details and private dining specifications. Our partner onboarding team will review your application and coordinate a verification walkthrough.
            </p>
          </FadeIn>
        </div>

        <FadeInUp delay={0.2}>
          <div className="mt-12 rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-[var(--m-brand)]/10 text-[var(--m-brand)] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-[var(--m-text)]">Partner Application Received</h3>
                <p className="text-sm text-[var(--m-text-secondary)] max-w-md mx-auto font-light leading-relaxed">
                  Thank you for applying to partner with Relatia. Our partner curation team will review your spaces, menu offerings, and contact you for verification.
                </p>
                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-4 max-w-md mx-auto text-xs text-[var(--m-text-secondary)]">
                  For priority property audits or existing partner portal assistance, email{" "}
                  <a href="mailto:partners@relatia.in" className="text-[var(--m-brand)] font-semibold underline">
                    partners@relatia.in
                  </a>
                  .
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/partners/login"
                    className="rounded-full bg-[var(--m-brand)] px-6 py-2.5 text-xs font-semibold text-white"
                  >
                    Go to Partner Sign In →
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[var(--m-brand)] hover:underline font-medium"
                  >
                    Submit another venue application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[var(--m-text)]">
                      Hospitality Partner Intake Form
                    </h3>
                    <span className="text-[11px] font-mono font-semibold bg-[var(--m-bg-alt)] text-[var(--m-brand)] border border-[var(--m-border)] px-2.5 py-0.5 rounded-full">
                      Vetting Pipeline
                    </span>
                  </div>
                  <p className="text-xs text-[var(--m-text-secondary)] font-light mt-2">
                    Already registered as a partner?{" "}
                    <Link href="/partners/login" className="text-[var(--m-brand)] font-semibold underline">
                      Sign in to your Partner Portal →
                    </Link>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Establishment / Venue Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Masala Library / The Grand Salon"
                      value={formData.establishmentName}
                      onChange={(e) => setFormData({ ...formData, establishmentName: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Primary Space Category
                    </label>
                    <select
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] focus:border-[var(--m-brand)] focus:outline-none"
                    >
                      <option value="Private Dining Room (PDR)">Private Dining Room (PDR)</option>
                      <option value="Executive Boardroom">Executive Boardroom</option>
                      <option value="Rooftop Terrace / Lounge">Rooftop Terrace / Lounge</option>
                      <option value="Luxury Banquet Suite">Luxury Banquet Suite</option>
                      <option value="Full Restaurant Buyout">Full Restaurant Buyout</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      City Location
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] focus:border-[var(--m-brand)] focus:outline-none"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Goa">Goa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Private Room Guest Capacity
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 seated, 25 reception"
                      value={formData.capacityPdr}
                      onChange={(e) => setFormData({ ...formData, capacityPdr: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Contact Name &amp; Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sameer Kapoor, General Manager"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hospitality@establishment.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Special Features / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dedicated sommelier, valet, private entrance"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[var(--m-brand)] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.01]"
                  >
                    Submit Partner Application
                  </button>
                  <p className="mt-3 text-center text-xs text-[var(--m-text-muted)]">
                    Confidential &amp; NDA protected. Listings are published to enterprise clients only after operational verification.
                  </p>
                </div>
              </form>
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
