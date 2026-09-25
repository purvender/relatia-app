"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ----------------------------------------------------------------
   Announcement Bar
   ---------------------------------------------------------------- */
export function AnnouncementBar() {
  return (
    <div className="bg-[var(--m-bg-dark)] text-[var(--m-text-on-dark)]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm">
        <svg className="h-3.5 w-3.5 text-[var(--m-accent)] shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3.25 11 8 6 12.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[var(--m-text-muted)]">
          <span className="font-medium text-[var(--m-text-on-dark)]">India&apos;s first AI-native</span>{" "}
          enterprise dining &amp; event operating system is here.
        </p>
        <Link
          href="/platform"
          className="ml-1 font-semibold text-[var(--m-accent)] hover:text-[var(--m-accent-hover)] transition-colors whitespace-nowrap"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Hero Section
   ---------------------------------------------------------------- */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(193,127,62,0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-[var(--m-text-secondary)] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--m-accent)]" />
                AI-Native Platform
              </span>
            </motion.div>

            <motion.h1
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
              style={{ fontFamily: "var(--font-serif), serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Corporate dining and events,{" "}
              <span className="text-[var(--m-accent)]">finally run</span> as one
              intelligent system
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-relaxed text-[var(--m-text-secondary)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              Relatia helps enterprises discover venues, route approvals, control
              spend, issue GST-ready invoices, manage payments, and coordinate
              bookings — through one AI-powered workflow.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--m-text)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 hover:bg-[var(--m-bg-dark-alt)] transition-all hover:shadow-xl"
              >
                Book a Demo
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[var(--m-text)] hover:bg-white hover:border-[var(--m-text-muted)] transition-all"
              >
                See Platform
              </Link>
            </motion.div>

            {/* Social proof micro */}
            <motion.div
              className="mt-12 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease }}
            >
              <div className="flex -space-x-2">
                {[
                  "bg-amber-600",
                  "bg-emerald-600",
                  "bg-blue-600",
                  "bg-rose-600",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${bg} border-2 border-[var(--m-bg)] flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["TM", "IQ", "RK", "NS"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--m-text-secondary)]">
                <span className="font-semibold text-[var(--m-text)]">Trusted by finance teams</span>{" "}
                at leading Indian enterprises
              </p>
            </motion.div>
          </div>

          {/* Right: Product visual */}
          <motion.div
            className="relative lg:ml-8"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border border-[var(--m-border-light)]">
              <Image
                src="/images/marketing/hero-product.png"
                alt="Relatia platform dashboard showing venue discovery, event approvals, and GST invoice management"
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
              />
              {/* Subtle glass overlay at top for premium feel */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-xl shadow-black/10 border border-[var(--m-border-light)] hidden sm:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--m-text)]">Payment Verified</p>
                  <p className="text-[11px] text-[var(--m-text-secondary)]">GST Invoice INV-2024-0047</p>
                </div>
              </div>
            </motion.div>

            {/* Floating AI card */}
            <motion.div
              className="absolute -top-4 -right-4 rounded-xl bg-white p-4 shadow-xl shadow-black/10 border border-[var(--m-border-light)] hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1, ease }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <svg className="h-5 w-5 text-[var(--m-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--m-text)]">AI Recommendation</p>
                  <p className="text-[11px] text-[var(--m-text-secondary)]">3 venues match your criteria</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
