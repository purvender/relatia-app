import "server-only";

import { db } from "@/prisma/db";

export type BookingSummary = {
  id: number;
  eventId: number;
  venueId: number;
  venueName: string;
  venueCity: string;
  amount: number;       // In paise
  taxAmount: number;    // In paise
  currency: string;
  paymentStatus: string;
  createdAt: string;
  invoiceId?: number;
  invoiceNumber?: string;
};

/**
 * Fetches the booking for a given event, with venue details included.
 * Validates that the event belongs to the specified company (tenant safety).
 *
 * Returns null if:
 *   - No booking exists for this event.
 *   - The event does not belong to the given company.
 */
export async function getBookingByEvent(
  eventId: number,
  companyId: number,
): Promise<BookingSummary | null> {
  // Validate event belongs to company before exposing booking data
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== companyId) {
    return null;
  }

  const booking = await db.orm.public.Booking.where({ eventId }).first();

  if (!booking) {
    return null;
  }

  // Fetch venue details for display on event detail page
  const venue = await db.orm.public.Venue.where({ id: booking.venueId }).first();

  // Fetch invoice if generated for this booking
  const invoice = await db.orm.public.Invoice.where({ bookingId: booking.id }).first();

  return {
    id: booking.id,
    eventId: booking.eventId,
    venueId: booking.venueId,
    venueName: venue?.name ?? `Venue #${booking.venueId}`,
    venueCity: venue?.city ?? "—",
    amount: booking.amount,
    taxAmount: booking.taxAmount,
    currency: booking.currency,
    paymentStatus: booking.paymentStatus,
    createdAt: booking.createdAt,
    invoiceId: invoice?.id,
    invoiceNumber: invoice?.invoiceNumber,
  };
}
