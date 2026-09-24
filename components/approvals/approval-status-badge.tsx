type ApprovalStatusBadgeProps = {
  status: string;
};

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
          Pending Review
        </span>
      );
    case "APPROVED":
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
          Approved
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
          {status}
        </span>
      );
  }
}
