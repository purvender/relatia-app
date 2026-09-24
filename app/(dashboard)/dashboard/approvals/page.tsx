import { requireUserRole } from "@/lib/auth";
import { db } from "@/prisma/db";

export default async function ApprovalsPage() {
  const user = await requireUserRole(["APPROVER", "ADMIN"]);

  const pendingApprovals = await db.orm.public.Approval.where({
    status: "PENDING",
  }).all();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Operations
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Event Approvals
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review and approve corporate event requests for {user.company.name}.
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Approvals Queue
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          {pendingApprovals.length === 0
            ? "No pending event approval requests requiring your decision at this time."
            : `You have ${pendingApprovals.length} pending request(s) awaiting review.`}
        </p>
      </div>
    </div>
  );
}
