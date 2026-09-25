import "server-only";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import { canBookEvent, type UserForBookingCheck } from "@/lib/bookings/can-book-event";

/**
 * GST rate used as a placeholder for tax computation.
 * Real CGST/SGST breakdown is Day 6 invoice scope.
 */
const GST_RATE = 0.18;

/**
 * Computes the tax amount in paise given a base amount in paise.
 * Result is always a whole integer (floor to avoid fractional paise).
 */
export function computeTaxAmount(amountPaise: number): number {
  return Math.floor(amountPaise * GST_RATE);
}

export type CreateBookingInput = {
  eventId: number;
  venueId: number;
  user: UserForBookingCheck;
};

export type CreateBookingResult = {
  bookingId: number;
  eventId: number;
  venueId: number;
  amount: number;
  taxAmount: number;
  paymentStatus: string;
};

/**
 * Creates exactly one booking for an approved event at a selected venue,
 * and updates event status from APPROVED to VENUE_SELECTED.
 *
 * Safety guarantees:
 *   - Event must belong to the caller's company (tenant check).
 *   - Event must be in APPROVED status (canBookEvent guard).
 *   - No existing booking may exist for the event (canBookEvent guard + DB @unique).
 *   - User role must be REQUESTER or ADMIN (canBookEvent guard).
 *   - Venue must be active and belong to the same company.
 *   - Venue capacity must be >= event attendees.
 *   - amount = event.budget (in paise).
 *   - taxAmount = floor(amount * 18%) as a GST placeholder (in paise).
 *   - paymentStatus defaults to PENDING.
 *   - Event status is updated from APPROVED → VENUE_SELECTED atomically in a transaction.
 *   - Event does NOT transition to BOOKED yet (future booking confirmation scope).
 *   - Invoice is NOT created here (Day 6 FINANCE scope).
 *   - Razorpay is NOT called (Day 6+ payment scope).
 */
export async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const { eventId, venueId, user } = input;

  // 1. Fetch and validate event — tenant scoped
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // 2. Fetch existing booking (if any) to pass into eligibility check
  const existingBooking = await db.orm.public.Booking.where({
    eventId,
  }).first();

  // 3. Run eligibility check (tenant, status == APPROVED, no booking, role)
  const check = canBookEvent(
    {
      id: event.id,
      companyId: event.companyId,
      status: event.status,
      booking: existingBooking ?? null,
    },
    user,
  );

  if (!check.canBook) {
    throw new Error(check.reason);
  }

  // 4. Validate venue — active, tenant matching, and sufficient capacity
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();

  if (!venue || venue.companyId !== user.companyId || !venue.active) {
    throw new Error("Venue not found, inactive, or belongs to a different company.");
  }

  if (venue.capacity < event.attendees) {
    throw new Error(
      `Venue capacity (${venue.capacity.toLocaleString("en-IN")}) is lower than event attendees (${event.attendees.toLocaleString("en-IN")}).`
    );
  }

  // 5. Compute amounts in paise
  const amount = event.budget;
  const taxAmount = computeTaxAmount(amount);

  // 6. Create booking + update event status to VENUE_SELECTED atomically
  let createdBooking: { id: number; paymentStatus: string } | undefined;

  try {
    await db.transaction(async (tx) => {
      createdBooking = await tx.orm.public.Booking.create({
        eventId,
        venueId,
        amount,
        taxAmount,
        currency: "INR",
        paymentStatus: "PENDING",
      });

      await tx.orm.public.Event.where({ id: eventId }).update({
        status: "VENUE_SELECTED",
      });
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("unique") ||
      msg.includes("duplicate") ||
      msg.includes("Booking_eventId")
    ) {
      throw new Error("This event already has a venue booking.");
    }
    throw err;
  }

  if (!createdBooking) {
    throw new Error("Booking creation failed unexpectedly.");
  }

  // 7. Revalidate affected pages so SSR picks up the new state
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  revalidatePath(`/venues/${venueId}`);
  revalidatePath("/venues");
  revalidatePath("/dashboard");

  return {
    bookingId: createdBooking.id,
    eventId,
    venueId,
    amount,
    taxAmount,
    paymentStatus: createdBooking.paymentStatus,
  };
}
