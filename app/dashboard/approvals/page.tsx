import { requireUserRole } from "@/lib/auth";
import { listPendingApprovals } from "@/lib/approvals/list-pending-approvals";
import { ApprovalsList } from "@/components/approvals/approvals-list";

export default async function ApprovalsPage() {
  const user = await requireUserRole(["APPROVER", "COMPANY_ADMIN", "ADMIN"]);

  const pendingApprovals = await listPendingApprovals(user);

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
          Review and decide on corporate event requests for{" "}
          <span className="font-semibold text-slate-700">{user.company.name}</span>.
        </p>
      </div>

      <ApprovalsList approvals={pendingApprovals} />
    </div>
  );
}
