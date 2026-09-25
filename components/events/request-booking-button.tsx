"use client";

import { useState, useTransition } from "react";
import { SendHorizonal, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { requestBookingAction } from "@/app/events/actions";

type RequestBookingButtonProps = {
  eventId: number;
};

/**
 * Renders the "Send to Finance" CTA for events in VENUE_SELECTED status.
 *
 * Shown when:
 *   - event.status === "VENUE_SELECTED"
 *   - A booking exists
 *   - User role is REQUESTER or ADMIN (enforced server-side; button is
 *     rendered by the page only when eligible)
 *
 * On success, the server action redirects to the event detail page,
 * which will now show BOOKING_REQUESTED status.
 */
export function RequestBookingButton({ eventId }: RequestBookingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRequest = () => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await requestBookingAction(eventId);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message.includes("NEXT_REDIRECT")) return;
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to submit booking request.");
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-purple-200 bg-purple-50/40 p-5 shadow-2xs">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-700">
              Ready to Request Booking
            </h3>
          </div>
          <p className="text-sm text-slate-600 max-w-prose">
            Submit this venue selection to Finance for GST invoice preparation and booking
            confirmation.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={handleRequest}
            disabled={isPending}
            id="request-booking-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <SendHorizonal className="h-4 w-4" />
                <span>Send to Finance</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-500">
            Will create GST invoice &amp; mark Booking Requested
          </span>
        </div>
      </div>
    </div>
  );
}
