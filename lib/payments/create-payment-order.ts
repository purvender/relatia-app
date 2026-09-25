import "server-only";

import { db } from "@/prisma/db";
import { razorpayClient } from "@/lib/payments/razorpay";

export type CreatePaymentOrderInput = {
  eventId: number;
  user: {
    id: number;
    companyId: number;
    role: string;
  };
};

export type ClientPaymentOrder = {
  keyId: string;
  orderId: string;
  amount: number; // in paise
  currency: string;
  companyName: string;
  eventTitle: string;
  invoiceNumber: string;
  bookingId: number;
};

/**
 * Creates a Razorpay payment order for an event in BOOKING_REQUESTED status.
 *
 * Design Choice:
 *   - Takes `eventId` as input. This is optimal for UI wiring because all page
 *     routes and event summary components reference `eventId`.
 *
 * Safety guarantees:
 *   - Role guard: allowed for FINANCE and ADMIN roles.
 *   - Tenant guard: event must belong to caller's companyId.
 *   - Status gate: event must be in BOOKING_REQUESTED status.
 *   - Invoice requirement: an Invoice row MUST exist for the booking.
 *   - Amount source: amount is derived STRICTLY from `Invoice.totalAmount` in paise.
 *     Client amount inputs are NEVER accepted or trusted.
 *   - Re-entrancy / Retry safety: reuse active razorpayOrderId if present, or create a
 *     new order if needed.
 */
export async function createPaymentOrder(
  input: CreatePaymentOrderInput,
): Promise<ClientPaymentOrder> {
  const { eventId, user } = input;

  // 1. Role Authorization Guard
  const allowedRoles = ["FINANCE", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Users with role '${user.role}' cannot initiate payment orders.`,
    );
  }

  // 2. Fetch Event — Tenant Isolated
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // 3. Status Gate — Must be BOOKING_REQUESTED
  if (event.status !== "BOOKING_REQUESTED") {
    throw new Error(
      `Cannot initiate payment for an event in status '${event.status}'. Event must be BOOKING_REQUESTED.`,
    );
  }

  // 4. Fetch Booking — Must Exist
  const booking = await db.orm.public.Booking.where({ eventId }).first();

  if (!booking) {
    throw new Error("No venue booking found for this event.");
  }

  // 5. Payment Status Check — Reject if already PAID
  if (booking.paymentStatus === "PAID") {
    throw new Error("This booking has already been paid and confirmed.");
  }

  // 6. Fetch Invoice — Must Exist
  const invoice = await db.orm.public.Invoice.where({
    bookingId: booking.id,
  }).first();

  if (!invoice) {
    throw new Error(
      "No tax invoice found for this booking. Request a booking first.",
    );
  }

  // 7. Fetch Company for receipt metadata
  const company = await db.orm.public.Company.where({
    id: user.companyId,
  }).first();

  const companyName = company?.name ?? "Relatia Customer";

  // 8. Derive charge amount from Invoice.totalAmount in paise
  const amountPaise = invoice.totalAmount;

  if (!Number.isInteger(amountPaise) || amountPaise <= 0) {
    throw new Error("Invalid invoice total amount.");
  }

  // 9. Reuse or Create Razorpay Order
  let razorpayOrderId = booking.razorpayOrderId;

  if (!razorpayOrderId) {
    try {
      const order = await razorpayClient.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: invoice.invoiceNumber,
        notes: {
          eventId: String(eventId),
          bookingId: String(booking.id),
          companyId: String(user.companyId),
          invoiceNumber: invoice.invoiceNumber,
        },
      });

      razorpayOrderId = order.id;

      // Update Booking row with razorpayOrderId
      await db.orm.public.Booking.where({ id: booking.id }).update({
        razorpayOrderId: order.id,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Razorpay Order Creation Failed: ${msg}`);
    }
  }

  const keyId =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder_key";

  return {
    keyId,
    orderId: razorpayOrderId,
    amount: amountPaise,
    currency: "INR",
    companyName,
    eventTitle: event.title,
    invoiceNumber: invoice.invoiceNumber,
    bookingId: booking.id,
  };
}
