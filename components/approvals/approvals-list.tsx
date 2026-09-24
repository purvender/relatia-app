import { CheckCircle2 } from "lucide-react";
import { ApprovalListItem } from "@/components/approvals/approval-list-item";
import type { PendingApprovalWithDetails } from "@/lib/approvals/list-pending-approvals";

type ApprovalsListProps = {
  approvals: PendingApprovalWithDetails[];
};

export function ApprovalsList({ approvals }: ApprovalsListProps) {
  if (approvals.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-2xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          All Caught Up
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          There are currently no pending event approval requests requiring your review.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Pending Approval Requests ({approvals.length})
        </h2>
      </div>
      <div className="divide-y divide-slate-100">
        {approvals.map((approval) => (
          <ApprovalListItem key={approval.id} approval={approval} />
        ))}
      </div>
    </div>
  );
}
