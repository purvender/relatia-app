"use client";

import { useState, useTransition } from "react";
import { Check, X, Loader2, AlertCircle } from "lucide-react";
import { approveEventAction, rejectEventAction } from "@/app/dashboard/approvals/actions";

type ApprovalActionButtonsProps = {
  approvalId: number;
};

export function ApprovalActionButtons({ approvalId }: ApprovalActionButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApprove = () => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await approveEventAction(approvalId);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("NEXT_REDIRECT")) return;
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to approve event request.");
        }
      }
    });
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await rejectEventAction(approvalId, reason);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("NEXT_REDIRECT")) return;
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to reject event request.");
        }
      }
    });
  };

  if (showRejectForm) {
    return (
      <form onSubmit={handleReject} className="flex flex-col gap-2 w-full max-w-sm">
        <label htmlFor={`reject-reason-${approvalId}`} className="text-xs font-medium text-slate-700">
          Reason for rejection (optional)
        </label>
        <input
          id={`reject-reason-${approvalId}`}
          type="text"
          placeholder="e.g. Per-person budget exceeds guidelines"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          disabled={isPending}
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            <span>Confirm Reject</span>
          </button>
          <button
            type="button"
            onClick={() => setShowRejectForm(false)}
            disabled={isPending}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
        {errorMessage && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    );
  }

  return (
    <div className="flex flex-col items-start sm:items-end gap-1.5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleApprove}
          disabled={isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          <span>Approve</span>
        </button>

        <button
          type="button"
          onClick={() => setShowRejectForm(true)}
          disabled={isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3.5 py-2 text-xs font-semibold text-rose-700 shadow-2xs transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:opacity-50 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
          <span>Reject</span>
        </button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
