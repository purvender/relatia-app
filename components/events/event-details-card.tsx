import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { ApprovalStatusBadge } from "@/components/approvals/approval-status-badge";
import { ApprovalActionButtons } from "@/components/approvals/approval-action-buttons";
import { EventVenueDiscoveryCard } from "@/components/events/event-venue-discovery-card";
import { EventBookingSummaryCard } from "@/components/events/event-booking-summary-card";
import { ConfirmProviderRequestButton } from "@/components/events/confirm-provider-request-button";
import type { EventWithCreator } from "@/lib/events/get-event-by-id";
import type { BookingSummary } from "@/lib/bookings/get-booking-by-event";
import type { ProviderBookingRequestDetail } from "@/lib/provider/types";
import { Building2, Clock, CheckCircle2, XCircle, Ban } from "lucide-react";

type Props = {
  event: EventWithCreator;
  booking?: BookingSummary | null;
  providerBookingRequests?: ProviderBookingRequestDetail[];
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

function ProviderRequestStatusPill({ status }: { status: string }) {
  switch (status) {
    case "PENDING_PROVIDER_REVIEW":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 border border-amber-200">
          <Clock className="h-3 w-3 text-amber-600" />
          Waiting for provider response
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Provider accepted the request
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-800 border border-rose-200">
          <XCircle className="h-3 w-3 text-rose-600" />
          Provider declined the request
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
          <Ban className="h-3 w-3 text-slate-500" />
          Request cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
          {status}
        </span>
      );
  }
}

export function EventDetailsCard({
  event,
  booking,
  providerBookingRequests = [],
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

      {/* Provider Booking Requests if any exist */}
      {providerBookingRequests.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Hospitality Partner Booking Requests
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {providerBookingRequests.length} request{providerBookingRequests.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {providerBookingRequests.map((req) => (
              <div key={req.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {req.venueName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {req.providerOrgName} · {req.venueCity}
                      {req.spaceName && ` · Space: ${req.spaceName}`}
                      {req.offeringName && ` · Package: ${req.offeringName}`}
                    </p>
                  </div>
                  <ProviderRequestStatusPill status={req.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Requested Date</span>
                    <span className="font-medium text-slate-800">
                      {formatEventDateTime(req.requestedDateTime)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Guests</span>
                    <span className="font-medium text-slate-800">
                      {req.attendees.toLocaleString("en-IN")} attendees
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Estimated Budget</span>
                    <span className="font-medium text-slate-800">
                      {req.estimatedAmountPaise
                        ? formatRupees(req.estimatedAmountPaise)
                        : "—"}
                    </span>
                  </div>
                </div>

                {req.providerResponseNote && (
                  <div className="text-xs bg-emerald-50/50 border border-emerald-100 text-emerald-900 p-2.5 rounded-md">
                    <span className="font-semibold block">Partner Response Note:</span>
                    {req.providerResponseNote}
                  </div>
                )}

                {req.rejectionReason && (
                  <div className="text-xs bg-rose-50/50 border border-rose-100 text-rose-900 p-2.5 rounded-md">
                    <span className="font-semibold block">Decline Reason:</span>
                    {req.rejectionReason}
                  </div>
                )}

                {/* Confirm & Generate Invoice CTA — shown to REQUESTER/COMPANY_ADMIN/ADMIN when provider has ACCEPTED and no booking confirmed yet */}
                {req.status === "ACCEPTED" &&
                  !booking &&
                  (currentUserRole === "REQUESTER" || currentUserRole === "COMPANY_ADMIN" || currentUserRole === "ADMIN") && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50/40 p-3">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-emerald-800">
                          Provider has confirmed availability
                        </p>
                        <p className="text-[11px] text-slate-600">
                          Confirm your commercial booking to generate the invoice and proceed to payment.
                        </p>
                      </div>
                      <ConfirmProviderRequestButton
                        requestId={req.id}
                        eventId={event.id}
                        venueName={req.venueName}
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

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
                (currentUserRole === "COMPANY_ADMIN" ||
                  currentUserRole === "ADMIN" ||
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

