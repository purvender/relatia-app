import Link from "next/link";
import { Building2, ArrowRight, MapPin, Users, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";
import { getVenueDiscoveryUrl } from "@/lib/events/get-venue-discovery-query";
import type { BookingSummary } from "@/lib/bookings/get-booking-by-event";

type EventVenueDiscoveryCardProps = {
  eventId: number;
  eventStatus: string;
  city: string;
  attendees: number;
  booking?: BookingSummary | null;
};

export function EventVenueDiscoveryCard({
  eventId,
  eventStatus,
  city,
  attendees,
  booking,
}: EventVenueDiscoveryCardProps) {
  const discoveryUrl = getVenueDiscoveryUrl({ eventId, city, attendees });

  // Case A: REJECTED or CANCELLED -> hide card
  if (eventStatus === "REJECTED" || eventStatus === "CANCELLED") {
    return null;
  }

  // Case B: Booking exists (VENUE_SELECTED or BOOKED or COMPLETED)
  if (booking) {
    const isBookedOrCompleted = eventStatus === "BOOKED" || eventStatus === "COMPLETED";

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              {isBookedOrCompleted ? "Venue Booking Confirmed" : "Partner Venue Selected"}
            </h3>
          </div>
          <p className="text-base font-bold text-slate-900">
            {booking.venueName}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {booking.venueCity}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              {attendees.toLocaleString("en-IN")} attendees
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Link
            href={`/venues/${booking.venueId}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>View Selected Venue</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {!isBookedOrCompleted && (
            <Link
              href={discoveryUrl}
              className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition cursor-pointer"
            >
              <span>Browse Other Venues</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Case C: APPROVED with no booking
  if (eventStatus === "APPROVED") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Partner Venue Discovery
            </h3>
          </div>
          <p className="text-base font-bold text-slate-900">
            Discover venues in {city}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              {attendees.toLocaleString("en-IN")} attendees
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href={discoveryUrl}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>Discover Venues</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Case D: DRAFT or REQUESTED (Locked state)
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-400 shrink-0" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Partner Venue Selection
          </h3>
        </div>
        <p className="text-sm font-medium text-slate-700">
          Venue discovery unlocks once this event request is approved.
        </p>
      </div>
    </div>
  );
}
