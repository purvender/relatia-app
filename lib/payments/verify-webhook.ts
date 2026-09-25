import "server-only";

import { db } from "@/prisma/db";
import { verifyRazorpayWebhookSignature } from "@/lib/payments/razorpay";

/**
 * Validates the raw request body against the X-Razorpay-Signature header
 * using RAZORPAY_WEBHOOK_SECRET.
 *
 * CRITICAL: The signature MUST be verified against the exact raw text body,
 * NOT a parsed JSON object.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
): boolean {
  return verifyRazorpayWebhookSignature(rawBody, signature);
}

/**
 * Checks if a Razorpay webhook event ID has already been processed.
 * Used for strict idempotency deduplication.
 */
export async function isWebhookEventProcessed(
  eventId: string,
): Promise<boolean> {
  if (!eventId) return false;
  const existing = await db.orm.public.WebhookEventLog.where({
    eventId,
  }).first();
  return Boolean(existing);
}

/**
 * Records a processed webhook event ID in the database to prevent duplicate execution.
 */
export async function recordWebhookEvent(
  eventId: string,
  eventType: string,
): Promise<void> {
  if (!eventId) return;

  try {
    await db.orm.public.WebhookEventLog.create({
      eventId,
      eventType,
    });
  } catch (err: unknown) {
    // If already exists (race condition), ignore duplicate insert error
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("unique") && !msg.includes("duplicate")) {
      throw err;
    }
  }
}
