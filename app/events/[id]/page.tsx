import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { requireAppUser } from "@/lib/auth";
import { getEventById } from "@/lib/events/get-event-by-id";
import { getBookingByEvent } from "@/lib/bookings/get-booking-by-event";
import { EventDetailsCard } from "@/components/events/event-details-card";
import { EventSubmitButton } from "@/components/events/event-submit-button";
import { RequestBookingButton } from "@/components/events/request-booking-button";
import { RazorpayPayButton } from "@/components/finance/razorpay-pay-button";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate the segment is a valid integer before hitting the DB.
  const eventId = Number(id);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    notFound();
  }

  const user = await requireAppUser();

  // Fetch the event — returns null if not found or out of company scope.
  const event = await getEventById(eventId, user.companyId);

  if (!event) {
    notFound();
  }

  // Fetch optional booking if venue has been selected for this event
  const booking = await getBookingByEvent(eventId, user.companyId);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Events
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Operations
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Event Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.company.name} · Event #{event.id}
          </p>
        </div>

        {/* Submit action shown only when event is in DRAFT status */}
        {event.status === "DRAFT" && (
          <EventSubmitButton eventId={event.id} />
        )}
      </div>

      {/* Booking request CTA — shown when venue selected and user can act */}
      {event.status === "VENUE_SELECTED" &&
        booking &&
        (user.role === "REQUESTER" || user.role === "ADMIN") && (
          <RequestBookingButton eventId={event.id} />
        )}

      {/* Payment CTA — shown when booking requested, payment pending, and user is FINANCE or ADMIN */}
      {event.status === "BOOKING_REQUESTED" &&
        booking &&
        booking.paymentStatus !== "PAID" &&
        (user.role === "FINANCE" || user.role === "ADMIN") && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-purple-200 bg-purple-50/50 p-5 shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-purple-700 shrink-0" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-800">
                  Payment &amp; Final Confirmation Pending
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                Complete online payment settlement via Razorpay to lock the venue and confirm this event.
              </p>
            </div>
            <div className="shrink-0">
              <RazorpayPayButton
                eventId={event.id}
                amountPaise={booking.amount + booking.taxAmount}
              />
            </div>
          </div>
        )}

      {/* Main detail card */}
      <EventDetailsCard
        event={event}
        booking={booking}
        currentUserId={user.id}
        currentUserRole={user.role}
      />
    </div>
  );
}
