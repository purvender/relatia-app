"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { confirmProviderBookingRequestAction } from "@/app/events/actions";

type ConfirmProviderRequestButtonProps = {
  requestId: number;
  eventId: number;
  venueName: string;
};

export function ConfirmProviderRequestButton({
  requestId,
  eventId,
  venueName,
}: ConfirmProviderRequestButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsPending(true);
    setError(null);

    try {
      const result = await confirmProviderBookingRequestAction(requestId);
      if (!result.success) {
        throw new Error("Failed to confirm booking request.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to confirm commercial booking. Please try again.";
      setError(msg);
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 sm:items-end">
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md max-w-sm">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={isPending}
        id={`confirm-booking-btn-${requestId}`}
        data-event-id={eventId}
        aria-label={`Confirm booking for ${venueName}`}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Confirming &amp; Generating Invoice...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Confirm &amp; Generate Invoice</span>
          </>
        )}
      </button>
    </div>
  );
}
