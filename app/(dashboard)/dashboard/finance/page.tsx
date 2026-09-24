import { requireUserRole } from "@/lib/auth";

export default async function FinancePage() {
  const user = await requireUserRole(["FINANCE", "ADMIN"]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Financial Operations
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Finance & Invoices
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage corporate billing, budget tracking, and GST invoices for {user.company.name}.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-2xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Billing & GST Settlement
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          Invoices and GST settlement records will appear here as corporate events are booked and settled.
        </p>
      </div>
    </div>
  );
}
