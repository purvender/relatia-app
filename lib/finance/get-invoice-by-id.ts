import "server-only";

import { db } from "@/prisma/db";

export type InvoiceDetail = {
  id: number;
  invoiceNumber: string;
  status: string;
  issuedAt: string;

  // Amounts in integer paise
  baseAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;

  supplierGstin: string;
  recipientGstin: string;
  pdfUrl: string | null;

  booking: {
    id: number;
    amount: number;
    taxAmount: number;
    paymentStatus: string;
    createdAt: string;
  };

  event: {
    id: number;
    title: string;
    eventType: string;
    city: string;
    dateTime: string;
    attendees: number;
    status: string;
  };

  venue: {
    id: number;
    name: string;
    city: string;
    address: string | null;
  } | null;

  company: {
    id: number;
    name: string;
    slug: string;
  };
};

/**
 * Fetches complete GST invoice details for a specific invoice ID,
 * validating tenant scope against the authenticated company ID.
 *
 * Returns null if:
 *   - Invoice ID does not exist
 *   - Invoice's event belongs to a different company (tenant isolation)
 */
export async function getInvoiceById(
  invoiceId: number,
  companyId: number,
): Promise<InvoiceDetail | null> {
  const invoice = await db.orm.public.Invoice.where({ id: invoiceId }).first();

  if (!invoice) {
    return null;
  }

  const booking = await db.orm.public.Booking.where({
    id: invoice.bookingId,
  }).first();

  if (!booking) {
    return null;
  }

  const event = await db.orm.public.Event.where({ id: booking.eventId }).first();

  if (!event || event.companyId !== companyId) {
    return null;
  }

  const company = await db.orm.public.Company.where({ id: companyId }).first();

  if (!company) {
    return null;
  }

  const venue = await db.orm.public.Venue.where({ id: booking.venueId }).first();

  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    issuedAt: invoice.issuedAt,

    baseAmount: invoice.baseAmount,
    cgstAmount: invoice.cgstAmount,
    sgstAmount: invoice.sgstAmount,
    igstAmount: invoice.igstAmount,
    totalAmount: invoice.totalAmount,

    supplierGstin: invoice.supplierGstin,
    recipientGstin: invoice.recipientGstin,
    pdfUrl: invoice.pdfUrl ?? null,

    booking: {
      id: booking.id,
      amount: booking.amount,
      taxAmount: booking.taxAmount,
      paymentStatus: booking.paymentStatus,
      createdAt: booking.createdAt,
    },

    event: {
      id: event.id,
      title: event.title,
      eventType: event.eventType,
      city: event.city,
      dateTime: event.dateTime,
      attendees: event.attendees,
      status: event.status,
    },

    venue: venue
      ? {
          id: venue.id,
          name: venue.name,
          city: venue.city,
          address: venue.address ?? null,
        }
      : null,

    company: {
      id: company.id,
      name: company.name,
      slug: company.slug,
    },
  };
}
