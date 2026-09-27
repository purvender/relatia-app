"use server";

import { redirect } from "next/navigation";
import { requireAppUser } from "@/lib/auth";
import { createBooking } from "@/lib/bookings/create-booking";
import { createProviderBookingRequestRecord } from "@/lib/provider/service";
import { db } from "@/prisma/db";

/**
 * Server action to select a venue for an approved event.
 * Validates inputs, authenticates user, enforces tenant & role safety.
 *
 * - Same-company internal venue: creates direct booking row and updates event status to VENUE_SELECTED.
 * - Hospitality provider venue: creates Day 20 ProviderBookingRequest record in PENDING_PROVIDER_REVIEW state.
 */
export async function selectVenueForEventAction(eventId: number, venueId: number) {
  const user = await requireAppUser();

  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }

  if (!Number.isInteger(venueId) || venueId <= 0) {
    throw new Error("Invalid venue ID.");
  }

  const venue = await db.orm.public.Venue.where({ id: venueId }).first();

  if (!venue || !venue.active) {
    throw new Error("Venue not found or inactive.");
  }

  // Provider venue path (cross-company or linked to provider organization)
  if (venue.providerOrgId || venue.companyId !== user.companyId) {
    const event = await db.orm.public.Event.where({ id: eventId }).first();
    if (!event || event.companyId !== user.companyId) {
      throw new Error("Event not found or access denied.");
    }

    await createProviderBookingRequestRecord(
      {
        eventId,
        venueId,
        requestedDateTime: event.dateTime,
        attendees: event.attendees,
        estimatedAmountPaise: event.budget,
      },
      {
        id: user.id,
        companyId: user.companyId,
        role: user.role,
      },
    );
  } else {
    // Legacy direct-booking path for same-company internal venues
    await createBooking({
      eventId,
      venueId,
      user: {
        id: user.id,
        companyId: user.companyId,
        role: user.role,
      },
    });
  }

  redirect(`/events/${eventId}`);
}

