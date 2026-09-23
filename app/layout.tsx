import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relatia",
  description: "Relatia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <header className="border-b border-border bg-background">
            <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
              <span className="text-sm font-semibold tracking-tight">Relatia</span>
              <nav className="flex items-center gap-2">
                <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
                  Sign in
                </Link>
                <Link href="/sign-up" className={buttonVariants()}>
                  Get started
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
