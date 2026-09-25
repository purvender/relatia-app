import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import {
  verifyWebhookSignature,
  isWebhookEventProcessed,
  recordWebhookEvent,
} from "@/lib/payments/verify-webhook";

/**
 * Razorpay Webhook Endpoint: POST /api/webhooks/razorpay
 *
 * Handles asynchronous payment updates from Razorpay's servers (payment.captured, order.paid, payment.failed).
 *
 * Safety & Reliability Guarantees:
 *   - Verifies X-Razorpay-Signature header against the exact RAW body using RAZORPAY_WEBHOOK_SECRET.
 *   - Idempotency: Checks x-razorpay-event-id in WebhookEventLog before processing to avoid duplicate execution on retries.
 *   - Atomic Transactions: Updates Booking, Invoice, and Event state in a single db.transaction.
 *   - Does NOT trust client-side data — queries target records via razorpayOrderId stored on Booking.
 */
export async function POST(req: Request) {
  try {
    // 1. Read signature & event ID headers
    const signature = req.headers.get("x-razorpay-signature");
    const eventIdHeader = req.headers.get("x-razorpay-event-id");

    // 2. Read RAW text body (mandatory for HMAC-SHA256 signature verification)
    const rawBody = await req.text();

    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      return new Response(
        JSON.stringify({ error: "Invalid webhook signature" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 3. Idempotency Check: deduplicate using Razorpay x-razorpay-event-id header
    if (eventIdHeader && (await isWebhookEventProcessed(eventIdHeader))) {
      return new Response(
        JSON.stringify({
          status: "ok",
          message: "Event already processed (idempotent no-op)",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Parse JSON payload safely after signature verification
    const payload = JSON.parse(rawBody);
    const eventType: string = payload.event ?? "unknown";
    const eventId: string = eventIdHeader || payload.event_id || payload.id || "";

    // 5. Route handling by Razorpay Event Type
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;

      const orderId: string | undefined = paymentEntity?.order_id || orderEntity?.id;
      const paymentId: string | undefined = paymentEntity?.id;

      if (orderId) {
        const booking = await db.orm.public.Booking.where({
          razorpayOrderId: orderId,
        }).first();

        if (booking) {
          // If already marked PAID and event is BOOKED, handle idempotently
          if (booking.paymentStatus === "PAID") {
            if (eventId) await recordWebhookEvent(eventId, eventType);
            return new Response(
              JSON.stringify({ status: "ok", message: "Booking already paid" }),
              { status: 200, headers: { "Content-Type": "application/json" } },
            );
          }

          const invoice = await db.orm.public.Invoice.where({
            bookingId: booking.id,
          }).first();

          const paidAt = new Date().toISOString();

          // Atomic State Mutation across Booking, Invoice, and Event
          await db.transaction(async (tx) => {
            await tx.orm.public.Booking.where({ id: booking.id }).update({
              paymentStatus: "PAID",
              razorpayPaymentId: paymentId ?? booking.razorpayPaymentId,
              paidAt,
            });

            if (invoice) {
              await tx.orm.public.Invoice.where({ id: invoice.id }).update({
                status: "PAID",
              });
            }

            await tx.orm.public.Event.where({ id: booking.eventId }).update({
              status: "BOOKED",
            });

            if (eventId) {
              await tx.orm.public.WebhookEventLog.create({
                eventId,
                eventType,
              });
            }
          });

          // Revalidate affected Next.js routes
          revalidatePath(`/events/${booking.eventId}`);
          revalidatePath("/events");
          revalidatePath("/dashboard");
          revalidatePath("/dashboard/finance");
          if (invoice) {
            revalidatePath(`/dashboard/finance/invoices/${invoice.id}`);
          }
        }
      }
    } else if (eventType === "payment.failed") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId: string | undefined = paymentEntity?.order_id;

      if (orderId) {
        const booking = await db.orm.public.Booking.where({
          razorpayOrderId: orderId,
        }).first();

        if (booking && booking.paymentStatus !== "PAID") {
          await db.orm.public.Booking.where({ id: booking.id }).update({
            paymentStatus: "FAILED",
          });
        }
      }

      if (eventId) {
        await recordWebhookEvent(eventId, eventType);
      }
    } else {
      // Record unhandled event types idempotently to avoid repeated webhook deliveries
      if (eventId) {
        await recordWebhookEvent(eventId, eventType);
      }
    }

    return new Response(
      JSON.stringify({ status: "ok", processed: true, event: eventType }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", detail: msg }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
