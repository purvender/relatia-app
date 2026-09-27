"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Receipt,
  Settings,
  Menu,
  X,
  Building2,
  ShieldCheck,
  Layers,
} from "lucide-react";
import type { AppUserWithCompany, ScopedUser } from "@/lib/auth";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles?: Array<AppUserWithCompany["role"]>;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    label: "Venues",
    href: "/venues",
    icon: Building2,
  },
  {
    label: "Approvals",
    href: "/dashboard/approvals",
    icon: CheckSquare,
    allowedRoles: ["APPROVER", "COMPANY_ADMIN", "ADMIN"],
  },
  {
    label: "Finance",
    href: "/dashboard/finance",
    icon: Receipt,
    allowedRoles: ["FINANCE", "COMPANY_ADMIN", "ADMIN"],
  },
  {
    label: "Providers",
    href: "/dashboard/admin/providers",
    icon: Layers,
    allowedRoles: ["PLATFORM_ADMIN"],
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    allowedRoles: ["COMPANY_ADMIN", "ADMIN"],
  },
];


const PLATFORM_NAV_ITEMS: NavItem[] = [
  {
    label: "Providers",
    href: "/dashboard/admin/providers",
    icon: Layers,
    allowedRoles: ["PLATFORM_ADMIN"],
  },
];


export function DashboardShell({
  user,
  children,
}: {
  user: ScopedUser;
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPlatform = user.context.scope === "platform";
  // Tenant company is always present via the tenant guard; platform never
  // dereferences a workspace (stays platform-scoped even if companyId is set).
  const workspaceName =
    isPlatform ? "Relatia Platform" : (user.company?.name ?? "Relatia Platform");

  const filteredNavItems = isPlatform
    ? PLATFORM_NAV_ITEMS.filter((item) => {
        if (!item.allowedRoles) return true;
        return item.allowedRoles.includes(user.role);
      })
    : NAV_ITEMS.filter((item) => {
        if (!item.allowedRoles) return true;
        return item.allowedRoles.includes(user.role);
      });

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-slate-200 bg-white z-30">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-base shadow-sm">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
              Relatia
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wider">
              Corporate Events
            </span>
          </div>
        </div>

        {/* Workspace header: tenant only. Platform gets dedicated badge. */}
        {isPlatform ? (
          <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">Relatia Platform</p>
                <span className="text-[10px] font-medium uppercase text-slate-500">PLATFORM_ADMIN</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">{workspaceName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-medium uppercase text-slate-500">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                  active
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <UserButton />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-900">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white font-bold text-xs">
              R
            </div>
            <span className="text-base font-bold text-slate-900">Relatia</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600 max-w-[120px] truncate">
            {workspaceName}
          </span>
          <UserButton />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 shadow-xl">
            <div className="flex items-center justify-between px-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm">
                  R
                </div>
                <span className="text-lg font-bold text-slate-900">Relatia</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-4 py-3 bg-slate-50">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {workspaceName}
              </p>
              <p className="text-[11px] font-medium text-slate-500 uppercase mt-0.5">
                Role: {user.role}
              </p>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const active = isLinkActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <UserButton />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isPlatform ? "Platform" : "Workspace"}
            </span>
            <span className="text-sm font-bold text-slate-900">
              {workspaceName}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-900">{user.name}</p>
              <p className="text-[11px] text-slate-500">{user.email}</p>
            </div>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
