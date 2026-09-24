import Link from "next/link";
import { MapPin, Users, CalendarDays, ExternalLink } from "lucide-react";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import { ApprovalStatusBadge } from "@/components/approvals/approval-status-badge";
import { ApprovalActionButtons } from "@/components/approvals/approval-action-buttons";
import type { PendingApprovalWithDetails } from "@/lib/approvals/list-pending-approvals";

type ApprovalListItemProps = {
  approval: PendingApprovalWithDetails;
};

export function ApprovalListItem({ approval }: ApprovalListItemProps) {
  const { event, approver } = approval;

  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-slate-50/50">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/events/${event.id}`}
            className="group inline-flex items-center gap-1.5 text-base font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <span className="truncate">{event.title}</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
          </Link>
          <ApprovalStatusBadge status={approval.status} />
        </div>

        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{event.eventType}</span>
          {event.createdBy && (
            <span>
              {" "}
              requested by{" "}
              <span className="font-medium text-slate-800">
                {event.createdBy.name}
              </span>{" "}
              ({event.createdBy.email})
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {event.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {formatEventDateTime(event.dateTime)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0" />
            {event.attendees.toLocaleString("en-IN")} attendees
          </span>
          <span className="font-semibold text-slate-900">
            {formatRupees(event.budget)}
          </span>
        </div>

        {approver && (
          <p className="text-xs text-slate-400">
            Assigned Approver: {approver.name} ({approver.email})
          </p>
        )}
      </div>

      <div className="shrink-0 pt-2 sm:pt-0">
        <ApprovalActionButtons approvalId={approval.id} />
      </div>
    </div>
  );
}
