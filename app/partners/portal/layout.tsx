import type { Metadata } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { RelatiaLogo } from "@/components/marketing/relatia-logo";

export const metadata: Metadata = {
  title: "Partner Portal — Relatia Hospitality Network",
  description: "Manage your hospitality partner profile, venue details, and onboarding status.",
};

export default function PartnerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFCFA] flex flex-col">
      {/* Partner portal header */}
      <header className="border-b border-[#E8E3DA] bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/partners/portal" className="hover:opacity-80 transition-opacity">
              <RelatiaLogo size="sm" />
            </Link>
            <span className="hidden sm:inline text-[10px] font-mono text-[#A9A49C] border border-[#E8E3DA] rounded px-2 py-0.5 tracking-wider uppercase">
              Hospitality Partner
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#7A756D]">
            <Link href="/partners/portal" className="hover:text-[#1A1714] transition-colors">
              Dashboard
            </Link>
            <Link href="/partners/portal/inbox" className="hover:text-[#1A1714] transition-colors">
              Booking Requests
            </Link>
            <Link href="/partners/portal/onboarding" className="hover:text-[#1A1714] transition-colors">
              Complete Profile
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline text-xs text-[#A9A49C] hover:text-[#7A756D] transition-colors"
            >
              Public site
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E3DA] py-4 text-center text-[11px] text-[#A9A49C]">
        © {new Date().getFullYear()} Relatia Technologies Pvt. Ltd. · Hospitality Partner Portal
      </footer>
    </div>
  );
}
