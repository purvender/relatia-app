"use client";

import { useState, useTransition } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { submitEventForApprovalAction } from "@/app/events/actions";

type EventSubmitButtonProps = {
  eventId: number;
};

export function EventSubmitButton({ eventId }: EventSubmitButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await submitEventForApprovalAction(eventId);
      } catch (err) {
        if (err instanceof Error) {
          // Ignore NEXT_REDIRECT errors if any exist
          if (err.message.includes("NEXT_REDIRECT")) return;
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to submit event for approval.");
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-start sm:items-end gap-2">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Submit for Approval</span>
          </>
        )}
      </button>

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
