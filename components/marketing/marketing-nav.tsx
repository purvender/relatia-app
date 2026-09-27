"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RelatiaLogo } from "./relatia-logo";
import { AnnouncementBar } from "./hero-section";

const links = [
  { href: "/", label: "For Enterprises" },
  { href: "/platform", label: "Platform" },
  { href: "/partners", label: "For Partners" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const isHome = pathname === "/";
  const isPartners = pathname === "/partners";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSignInOpen(false);
      }
    };
    if (menuOpen || signInOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, signInOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setSignInOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {isHome && <AnnouncementBar />}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[var(--m-bg)]/95 backdrop-blur-xl border-b border-[var(--m-border)] shadow-sm"
            : "bg-[var(--m-bg)]/80 backdrop-blur-md lg:bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="text-[var(--m-text)] hover:opacity-80 transition-opacity">
            <RelatiaLogo size="default" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[var(--m-text)] font-semibold"
                      : "text-[var(--m-text-secondary)] hover:text-[var(--m-text)]"
                  }`}
                >
                  {link.label}
                  {link.href === "/partners" && (
                    <span className="ml-1.5 inline-block rounded-full bg-[var(--m-accent)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--m-accent)] tracking-tight">
                      Partner Portal
                    </span>
                  )}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[var(--m-accent)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Dual CTAs & Sign In */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sign In Dropdown / Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSignInOpen(!signInOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--m-text-secondary)] hover:text-[var(--m-text)] transition-colors rounded-lg hover:bg-black/5"
                aria-expanded={signInOpen}
              >
                Sign In
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${signInOpen ? "rotate-180" : ""}`}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {signInOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-[var(--m-border)] bg-white p-2 shadow-xl z-50"
                  >
                    <Link
                      href="/sign-in"
                      onClick={() => setSignInOpen(false)}
                      className="group flex flex-col rounded-lg p-3 hover:bg-[var(--m-bg-alt)] transition-colors text-left"
                    >
                      <span className="text-xs font-semibold text-[var(--m-text)] group-hover:text-[var(--m-accent)]">
                        Enterprise Sign In →
                      </span>
                      <span className="text-[11px] text-[var(--m-text-secondary)] mt-0.5">
                        For corporate planners, finance teams & approvers
                      </span>
                    </Link>
                    <div className="my-1 border-t border-[var(--m-border)]" />
                    <Link
                      href="/partners/login"
                      onClick={() => setSignInOpen(false)}
                      className="group flex flex-col rounded-lg p-3 hover:bg-[var(--m-bg-alt)] transition-colors text-left"
                    >
                      <span className="text-xs font-semibold text-[var(--m-text)] group-hover:text-[var(--m-accent)] flex items-center justify-between">
                        <span>Hospitality Partner Portal →</span>
                        <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                          Venues
                        </span>
                      </span>
                      <span className="text-[11px] text-[var(--m-text-secondary)] mt-0.5">
                        For venue managers, banquet leads & restaurant partners
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contextual CTA */}
            {isPartners ? (
              <Link
                href="/partners/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--m-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--m-brand-dark)] transition-all hover:scale-[1.02]"
              >
                Apply as Partner
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              <>
                <Link
                  href="/partners"
                  className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-[var(--m-border)] bg-white/60 px-4 py-2 text-xs font-semibold text-[var(--m-text)] hover:bg-white hover:border-[var(--m-accent)] transition-colors"
                >
                  List Your Venue
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--m-text)] px-5 py-2.5 text-sm font-semibold text-[var(--m-text-on-dark)] hover:bg-[var(--m-bg-dark-alt)] transition-colors"
                >
                  Book a Demo
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 p-2 text-[var(--m-text)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--m-bg)] lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col justify-between min-h-screen pt-24 pb-12 px-6">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--m-text-muted)] mb-1">
                  Menu &amp; Pathways
                </span>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block text-2xl font-serif font-semibold py-2 transition-colors ${
                        pathname === link.href
                          ? "text-[var(--m-accent)]"
                          : "text-[var(--m-text)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8 flex flex-col gap-4 border-t border-[var(--m-border)] pt-8"
              >
                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-card)] p-4 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--m-accent)] font-semibold">
                    Enterprise Portal
                  </span>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--m-text)] px-6 py-3 text-sm font-semibold text-[var(--m-text-on-dark)]"
                    >
                      Book an Enterprise Demo
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="text-center text-xs font-semibold text-[var(--m-text-secondary)] hover:text-[var(--m-text)] py-1"
                    >
                      Enterprise Sign In →
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-bg-alt)] p-4 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--m-brand)] font-semibold">
                    Hospitality Partner Network
                  </span>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/partners/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--m-brand)] px-6 py-3 text-sm font-semibold text-white"
                    >
                      List Your Venue / Space
                    </Link>
                    <Link
                      href="/partners/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-center text-xs font-semibold text-[var(--m-text-secondary)] hover:text-[var(--m-brand)] py-1"
                    >
                      Partner Portal Login →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
