"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RelatiaLogo } from "./relatia-logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--m-bg)]/95 backdrop-blur-xl border-b border-[var(--m-border)]"
          : "bg-transparent"
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
                    ? "text-[var(--m-text)]"
                    : "text-[var(--m-text-secondary)] hover:text-[var(--m-text)]"
                }`}
              >
                {link.label}
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-[var(--m-text-secondary)] hover:text-[var(--m-text)] transition-colors"
          >
            Sign In
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--m-bg)] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-2 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-3xl font-serif font-semibold py-3 transition-colors ${
                      pathname === link.href
                        ? "text-[var(--m-accent)]"
                        : "text-[var(--m-text)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 flex flex-col gap-4 items-center"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--m-text)] px-8 py-3.5 text-base font-semibold text-[var(--m-text-on-dark)]"
                >
                  Book a Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[var(--m-text-secondary)]"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
