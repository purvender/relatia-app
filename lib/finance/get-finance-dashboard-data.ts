import "server-only";

import { db } from "@/prisma/db";

export type FinanceRecord = {
  eventId: number;
  eventTitle: string;
  eventType: string;
  eventStatus: string;
  eventCity: string;
  eventDate: string;
  createdByName: string;

  bookingId: number | null;
  venueId: number | null;
  venueName: string | null;
  bookingAmount: number | null; // in paise
  bookingTaxAmount: number | null; // in paise
  paymentStatus: string | null; // PENDING, PAID, FAILED, REFUNDED

  invoiceId: number | null;
  invoiceNumber: string | null;
  baseAmount: number | null; // in paise
  cgstAmount: number | null; // in paise
  sgstAmount: number | null; // in paise
  igstAmount: number | null; // in paise
  totalAmount: number | null; // in paise
  invoiceStatus: string | null; // ISSUED, PAID, CANCELLED
  issuedAt: string | null;
};

export type FinanceDashboardMetrics = {
  totalBookingRequests: number;
  totalInvoicesIssued: number;
  pendingPaymentCount: number;
  totalInvoicedAmount: number; // in paise
  totalBaseAmount: number; // in paise
  totalGstAmount: number; // in paise
};

export type FinanceDashboardData = {
  metrics: FinanceDashboardMetrics;
  records: FinanceRecord[];
};

/**
 * Fetches tenant-isolated finance data and calculates summary metrics
 * for the specified company.
 *
 * Included events:
 *   - Events with a Booking row attached
 *   - OR Events with status IN (VENUE_SELECTED, BOOKING_REQUESTED, BOOKED, COMPLETED, CANCELLED)
 *
 * Safety guarantees:
 *   - All queries filter by companyId directly or via event ownership (tenant isolation).
 *   - Amounts remain in integer paise.
 */
export async function getFinanceDashboardData(
  companyId: number,
): Promise<FinanceDashboardData> {
  // 1. Fetch all events for the company
  const events = await db.orm.public.Event.where({ companyId }).all();

  const records: FinanceRecord[] = [];

  for (const event of events) {
    // We filter for events that have reached venue selection or finance steps,
    // or simply have a booking record attached.
    const booking = await db.orm.public.Booking.where({ eventId: event.id }).first();

    const isFinanceRelevant =
      booking != null ||
      [
        "VENUE_SELECTED",
        "BOOKING_REQUESTED",
        "BOOKED",
        "COMPLETED",
        "CANCELLED",
      ].includes(event.status);

    if (!isFinanceRelevant) {
      continue;
    }

    let creatorName = "—";
    if (event.createdById) {
      const creator = await db.orm.public.User.where({
        id: event.createdById,
      }).first();
      if (creator) {
        creatorName = creator.name;
      }
    }

    let venueName: string | null = null;
    let venueId: number | null = null;

    if (booking) {
      venueId = booking.venueId;
      const venue = await db.orm.public.Venue.where({
        id: booking.venueId,
      }).first();
      if (venue) {
        venueName = venue.name;
      }
    }

    let invoice = null;
    if (booking) {
      invoice = await db.orm.public.Invoice.where({
        bookingId: booking.id,
      }).first();
    }

    records.push({
      eventId: event.id,
      eventTitle: event.title,
      eventType: event.eventType,
      eventStatus: event.status,
      eventCity: event.city,
      eventDate: event.dateTime,
      createdByName: creatorName,

      bookingId: booking?.id ?? null,
      venueId,
      venueName,
      bookingAmount: booking?.amount ?? null,
      bookingTaxAmount: booking?.taxAmount ?? null,
      paymentStatus: booking?.paymentStatus ?? null,

      invoiceId: invoice?.id ?? null,
      invoiceNumber: invoice?.invoiceNumber ?? null,
      baseAmount: invoice?.baseAmount ?? (booking ? booking.amount : null),
      cgstAmount: invoice?.cgstAmount ?? null,
      sgstAmount: invoice?.sgstAmount ?? null,
      igstAmount: invoice?.igstAmount ?? null,
      totalAmount:
        invoice?.totalAmount ??
        (booking ? booking.amount + booking.taxAmount : null),
      invoiceStatus: invoice?.status ?? null,
      issuedAt: invoice?.issuedAt ?? null,
    });
  }

  // Sort by event date descending (newest first)
  records.sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));

  // 2. Compute summary metrics
  let totalBookingRequests = 0;
  let totalInvoicesIssued = 0;
  let pendingPaymentCount = 0;
  let totalInvoicedAmount = 0;
  let totalBaseAmount = 0;
  let totalGstAmount = 0;

  for (const record of records) {
    if (record.eventStatus === "BOOKING_REQUESTED") {
      totalBookingRequests++;
    }

    if (record.invoiceId != null && record.invoiceStatus !== "CANCELLED") {
      totalInvoicesIssued++;
    }

    if (record.bookingId != null && record.paymentStatus === "PENDING") {
      pendingPaymentCount++;
    }

    if (record.totalAmount != null) {
      totalInvoicedAmount += record.totalAmount;
    }

    if (record.baseAmount != null) {
      totalBaseAmount += record.baseAmount;
    }

    const gst =
      (record.cgstAmount ?? 0) +
      (record.sgstAmount ?? 0) +
      (record.igstAmount ?? 0);
    totalGstAmount += gst;
  }

  return {
    metrics: {
      totalBookingRequests,
      totalInvoicesIssued,
      pendingPaymentCount,
      totalInvoicedAmount,
      totalBaseAmount,
      totalGstAmount,
    },
    records,
  };
}
