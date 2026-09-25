import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAppUser } from "@/lib/auth";
import { getVenueById } from "@/lib/venues/get-venue-by-id";
import { getEventById } from "@/lib/events/get-event-by-id";
import { getBookingByEvent } from "@/lib/bookings/get-booking-by-event";
import { canBookEvent, type BookingCheckResult } from "@/lib/bookings/can-book-event";
import { VenueDetailsCard } from "@/components/venues/venue-details-card";
import { SelectVenueForEventCard } from "@/components/venues/select-venue-for-event-card";

export default async function VenueDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ eventId?: string }>;
}) {
  const { id } = await params;
  const { eventId: eventIdParam } = await searchParams;

  // Validate the segment is a valid integer before hitting the DB.
  const venueId = Number(id);
  if (!Number.isInteger(venueId) || venueId <= 0) {
    notFound();
  }

  const user = await requireAppUser();

  // Fetch the active venue — returns null if missing, inactive, or cross-company.
  const venue = await getVenueById(venueId, user.companyId);

  if (!venue) {
    notFound();
  }

  // Resolve optional eventId query parameter safely for tenant
  let eventContext = null;

  if (eventIdParam) {
    const rawEventId = Number(eventIdParam);
    if (Number.isInteger(rawEventId) && rawEventId > 0) {
      const event = await getEventById(rawEventId, user.companyId);

      if (event) {
        const existingBooking = await getBookingByEvent(event.id, user.companyId);
        const bookingCheck: BookingCheckResult = canBookEvent(
          {
            id: event.id,
            companyId: event.companyId,
            status: event.status,
            booking: existingBooking ? { id: existingBooking.id } : null,
          },
          {
            id: user.id,
            companyId: user.companyId,
            role: user.role,
          },
        );

        eventContext = {
          event,
          bookingCheck,
        };
      } else {
        eventContext = {
          event: null,
          bookingCheck: {
            canBook: false as const,
            reason: `Event #${rawEventId} was not found or does not belong to your company.`,
          },
        };
      }
    } else {
      eventContext = {
        event: null,
        bookingCheck: {
          canBook: false as const,
          reason: "Invalid event ID provided in search parameters.",
        },
      };
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <Link
            href={eventIdParam ? `/venues?eventId=${eventIdParam}` : "/venues"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Venues
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Partner Venues
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {venue.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.company.name} · Venue #{venue.id}
          </p>
        </div>
      </div>

      {/* Contextual event selection UI when eventId is present */}
      {eventContext && (
        <SelectVenueForEventCard
          venue={venue}
          event={eventContext.event}
          bookingCheck={eventContext.bookingCheck}
        />
      )}

      {/* Venue detail card */}
      <VenueDetailsCard venue={venue} />
    </div>
  );
}

