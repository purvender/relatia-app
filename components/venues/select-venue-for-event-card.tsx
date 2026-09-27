"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Users,
  MapPin,
  ArrowRight,
  Info,
  Sparkles,
  Loader2,
} from "lucide-react";
import { formatRupees, getEventStatusBadgeConfig } from "@/lib/events/event-helpers";
import type { EventWithCreator } from "@/lib/events/get-event-by-id";
import type { BookingCheckResult } from "@/lib/bookings/can-book-event";
import type { VenueItem } from "@/lib/venues/get-venues";
import { selectVenueForEventAction } from "@/app/venues/actions";

type SelectVenueForEventCardProps = {
  venue: VenueItem;
  event: EventWithCreator | null;
  bookingCheck: BookingCheckResult;
};

export function SelectVenueForEventCard({
  venue,
  event,
  bookingCheck,
}: SelectVenueForEventCardProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Case 1: Event not found or invalid
  if (!event) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-rose-100 p-2 text-rose-700 shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-rose-900">
              Event Context Unavailable
            </h3>
            <p className="text-xs text-rose-700">
              {!bookingCheck.canBook
                ? bookingCheck.reason
                : "The specified event could not be found or you do not have permission to view it."}
            </p>
            <div className="pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-800 hover:text-rose-950 underline underline-offset-2"
              >
                <span>Go to Events List</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusBadge = getEventStatusBadgeConfig(event.status);
  const capacityMismatch = event.attendees > venue.capacity;
  const isSelectable = bookingCheck.canBook && !capacityMismatch;

  const handleSelectVenue = () => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await selectVenueForEventAction(event.id, venue.id);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message.includes("NEXT_REDIRECT")) return;
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to select venue for event.");
        }
      }
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
      {/* Top Banner Header */}
      <div className="bg-slate-900 px-6 py-4 text-white">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-0.5 text-xs font-semibold text-amber-400 border border-slate-700">
              <Sparkles className="h-3 w-3" />
              Selecting Venue for Event
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusBadge.className}`}
            >
              {statusBadge.label}
            </span>
          </div>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span>View Event Details (#{event.id})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-3">
          <h2 className="text-xl font-bold tracking-tight text-white">
            {event.title}
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {event.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              {event.attendees.toLocaleString("en-IN")} attendees
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
              Budget: {formatRupees(event.budget)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 space-y-4">
        {/* Capacity Caution Banner if venue capacity < attendees */}
        {capacityMismatch && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Capacity Insufficient:</span> This venue supports up to{" "}
              <span className="font-bold">{venue.capacity.toLocaleString("en-IN")} guests</span>, but your event has{" "}
              <span className="font-bold">{event.attendees.toLocaleString("en-IN")} attendees</span>. Venue selection is disabled.
            </div>
          </div>
        )}

        {/* Dynamic Error Message Box */}
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Eligibility Status & Action Bar */}
        {isSelectable ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Eligible for Venue Selection</span>
              </div>
              <p className="text-xs text-emerald-700">
                This event is approved and ready to confirm venue assignment.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-end gap-1">
              <button
                type="button"
                onClick={handleSelectVenue}
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-emerald-700 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {!venue.companyId || venue.companyId !== event.companyId
                        ? "Select Venue for Event"
                        : "Select for Event"}
                    </span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-500">
                {!venue.companyId || venue.companyId !== event.companyId
                  ? "Submits request to partner inbox"
                  : "Will mark status as VENUE_SELECTED"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                <span>Booking Selection Unavailable</span>
              </div>
              <p className="text-xs text-slate-600 max-w-prose">
                {capacityMismatch
                  ? `Venue capacity (${venue.capacity}) is lower than event attendees (${event.attendees}).`
                  : !bookingCheck.canBook
                    ? bookingCheck.reason
                    : "Event is not eligible for venue selection."}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-end gap-1">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed shadow-none"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Selection Unavailable</span>
              </button>
              <span className="text-[11px] text-slate-500">
                Event is not eligible for booking
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
