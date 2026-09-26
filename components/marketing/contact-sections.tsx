"use client";

import { useState } from "react";
import {
  FadeIn,
  FadeInUp,
  FadeInRight,
} from "./animations";

/* ================================================================
   1. CONTACT HERO
   ================================================================ */
export function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--m-accent-warm)]/40 via-transparent to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-bg)]/80 px-3.5 py-1 text-xs font-medium tracking-wide uppercase text-[var(--m-text-secondary)] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--m-brand)]" />
            Executive Consultation & Demo
          </div>
        </FadeIn>

        <FadeInUp delay={0.1}>
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--m-text)] leading-[1.12] max-w-4xl mx-auto">
            Bring clarity, control, and prestige to your{" "}
            <span className="italic font-normal text-[var(--m-brand)]">enterprise relationship spend</span>.
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="mt-6 text-lg sm:text-xl text-[var(--m-text-secondary)] leading-relaxed font-light max-w-2xl mx-auto">
            Schedule a 30-minute strategic walkthrough. We will review your hospitality workflow, calculate your GST tax credit recapture, and preview curated venue availability.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ================================================================
   2. CONTACT FORM & REASSURANCE SECTION
   ================================================================ */
export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    companyName: "",
    role: "Executive Assistant / Admin",
    annualSpend: "₹25 Lakhs – ₹1 Crore",
    city: "Mumbai",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-12 pb-24 bg-[var(--m-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Interactive Demo Form */}
          <div className="lg:col-span-7">
            <FadeInUp delay={0.1}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-card)] p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-14 w-14 rounded-full bg-[var(--m-brand)]/10 text-[var(--m-brand)] flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[var(--m-text)]">
                      Demo Inquiry Preview Received
                    </h3>
                    <p className="text-sm text-[var(--m-text-secondary)] max-w-md mx-auto font-light leading-relaxed">
                      Thank you for exploring Relatia{formData.firstName ? `, ${formData.firstName}` : ""}. This interactive form is a demonstration preview while automated CRM routing is in deployment.
                    </p>
                    <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-4 max-w-md mx-auto text-xs text-[var(--m-text-secondary)]">
                      For immediate enterprise scheduling or a live walkthrough, please contact us directly at{" "}
                      <a href="mailto:sales@relatia.in" className="text-[var(--m-brand)] font-semibold underline">
                        sales@relatia.in
                      </a>
                      .
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="rounded-full border border-[var(--m-border)] bg-[var(--m-bg)] px-6 py-2.5 text-xs font-medium text-[var(--m-text)] hover:bg-[var(--m-bg-alt)] transition-colors"
                      >
                        Submit another demo inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-[var(--m-text)]">
                          Request an Executive Demo
                        </h3>
                        <span className="text-[11px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          Demo Preview Form
                        </span>
                      </div>
                      <p className="text-xs text-[var(--m-text-secondary)] font-light mt-2">
                        Explore our interactive request interface below. Production CRM ingestion is on our roadmap — for direct inquiries, email{" "}
                        <a href="mailto:sales@relatia.in" className="text-[var(--m-brand)] underline font-medium">
                          sales@relatia.in
                        </a>
                        .
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Arjun"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Kapoor"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="arjun@company.com"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Enterprise Organization"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          Primary Role
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] focus:border-[var(--m-brand)] focus:outline-none"
                        >
                          <option value="Executive Assistant / Admin">Executive Assistant / EA</option>
                          <option value="CFO / Finance Director">CFO / Finance Controller</option>
                          <option value="Sales / Account Executive">VP / Head of Strategic Sales</option>
                          <option value="Event / Workplace Manager">Event & Workplace Lead</option>
                          <option value="Founder / CEO">Founder / CEO</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                          Estimated Annual Spend
                        </label>
                        <select
                          value={formData.annualSpend}
                          onChange={(e) => setFormData({ ...formData, annualSpend: e.target.value })}
                          className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] focus:border-[var(--m-brand)] focus:outline-none"
                        >
                          <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                          <option value="₹25 Lakhs – ₹1 Crore">₹25 Lakhs – ₹1 Crore</option>
                          <option value="₹1 Crore – ₹5 Crores">₹1 Crore – ₹5 Crores</option>
                          <option value="₹5 Crores+">₹5 Crores+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--m-text)] mb-2">
                        Specific Requirements or Upcoming Events
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about upcoming board dinners, CXO roundtables, or current expense pain points..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full rounded-lg border border-[var(--m-border)] bg-[var(--m-bg)] px-4 py-2.5 text-sm text-[var(--m-text)] placeholder-[var(--m-text-muted)] focus:border-[var(--m-brand)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[var(--m-brand)] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.01]"
                      >
                        Preview Executive Briefing Request
                      </button>
                      <p className="mt-3 text-center text-xs text-[var(--m-text-muted)]">
                        Interactive demonstration preview. Strictly confidential under standard enterprise NDA.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </FadeInUp>
          </div>

          {/* Right: What to Expect & Enterprise Proof */}
          <div className="lg:col-span-5 space-y-8">
            <FadeInRight delay={0.2}>
              <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-bg-alt)] p-6 sm:p-8 space-y-6">
                <h3 className="font-serif text-xl text-[var(--m-text)]">
                  What to expect in your 30-minute consultation
                </h3>

                <ul className="space-y-4 text-xs text-[var(--m-text-secondary)] font-light leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[var(--m-brand)] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="font-semibold text-[var(--m-text)]">Tailored Workflow Audit: </strong>
                      We map your current dining approval chain, per-diem limits, and invoice reconciliation procedures.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[var(--m-brand)] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="font-semibold text-[var(--m-text)]">GST Recapture Model: </strong>
                      A custom calculation of the input tax credit your company is currently leaving unclaimed on corporate cards.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[var(--m-brand)] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="font-semibold text-[var(--m-text)]">Curated Network Preview: </strong>
                      Direct view into pre-negotiated corporate rates for top luxury venues in Mumbai, Delhi, Bengaluru, and Hyderabad.
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-[var(--m-border)]">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--m-text-muted)] mb-2">
                    Direct Contact Channels
                  </div>
                  <div className="space-y-1 text-xs text-[var(--m-text)]">
                    <p>Enterprise Sales: <a href="mailto:sales@relatia.in" className="text-[var(--m-brand)] underline">sales@relatia.in</a></p>
                    <p>Hospitality Partnerships: <a href="mailto:partners@relatia.in" className="text-[var(--m-brand)] underline">partners@relatia.in</a></p>
                    <p>Corporate Headquarters: Bandra Kurla Complex (BKC), Mumbai</p>
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
   3. ENTERPRISE FAQ SECTION
   ================================================================ */
export function ContactFaq() {
  const faqs = [
    {
      q: "How fast can our organization roll out Relatia?",
      a: "Standard deployment takes under 48 hours for core modules. Enterprise SSO and custom accounting integrations are deployed according to customer technical rollout plans.",
    },
    {
      q: "How does Relatia handle Indian GST compliance?",
      a: "Every booking through Relatia generates a 100% compliant B2B tax invoice with matching GSTIN, legal vendor entity, and SAC code 996331. This ensures your finance team can seamlessly claim input tax credit without chasing paper receipts.",
    },
    {
      q: "Can we configure different spend limits for different tiers of executives?",
      a: "Yes. Relatia features granular policy engines where you can define different per-head budget caps for VP-level client dinners, board meetings, team celebrations, or executive recruitment dining.",
    },
    {
      q: "Does Relatia replace our existing corporate credit cards?",
      a: "Relatia offers flexible payment support. You can process digital payments through our integrated Razorpay payment flow (test-mode active today; automated escrow and corporate credit terms on roadmap) or reconcile corporate cards directly against invoices.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--m-bg-alt)] border-t border-[var(--m-border)]">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m-brand)]">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 font-serif text-3xl text-[var(--m-text)] tracking-tight">
              Enterprise Considerations
            </h2>
          </FadeIn>
        </div>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, idx) => (
            <FadeInUp key={faq.q} delay={idx * 0.08}>
              <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-bg)] p-6 shadow-sm">
                <h4 className="text-base font-semibold text-[var(--m-text)]">{faq.q}</h4>
                <p className="mt-2 text-sm text-[var(--m-text-secondary)] font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
