import type { Metadata } from "next";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
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
    <ClerkProvider
      dynamic
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <header className="border-b border-border bg-background">
            <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
              <Link href="/" className="text-sm font-semibold tracking-tight">
                Relatia
              </Link>
              <nav className="flex items-center gap-2">
                <Show when="signed-out">
                  <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
                    Sign in
                  </Link>
                  <Link href="/sign-up" className={buttonVariants()}>
                    Get started
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
                    Dashboard
                  </Link>
                  <UserButton />
                </Show>
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
