import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RelatiaLogo } from "@/components/marketing/relatia-logo";

export const metadata: Metadata = {
  title: "Partner Portal Sign In — Relatia Hospitality Network",
  description: "Sign in to the Relatia Hospitality Partner Portal to manage venues, bookable spaces, set menus, pricing, and reservation briefs.",
};

export default async function PartnerLoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[var(--m-bg)] flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-[var(--m-border)] bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <RelatiaLogo size="default" />
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-[var(--m-text-secondary)] hidden sm:inline">
              Looking for enterprise corporate login?
            </span>
            <Link
              href="/sign-in"
              className="text-[var(--m-brand)] hover:underline font-semibold"
            >
              Enterprise Sign In →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Partner Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-bg-alt)] px-3 py-1 text-xs font-mono font-medium text-[var(--m-brand)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--m-brand)]" />
              Hospitality Partner Portal
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Manage your private dining spaces &amp; corporate bookings
            </h1>

            <p className="text-sm text-[var(--m-text-secondary)] font-light leading-relaxed">
              Sign in to manage venue details, private room configurations, packages, minimum spend rules, and view incoming corporate reservations with verified host briefs.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { label: "Bookable Spaces", desc: "PDRs, boardrooms, rooftop terraces & banquet suites" },
                { label: "Packages & Menus", desc: "Corporate set menus, sommelier pairings & dietary specs" },
                { label: "Operational Controls", desc: "Lead times, cancellation rules & discovery visibility" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 text-xs text-[var(--m-text-secondary)]">
                  <span className="text-[var(--m-brand)] font-bold mt-0.5">✓</span>
                  <div>
                    <span className="font-semibold text-[var(--m-text)]">{item.label}: </span>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--m-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[var(--m-text-muted)]">Don’t have a partner account yet?</span>
              <Link
                href="/partners#apply"
                className="text-[var(--m-brand)] font-semibold hover:underline"
              >
                Apply as Hospitality Partner →
              </Link>
            </div>
          </div>

          {/* Auth Card Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-[var(--m-border)] bg-white p-2 shadow-xl">
              <SignIn fallbackRedirectUrl="/dashboard" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--m-border)] bg-[var(--m-bg-alt)] py-4 text-center text-xs text-[var(--m-text-muted)] px-6">
        <p>© {new Date().getFullYear()} Relatia Technologies Pvt. Ltd. · Hospitality Partner Gateway</p>
      </footer>
    </div>
  );
}
