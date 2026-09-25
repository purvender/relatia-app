"use server";

import { redirect } from "next/navigation";
import { requireAppUser } from "@/lib/auth";
import { createBooking } from "@/lib/bookings/create-booking";

/**
 * Server action to select a venue for an approved event.
 * Validates inputs, authenticates user, enforces tenant & role safety,
 * creates a booking row, and updates event status to VENUE_SELECTED.
 */
export async function selectVenueForEventAction(eventId: number, venueId: number) {
  const user = await requireAppUser();

  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }

  if (!Number.isInteger(venueId) || venueId <= 0) {
    throw new Error("Invalid venue ID.");
  }

  await createBooking({
    eventId,
    venueId,
    user: {
      id: user.id,
      companyId: user.companyId,
      role: user.role,
    },
  });

  redirect(`/events/${eventId}`);
}
