import "server-only";

import { db } from "@/prisma/db";
import { calculateGst, isIntraState } from "@/lib/finance/gst";

/**
 * GSTIN Fallback Strategy (MVP):
 *
 * The Company and Venue models do not yet have a `gstin` field in the schema.
 * Rather than block invoice creation, we use the event city and venue city as
 * intra/inter-state proxies, and store placeholder GSTINs in this format:
 *
 *   supplierGstin  → "GSTIN-VENUE-{venueId}"
 *   recipientGstin → "GSTIN-COMPANY-{companyId}"
 *
 * These are clearly marked as placeholders and will be replaced when the
 * Company and Venue models gain proper `gstin` fields. Every invoice record
 * created with a placeholder GSTIN can be identified by the "GSTIN-" prefix.
 *
 * This approach:
 *   - Does NOT block invoice creation
 *   - Gives Finance/Admin a visible cue that real GSTINs are missing
 *   - Is safe to replace later without data loss
 */

/**
 * Generates a unique invoice number for MVP use.
 *
 * Format: INV-{year}{month}{day}-{bookingId}
 * Example: INV-20261001-42
 *
 * This is deterministic from bookingId and date, so it will never duplicate
 * within a single booking. The booking @unique constraint ensures one invoice
 * per booking.
 */
function generateInvoiceNumber(bookingId: number): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `INV-${y}${m}${d}-${bookingId}`;
}

export type CreatedInvoice = {
  id: number;
  invoiceNumber: string;
  bookingId: number;
  baseAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  supplierGstin: string;
  recipientGstin: string;
  status: string;
  issuedAt: string;
};

/**
 * Creates a GST invoice for a confirmed booking.
 *
 * Safety guarantees:
 *   - bookingId must correspond to a booking that belongs to the given company.
 *   - Duplicate invoice creation for the same booking is blocked at DB level
 *     (@unique on bookingId) and checked before insert.
 *   - All amounts are integer paise — no floating-point stored values.
 *   - GSTIN fallback placeholders are used if real GSTINs are not yet stored
 *     on Company/Venue (see module header for fallback strategy).
 *   - pdfUrl is null — printable HTML invoice direction does not need a stored URL.
 */
export async function createInvoice(
  bookingId: number,
  companyId: number,
): Promise<CreatedInvoice> {
  // 1. Fetch booking and validate it belongs to this company
  const booking = await db.orm.public.Booking.where({ id: bookingId }).first();

  if (!booking) {
    throw new Error(`Booking #${bookingId} not found.`);
  }

  const event = await db.orm.public.Event.where({ id: booking.eventId }).first();

  if (!event || event.companyId !== companyId) {
    throw new Error("Booking does not belong to this company.");
  }

  // 2. Reject duplicate invoice creation
  const existingInvoice = await db.orm.public.Invoice.where({
    bookingId,
  }).first();

  if (existingInvoice) {
    throw new Error(`An invoice already exists for booking #${bookingId}.`);
  }

  // 3. Fetch venue for city-based intra/inter-state determination
  const venue = await db.orm.public.Venue.where({ id: booking.venueId }).first();

  const venueCity = venue?.city ?? "Unknown";
  const eventCity = event.city;

  // Compare city as a proxy for intra-state vs inter-state (MVP).
  // When Company and Venue gain state fields, replace this with proper state codes.
  const intraState = isIntraState(venueCity, eventCity);

  // 4. Calculate GST on base amount
  const baseAmount = booking.amount;
  const gst = calculateGst(baseAmount, intraState);

  // 5. Build GSTIN values — placeholder strategy (see module header)
  const supplierGstin = `GSTIN-VENUE-${venue?.id ?? booking.venueId}`;
  const recipientGstin = `GSTIN-COMPANY-${companyId}`;

  // 6. Generate invoice number
  const invoiceNumber = generateInvoiceNumber(bookingId);

  // 7. Create the invoice record
  const invoice = await db.orm.public.Invoice.create({
    invoiceNumber,
    bookingId,
    baseAmount: gst.baseAmount,
    cgstAmount: gst.cgstAmount,
    sgstAmount: gst.sgstAmount,
    igstAmount: gst.igstAmount,
    totalAmount: gst.totalAmount,
    supplierGstin,
    recipientGstin,
    status: "ISSUED",
    pdfUrl: null,
  });

  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    bookingId: invoice.bookingId,
    baseAmount: invoice.baseAmount,
    cgstAmount: invoice.cgstAmount,
    sgstAmount: invoice.sgstAmount,
    igstAmount: invoice.igstAmount,
    totalAmount: invoice.totalAmount,
    supplierGstin: invoice.supplierGstin,
    recipientGstin: invoice.recipientGstin,
    status: invoice.status,
    issuedAt: invoice.issuedAt,
  };
}
