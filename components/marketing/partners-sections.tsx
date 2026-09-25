"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FadeIn,
  FadeInUp,
  FadeInRight,
  FadeInScale,
} from "./animations";

/* ================================================================
   1. PARTNERS HERO
   ================================================================ */
export function PartnersHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--m-accent-warm)]/40 via-transparent to-transparent opacity-60" />

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
                Fill private dining rooms with{" "}
                <span className="italic font-normal text-[var(--m-brand)]">verified enterprise accounts</span>.
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="mt-6 text-lg sm:text-xl text-[var(--m-text-secondary)] leading-relaxed font-light">
                Relatia connects India’s premier dining establishments, Michelin-pedigree chefs, and luxury hotel suites directly with Fortune 500 corporate hosts who possess pre-approved corporate budgets.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--m-brand)] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.02]"
                >
                  Apply to Join the Collection
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="#value"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--m-border)] bg-[var(--m-bg)] px-6 py-3 text-sm font-medium text-[var(--m-text)] hover:bg-[var(--m-bg-alt)] transition-colors"
                >
                  Partner Economics
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--m-accent-warm)]">
                        Curated Partner Profile
                      </div>
                      <div className="text-sm font-semibold font-serif mt-0.5">The Chef’s Table & Private Salon</div>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">PDR Capacity: 18</span>
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
   2. PARTNER VALUE PROPOSITION
   ================================================================ */
export function PartnersValue() {
  const values = [
    {
      metric: "4.8x",
      label: "Higher Average Order Value",
      desc: "Enterprise dining accounts consistently order multi-course tasting menus, premium cellar selections, and full private room buyouts.",
    },
    {
      metric: "0%",
      label: "No-Show & Forfeiture Rate",
      desc: "All bookings are backed by pre-authorized corporate payment escrow or central corporate billing accounts.",
    },
    {
      metric: "72%",
      label: "Weekday PDR Utilization",
      desc: "Corporate dinners peak Tuesday through Thursday evenings—filling valuable capacity during off-peak consumer dining days.",
    },
    {
      metric: "24h",
      label: "Automated B2B Settlement",
      desc: "Receive fast, direct settlements via Razorpay with automated GST invoice matching—no chasing delayed paper vouchers.",
    },
  ];

  return (
    <section id="value" className="py-24 bg-[var(--m-bg-alt)] border-y border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Partner Economics
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--m-text)] tracking-tight">
              A partnership structured for high-margin predictability
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--m-text-secondary)] font-light">
              We bring high-intent corporate clientele who appreciate culinary mastery, privacy, and impeccable hospitality.
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
   3. PARTNER TIERS & STANDARDS
   ================================================================ */
export function PartnersTiers() {
  const tiers = [
    {
      badge: "Tier 1",
      title: "Luxury Flagship Hotels & Banquets",
      description: "Dedicated private salons, presidential boardrooms, and grand hospitality suites.",
      partners: ["The Leela Palaces", "Taj Hotels & Palaces", "The Oberoi Group", "ITC Luxury Collection"],
      criteria: "Full private acoustic isolation, dedicated butler service, sommelier pairing capacity.",
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
    <section className="py-24 bg-[var(--m-bg)]">
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
   4. PARTNER OPERATIONS TOOLKIT
   ================================================================ */
export function PartnersOperations() {
  return (
    <section className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
                Frictionless Operations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
                Designed to empower your banquet and restaurant managers
              </h2>
              <p className="text-base text-[var(--m-text-secondary)] font-light leading-relaxed">
                Relatia doesn’t disrupt your existing table management software (SevenRooms, TableCheck, Micros). We serve as your dedicated enterprise channel manager.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {[
                {
                  title: "Direct Host Messaging Channel",
                  desc: "Instantly clarify dietary needs, table arrangements, or special vintage requests with executive assistants.",
                },
                {
                  title: "VIP Protocol & Allergen Alerts",
                  desc: "Clear guest profile briefs highlighting VIP preferences, dietary restrictions, and confidentiality requirements.",
                },
                {
                  title: "Automated GST & B2B Tax Receipts",
                  desc: "We capture the client’s exact GSTIN and company legal entity beforehand, ensuring seamless tax reconciliation.",
                },
              ].map((item, idx) => (
                <FadeInUp key={item.title} delay={idx * 0.1}>
                  <div className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-[var(--m-brand)]/10 text-[var(--m-brand)] flex items-center justify-center text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--m-text)]">{item.title}</h4>
                      <p className="text-xs text-[var(--m-text-secondary)] font-light leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <FadeInRight delay={0.2}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg)] p-6 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--m-border)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-medium text-[var(--m-text)]">
                      PARTNER PORTAL • LIVE RESERVATION
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium">
                    DEPOSIT ESCROWED
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-lg bg-[var(--m-card)] border border-[var(--m-border)]">
                    <div className="text-[10px] uppercase font-mono text-[var(--m-text-muted)]">Client Organization</div>
                    <div className="text-sm font-semibold text-[var(--m-text)]">HDFC Bank • Private Wealth Advisory</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[var(--m-card)] border border-[var(--m-border)]">
                      <div className="text-[10px] uppercase font-mono text-[var(--m-text-muted)]">Room Selected</div>
                      <div className="text-xs font-semibold text-[var(--m-text)]">Lotus Salon (Private)</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--m-card)] border border-[var(--m-border)]">
                      <div className="text-[10px] uppercase font-mono text-[var(--m-text-muted)]">Guaranteed Minimum</div>
                      <div className="text-xs font-semibold text-[var(--m-brand)] font-mono">₹65,000 + GST</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--m-brand)]/5 border border-[var(--m-brand)]/20">
                    <div className="text-[10px] uppercase font-mono text-[var(--m-brand)] font-semibold">
                      Dietary & Hospitality Notes
                    </div>
                    <div className="text-xs text-[var(--m-text-secondary)] mt-1">
                      2 Jain guests (strictly separate prep), 1 Nut allergy. Red wine decanted at 18:30 prior to guest arrival.
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. PARTNER TESTIMONIALS
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
        "The automated B2B invoicing and GST matching alone is a massive operational win. We used to spend days resolving credit card receipts with corporate accounting teams. With Relatia, settlements arrive cleanly within 24 hours.",
      author: "Radhika Mehra",
      title: "Managing Partner",
      property: "Bespoke Contemporary Indian Dining, Bengaluru",
    },
  ];

  return (
    <section className="py-24 bg-[var(--m-bg)] border-t border-[var(--m-border)]">
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
   6. PARTNER APPLICATION FORM
   ================================================================ */
export function PartnersApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    venueName: "",
    city: "Mumbai",
    pdrCapacity: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="py-24 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Join Our Network
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Apply to the Relatia Collection
            </h2>
            <p className="mt-4 text-base text-[var(--m-text-secondary)] font-light">
              Tell us about your establishment and private dining capacity. Our partner curation team will contact you within 48 hours for a physical walkthrough.
            </p>
          </FadeIn>
        </div>

        <FadeInUp delay={0.2}>
          <div className="mt-12 rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg)] p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-[var(--m-brand)]/10 text-[var(--m-brand)] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-[var(--m-text)]">Application Received</h3>
                <p className="text-sm text-[var(--m-text-secondary)] max-w-md mx-auto font-light">
                  Thank you for applying. A member of our Hospitality Curation Committee will review your details and reach out to schedule an on-site tasting and inspection.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[var(--m-brand)] hover:underline font-medium"
                  >
                    Submit another venue profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Establishment / Hotel Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Grand Salon"
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      City / Location
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] focus:border-[var(--m-brand)] focus:outline-none"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Goa">Goa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      PDR / Private Room Capacity
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2 rooms (12 & 24 pax)"
                      value={formData.pdrCapacity}
                      onChange={(e) => setFormData({ ...formData, pdrCapacity: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Contact Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sameer Kapoor, GM"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hospitality@yourhotel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                    />
                  </div>

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
                      className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-card)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
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
                    Protected by NDA. Relatia never shares partner contract parameters publicly.
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
