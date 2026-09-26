import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RelatiaLogo } from "@/components/marketing/relatia-logo";

export const metadata: Metadata = {
  title: "Register as Hospitality Partner — Relatia",
  description: "Create your partner credentials for the Relatia Hospitality Network to list private dining spaces, configure set menus, and receive verified enterprise bookings.",
};

export default async function PartnerSignUpPage() {
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
              Already registered?
            </span>
            <Link
              href="/partners/login"
              className="text-[var(--m-brand)] hover:underline font-semibold"
            >
              Partner Sign In →
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
              Partner Account Registration
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--m-text)] tracking-tight">
              Join the Relatia Hospitality Partner Network
            </h1>

            <p className="text-sm text-[var(--m-text-secondary)] font-light leading-relaxed">
              Create your partner administrator credentials. Once registered, you can configure your venue profile, catalog private dining spaces, define set packages, and submit for verification.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 space-y-1">
              <div className="font-semibold">Vetting &amp; Publishing Notice:</div>
              <p>
                Signing up creates your provider management account. Your venue listings will only appear in corporate discovery after operational review and verification.
              </p>
            </div>

            <div className="pt-2 text-xs text-[var(--m-text-secondary)]">
              Prefer a direct onboarding consultation with our team?{" "}
              <Link href="/partners#apply" className="text-[var(--m-brand)] font-semibold underline">
                Fill the fast intake form →
              </Link>
            </div>
          </div>

          {/* Auth Card Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-[var(--m-border)] bg-white p-2 shadow-xl">
              <SignUp fallbackRedirectUrl="/dashboard" />
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
