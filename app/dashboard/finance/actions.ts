"use server";

import { revalidatePath } from "next/cache";
import { requireUserRole } from "@/lib/auth";
import { db } from "@/prisma/db";
import { createPaymentOrder } from "@/lib/payments/create-payment-order";
import { verifyPayment } from "@/lib/payments/verify-payment";

/**
 * Server Action: Initiates a Razorpay payment order for an event.
 *
 * Permission: FINANCE role only.
 * Tenant Isolation: Enforced via requireUserRole and companyId checks in service layer.
 */
export async function createPaymentOrderAction(eventId: number) {
  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }

  // Payment creation is strictly controlled by the FINANCE role
  const user = await requireUserRole(["FINANCE"]);

  return await createPaymentOrder({
    eventId,
    user: {
      id: user.id,
      companyId: user.companyId,
      role: user.role,
    },
  });
}

export type VerifyPaymentActionInput = {
  eventId: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

/**
 * Server Action: Cryptographically verifies a completed Razorpay checkout signature
 * and atomically updates the event, booking, and invoice states to PAID / BOOKED.
 *
 * Permission: FINANCE role only.
 * Tenant Isolation: Enforced via event companyId checks.
 *
 * Atomic Transaction on Success:
 *   - Booking.paymentStatus = "PAID"
 *   - Booking.razorpayPaymentId = razorpayPaymentId
 *   - Booking.razorpaySignature = razorpaySignature
 *   - Booking.paidAt = ISO timestamp
 *   - Invoice.status = "PAID"
 *   - Event.status = "BOOKED"
 *
 * Duplicate / Idempotency Safety:
 *   - If already PAID, returns success gracefully without repeating mutations.
 */
export async function verifyPaymentAction(input: VerifyPaymentActionInput) {
  const { eventId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = input;

  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error("Invalid event ID.");
  }

  // Payment verification is strictly controlled by the FINANCE role
  const user = await requireUserRole(["FINANCE"]);

  // 1. Fetch event — tenant scoped
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // 2. Fetch booking — must exist
  const booking = await db.orm.public.Booking.where({ eventId }).first();

  if (!booking) {
    throw new Error("No booking found for this event.");
  }

  // 3. Duplicate / Idempotency Safety Guard
  if (booking.paymentStatus === "PAID" && event.status === "BOOKED") {
    return { success: true, message: "Payment is already completed." };
  }

  // 4. Fetch invoice — must exist
  const invoice = await db.orm.public.Invoice.where({
    bookingId: booking.id,
  }).first();

  if (!invoice) {
    throw new Error("No tax invoice found for this booking.");
  }

  // 5. Verify cryptographic HMAC-SHA256 signature
  const verification = verifyPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  if (!verification.verified) {
    // Record FAILED status on booking if signature fails
    await db.orm.public.Booking.where({ id: booking.id }).update({
      paymentStatus: "FAILED",
    });

    throw new Error(`Payment Verification Failed: ${verification.reason}`);
  }

  // 6. Atomic state mutation across Booking, Invoice, and Event
  const paidAt = new Date().toISOString();

  await db.transaction(async (tx) => {
    // Update Booking row with verified payment proof
    await tx.orm.public.Booking.where({ id: booking.id }).update({
      paymentStatus: "PAID",
      razorpayPaymentId,
      razorpaySignature,
      paidAt,
    });

    // Update Invoice status to PAID
    await tx.orm.public.Invoice.where({ id: invoice.id }).update({
      status: "PAID",
    });

    // Update Event status to BOOKED
    await tx.orm.public.Event.where({ id: eventId }).update({
      status: "BOOKED",
    });
  });

  // 7. Revalidate affected routes
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/finance");
  revalidatePath(`/dashboard/finance/invoices/${invoice.id}`);

  return { success: true };
}
