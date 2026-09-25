import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { ApprovalStatusBadge } from "@/components/approvals/approval-status-badge";
import { ApprovalActionButtons } from "@/components/approvals/approval-action-buttons";
import { EventVenueDiscoveryCard } from "@/components/events/event-venue-discovery-card";
import { EventBookingSummaryCard } from "@/components/events/event-booking-summary-card";
import type { EventWithCreator } from "@/lib/events/get-event-by-id";
import type { BookingSummary } from "@/lib/bookings/get-booking-by-event";

type Props = {
  event: EventWithCreator;
  booking?: BookingSummary | null;
  currentUserId?: number;
  currentUserRole?: string;
};

type MetaRowProps = {
  label: string;
  value: React.ReactNode;
};

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-0">
      <dt className="w-full sm:w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="text-sm text-slate-800">{value}</dd>
    </div>
  );
}

export function EventDetailsCard({
  event,
  booking,
  currentUserId,
  currentUserRole,
}: Props) {
  const perPersonPaise =
    event.attendees > 0 ? Math.floor(event.budget / event.attendees) : 0;

  const dietLabel: Record<string, string> = {
    NONE: "No preference",
    VEG: "Vegetarian",
    NON_VEG: "Non-vegetarian",
    JAIN: "Jain",
    VEGAN: "Vegan",
  };

  return (
    <div className="space-y-6">
      {/* Header row: title + status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {event.eventType}
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            {event.title}
          </h2>
          {event.purpose ? (
            <p className="mt-1.5 text-sm text-slate-600 max-w-prose">
              {event.purpose}
            </p>
          ) : (
            <p className="mt-1.5 text-sm italic text-slate-400">
              No business purpose provided.
            </p>
          )}
        </div>
        <div className="shrink-0">
          <EventStatusBadge status={event.status} />
        </div>
      </div>

      {/* Booking Summary Section if booking exists */}
      {booking && <EventBookingSummaryCard booking={booking} />}

      {/* Details grid */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          Event Details
        </h3>
        <dl className="space-y-4">
          <MetaRow label="City" value={event.city} />
          <MetaRow
            label="Date & Time"
            value={formatEventDateTime(event.dateTime)}
          />
          <MetaRow
            label="Attendees"
            value={`${event.attendees.toLocaleString("en-IN")} people`}
          />
          <MetaRow
            label="Total Budget"
            value={
              <span className="font-semibold text-slate-900">
                {formatRupees(event.budget)}
              </span>
            }
          />
          <MetaRow
            label="Per Person"
            value={
              <span className="text-slate-600">
                {perPersonPaise > 0 ? formatRupees(perPersonPaise) : "—"}
              </span>
            }
          />
          <MetaRow
            label="Dietary"
            value={dietLabel[event.diet] ?? event.diet}
          />
        </dl>
      </div>

      {/* Venue Discovery / Action Card */}
      <EventVenueDiscoveryCard
        eventId={event.id}
        eventStatus={event.status}
        city={event.city}
        attendees={event.attendees}
        booking={booking}
      />

      {/* Approval Workflow section if approvals exist */}
      {event.approvals.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            Approval Workflow
          </h3>
          <div className="divide-y divide-slate-100">
            {event.approvals.map((appr) => {
              const canUserActOnThis =
                appr.status === "PENDING" &&
                (currentUserRole === "ADMIN" ||
                  (currentUserRole === "APPROVER" &&
                    appr.approverId === currentUserId));

              return (
                <div
                  key={appr.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        {appr.approver
                          ? appr.approver.name
                          : `Approver #${appr.approverId}`}
                      </p>
                      <ApprovalStatusBadge status={appr.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {appr.approver?.email} · Role: {appr.approver?.role}
                    </p>
                    {appr.reason && (
                      <p className="mt-1 text-xs italic text-slate-600">
                        &quot;{appr.reason}&quot;
                      </p>
                    )}
                  </div>

                  {canUserActOnThis && (
                    <div className="shrink-0 pt-2 sm:pt-0">
                      <ApprovalActionButtons approvalId={appr.id} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          Record Information
        </h3>
        <dl className="space-y-4">
          <MetaRow label="Event ID" value={`#${event.id}`} />
          <MetaRow
            label="Created by"
            value={
              event.createdBy ? (
                <span>
                  {event.createdBy.name}{" "}
                  <span className="text-slate-500">
                    ({event.createdBy.email})
                  </span>
                </span>
              ) : (
                "—"
              )
            }
          />
          <MetaRow
            label="Created"
            value={formatEventDateTime(event.createdAt)}
          />
          <MetaRow
            label="Status"
            value={<EventStatusBadge status={event.status} />}
          />
        </dl>
      </div>
    </div>
  );
}
