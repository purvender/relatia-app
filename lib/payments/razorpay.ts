import "server-only";

import crypto from "crypto";
import Razorpay from "razorpay";

/**
 * Server-only Razorpay client wrapper.
 *
 * Environment variables required:
 *   - NEXT_PUBLIC_RAZORPAY_KEY_ID: Public Key ID (rzp_test_... or rzp_live_...)
 *   - RAZORPAY_KEY_SECRET: Secret key (never exposed to client)
 *   - RAZORPAY_WEBHOOK_SECRET: Webhook secret for verifying Razorpay events
 */

const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder_key";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret_key";

/**
 * Shared Razorpay Node.js SDK instance for server-side API calls.
 */
export const razorpayClient = new Razorpay({
  key_id,
  key_secret,
});

export type VerifySignatureInput = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

/**
 * Verifies the HMAC-SHA256 signature produced by Razorpay Checkout JS modal.
 *
 * Algorithm:
 *   expected_signature = HMAC-SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET)
 *   returns true if expected_signature matches razorpaySignature
 */
export function verifyRazorpayPaymentSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: VerifySignatureInput): boolean {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(razorpaySignature),
  );
}

/**
 * Verifies the signature header of an incoming Razorpay Webhook request.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  webhookSignature: string,
): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "placeholder_webhook_secret";

  if (!rawBody || !webhookSignature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(webhookSignature),
  );
}
