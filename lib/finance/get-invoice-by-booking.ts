import "server-only";

import { db } from "@/prisma/db";

export type InvoiceSummary = {
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
  pdfUrl: string | null;
  issuedAt: string;
};

/**
 * Fetches the invoice for a given booking, scoped to a company.
 *
 * Returns null if:
 *   - No invoice exists for this booking.
 *   - The booking's event does not belong to the given company.
 */
export async function getInvoiceByBooking(
  bookingId: number,
  companyId: number,
): Promise<InvoiceSummary | null> {
  // Validate tenant scope via booking → event → company chain
  const booking = await db.orm.public.Booking.where({ id: bookingId }).first();

  if (!booking) {
    return null;
  }

  const event = await db.orm.public.Event.where({ id: booking.eventId }).first();

  if (!event || event.companyId !== companyId) {
    return null;
  }

  const invoice = await db.orm.public.Invoice.where({ bookingId }).first();

  if (!invoice) {
    return null;
  }

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
    pdfUrl: invoice.pdfUrl ?? null,
    issuedAt: invoice.issuedAt,
  };
}
