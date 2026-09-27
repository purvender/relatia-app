import Link from "next/link";
import { Building2, MapPin, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import type { BookingSummary } from "@/lib/bookings/get-booking-by-event";

type EventBookingSummaryCardProps = {
  booking: BookingSummary;
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

function getPaymentStatusBadge(status: string) {
  switch (status.toUpperCase()) {
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Paid by Finance
        </span>
      );
    case "FAILED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
          <Clock className="h-3.5 w-3.5" />
          Finance Payment Failed
        </span>
      );
    case "PENDING":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
          <Clock className="h-3.5 w-3.5" />
          Awaiting Finance Payment
        </span>
      );
  }
}

export function EventBookingSummaryCard({ booking }: EventBookingSummaryCardProps) {
  const totalPaise = booking.amount + booking.taxAmount;

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-6 shadow-2xs space-y-4">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-teal-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <Building2 className="h-3.5 w-3.5" />
              Venue Assignment Confirmed
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-slate-900 flex items-center gap-1.5">
            <span>{booking.venueName}</span>
            <Link
              href={`/venues/${booking.venueId}`}
              className="inline-flex items-center text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>View Venue</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 text-slate-400" />
            {booking.venueCity}
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:items-end gap-1">
          {getPaymentStatusBadge(booking.paymentStatus)}
          <span className="text-[11px] text-slate-500">
            Booking #{booking.id}
          </span>
        </div>
      </div>

      {/* Financial Breakdown Grid */}
      <dl className="space-y-3.5">
        <MetaRow
          label="Selected Venue"
          value={
            <span className="font-semibold text-slate-900">
              {booking.venueName} ({booking.venueCity})
            </span>
          }
        />
        <MetaRow
          label="Venue Base Cost"
          value={
            <span className="font-medium text-slate-900">
              {formatRupees(booking.amount)}
            </span>
          }
        />
        <MetaRow
          label="Estimated GST (18%)"
          value={
            <span className="text-slate-600">
              {formatRupees(booking.taxAmount)}
            </span>
          }
        />
        <MetaRow
          label="Total Amount"
          value={
            <span className="text-base font-bold text-slate-900">
              {formatRupees(totalPaise)}{" "}
              <span className="text-xs font-normal text-slate-500">({booking.currency})</span>
            </span>
          }
        />
        <MetaRow
          label="Selection Date"
          value={formatEventDateTime(booking.createdAt)}
        />
      </dl>
    </div>
  );
}
