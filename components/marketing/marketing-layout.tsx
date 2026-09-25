import { Playfair_Display } from "next/font/google";
import { MarketingNav } from "./marketing-nav";
import { MarketingFooter } from "./marketing-footer";
import "@/app/marketing.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Marketing page layout wrapper.
 * Loads the serif display font, renders the premium nav and footer,
 * and wraps all marketing content in the correct design token scope.
 */
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`marketing-root ${playfair.variable} bg-[var(--m-bg)] text-[var(--m-text)] min-h-screen`}
      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
