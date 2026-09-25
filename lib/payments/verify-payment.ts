import "server-only";

import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay";

export type VerifyPaymentInput = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export type VerifyPaymentResult =
  | { verified: true }
  | { verified: false; reason: string };

/**
 * Validates the HMAC-SHA256 signature produced by Razorpay Checkout.
 *
 * Checks:
 *   - Ensures all 3 required Razorpay parameters are non-empty strings.
 *   - Computes expected HMAC-SHA256(order_id + "|" + payment_id, secret)
 *   - Performs constant-time comparison against razorpaySignature.
 *
 * Note: Database updates (marking paymentStatus = PAID, Invoice = PAID, Event = BOOKED)
 * will be wired in Step 4 server action and Step 5 webhook route handler.
 */
export function verifyPayment(input: VerifyPaymentInput): VerifyPaymentResult {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = input;

  if (!razorpayOrderId || !razorpayOrderId.trim()) {
    return { verified: false, reason: "Missing razorpayOrderId." };
  }

  if (!razorpayPaymentId || !razorpayPaymentId.trim()) {
    return { verified: false, reason: "Missing razorpayPaymentId." };
  }

  if (!razorpaySignature || !razorpaySignature.trim()) {
    return { verified: false, reason: "Missing razorpaySignature." };
  }

  const isValid = verifyRazorpayPaymentSignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  if (!isValid) {
    return {
      verified: false,
      reason: "Cryptographic signature verification failed.",
    };
  }

  return { verified: true };
}
