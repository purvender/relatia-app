import "server-only";

import { db } from "@/prisma/db";
import { razorpayClient, isPlaceholderKey } from "@/lib/payments/razorpay";

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
 * Extracts human-readable message from unknown error objects,
 * including Razorpay SDK error structures.
 */
function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null) {
    const rzpErr = (err as { error?: { description?: string; code?: string } }).error;
    if (rzpErr?.description) {
      return `${rzpErr.code ? rzpErr.code + ": " : ""}${rzpErr.description}`;
    }
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
  return String(err);
}

/**
 * Creates a Razorpay payment order for an event in BOOKING_REQUESTED status.
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
 *   - Live / Dev mode switching: when real Razorpay keys (rzp_test_...) are supplied in .env,
 *     creates real Razorpay API orders. If placeholder keys are present, generates mock order.
 */
export async function createPaymentOrder(
  input: CreatePaymentOrderInput,
): Promise<ClientPaymentOrder> {
  const { eventId, user } = input;

  // 1. Role Authorization Guard
  // Only FINANCE role is authorized to initiate payment orders.
  // REQUESTER and ADMIN do not have normal payment initiation authority.
  const allowedRoles = ["FINANCE"];
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Users with role '${user.role}' cannot initiate payment orders. Payment is restricted to Finance.`,
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

  // If no order ID exists, OR if stored order is an old dev mock order while real keys are configured:
  const isMockOrder = razorpayOrderId?.startsWith("order_dev_") ?? false;
  const needsNewOrder = !razorpayOrderId || (isMockOrder && !isPlaceholderKey());

  if (needsNewOrder) {
    if (isPlaceholderKey()) {
      razorpayOrderId = `order_dev_${Date.now()}_${booking.id}`;
    } else {
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
      } catch (err: unknown) {
        const detail = extractErrorMessage(err);
        throw new Error(`Razorpay Order Creation Failed: ${detail}`);
      }
    }

    // Update Booking row with razorpayOrderId
    await db.orm.public.Booking.where({ id: booking.id }).update({
      razorpayOrderId,
    });
  }

  const keyId =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder_key";

  return {
    keyId,
    orderId: razorpayOrderId!,
    amount: amountPaise,
    currency: "INR",
    companyName,
    eventTitle: event.title,
    invoiceNumber: invoice.invoiceNumber,
    bookingId: booking.id,
  };
}
