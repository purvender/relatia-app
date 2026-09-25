import "server-only";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";

export type RequestBookingInput = {
  eventId: number;
  user: {
    id: number;
    companyId: number;
    role: string;
  };
};

export type RequestBookingResult = {
  eventId: number;
  bookingId: number;
  previousStatus: string;
  newStatus: string;
  invoiceId: number;
  invoiceNumber: string;
};

/**
 * Transitions an event from VENUE_SELECTED → BOOKING_REQUESTED.
 *
 * This action represents the requester formally submitting the selected venue
 * for Finance/Admin processing and invoice preparation. It also creates the
 * GST invoice record at this point so Finance has an invoice to review.
 *
 * Invoice creation at BOOKING_REQUESTED (not at BOOKED):
 *   - Chosen because enterprise finance workflows require an invoice to exist
 *     BEFORE payment is authorized. Finance cannot approve payment without a
 *     tax invoice in hand.
 *   - BOOKED means "confirmed + locked", not "invoice created". These are
 *     distinct steps.
 *   - The invoice is created atomically in the same transaction so the system
 *     is always consistent: if invoice creation fails, the status does not change.
 *
 * Safety guarantees:
 *   - Event must belong to the caller's company (tenant check).
 *   - Event must be in VENUE_SELECTED status.
 *   - A booking must exist for the event.
 *   - No invoice may already exist for the booking (duplicate prevention).
 *   - Role must be REQUESTER or ADMIN.
 *   - paymentStatus is NOT changed — it remains PENDING.
 *   - Event does NOT transition to BOOKED (future Finance/Admin confirmation step).
 *   - Razorpay is NOT called.
 *   - Transition is atomic: event status + invoice creation happen in one transaction.
 */
export async function requestBooking(
  input: RequestBookingInput,
): Promise<RequestBookingResult> {
  const { eventId, user } = input;

  // 1. Role check — only REQUESTER or ADMIN can trigger booking request
  const allowedRoles = ["REQUESTER", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Users with role '${user.role}' cannot request booking confirmation.`,
    );
  }

  // 2. Fetch and validate event — tenant scoped
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // 3. Status gate — must be VENUE_SELECTED
  if (event.status !== "VENUE_SELECTED") {
    throw new Error(
      `Cannot request booking for an event in status '${event.status}'. Event must be in VENUE_SELECTED status.`,
    );
  }

  // 4. Fetch booking — must exist
  const booking = await db.orm.public.Booking.where({ eventId }).first();

  if (!booking) {
    throw new Error(
      "No venue booking found for this event. Select a venue before requesting booking confirmation.",
    );
  }

  // 5. Duplicate transition prevention — check if invoice already exists
  const existingInvoice = await db.orm.public.Invoice.where({
    bookingId: booking.id,
  }).first();

  if (existingInvoice) {
    throw new Error(
      "A booking request has already been submitted for this event.",
    );
  }

  // 6. Fetch venue and derive GST calculation inputs
  const venue = await db.orm.public.Venue.where({ id: booking.venueId }).first();
  const venueCity = venue?.city ?? "Unknown";
  const eventCity = event.city;

  // Use city as intra/inter-state proxy for MVP.
  // Replace with proper state codes when Company/Venue gain state fields.
  const intraState =
    venueCity.trim().toLowerCase() === eventCity.trim().toLowerCase();

  const GST_RATE = 0.18;
  const HALF_GST_RATE = GST_RATE / 2;
  const baseAmount = booking.amount;

  let cgstAmount: number;
  let sgstAmount: number;
  let igstAmount: number;
  let totalAmount: number;

  if (intraState) {
    cgstAmount = Math.floor(baseAmount * HALF_GST_RATE);
    sgstAmount = Math.floor(baseAmount * HALF_GST_RATE);
    igstAmount = 0;
    totalAmount = baseAmount + cgstAmount + sgstAmount;
  } else {
    cgstAmount = 0;
    sgstAmount = 0;
    igstAmount = Math.floor(baseAmount * GST_RATE);
    totalAmount = baseAmount + igstAmount;
  }

  // 7. Build GSTIN placeholder values
  const supplierGstin = `GSTIN-VENUE-${venue?.id ?? booking.venueId}`;
  const recipientGstin = `GSTIN-COMPANY-${user.companyId}`;

  // 8. Generate invoice number: INV-YYYYMMDD-{bookingId}
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const invoiceNumber = `INV-${y}${m}${d}-${booking.id}`;

  // 9. Atomically update event status + create invoice
  let createdInvoiceId: number | undefined;
  let createdInvoiceNumber: string | undefined;

  await db.transaction(async (tx) => {
    // Transition event status
    await tx.orm.public.Event.where({ id: eventId }).update({
      status: "BOOKING_REQUESTED",
    });

    // Create the GST invoice record
    const invoice = await tx.orm.public.Invoice.create({
      invoiceNumber,
      bookingId: booking.id,
      baseAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalAmount,
      supplierGstin,
      recipientGstin,
      status: "ISSUED",
      pdfUrl: null,
    });

    createdInvoiceId = invoice.id;
    createdInvoiceNumber = invoice.invoiceNumber;
  });

  if (!createdInvoiceId || !createdInvoiceNumber) {
    throw new Error("Booking request failed unexpectedly.");
  }

  // 10. Revalidate affected routes
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/finance");

  return {
    eventId,
    bookingId: booking.id,
    previousStatus: "VENUE_SELECTED",
    newStatus: "BOOKING_REQUESTED",
    invoiceId: createdInvoiceId,
    invoiceNumber: createdInvoiceNumber,
  };
}
