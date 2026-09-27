"use client";

import { useActionState, useState } from "react";
import {
  partnerAcceptBookingRequestAction,
  partnerRejectBookingRequestAction,
  type ActionResult,
} from "@/lib/provider/partner-actions";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Send } from "lucide-react";

type Props = {
  requestId: number;
  eventTitle: string;
};

export function PartnerRequestActionClient({ requestId, eventTitle }: Props) {
  const [activeMode, setActiveMode] = useState<"ACCEPT" | "REJECT">("ACCEPT");

  const [acceptState, acceptAction, isAcceptPending] = useActionState<
    ActionResult<{ requestId: number }>,
    FormData
  >(partnerAcceptBookingRequestAction, { success: false, error: "" });

  const [rejectState, rejectAction, isRejectPending] = useActionState<
    ActionResult<{ requestId: number }>,
    FormData
  >(partnerRejectBookingRequestAction, { success: false, error: "" });

  const isPending = isAcceptPending || isRejectPending;
  const isAccepted = acceptState.success;
  const isRejected = rejectState.success;

  if (isAccepted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-emerald-900 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <h3 className="text-base font-semibold">Booking Request Accepted</h3>
        </div>
        <p className="text-sm text-emerald-800">
          You have successfully accepted the booking request for &ldquo;{eventTitle}&rdquo;. The corporate client has been notified and can proceed with event confirmation.
        </p>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-rose-900 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <h3 className="text-base font-semibold">Booking Request Declined</h3>
        </div>
        <p className="text-sm text-rose-800">
          This booking request has been declined. The client has been informed of your decision.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 shadow-2xs space-y-6">
      <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4">
        <div>
          <h3 className="text-base font-semibold text-[#1A1714]">
            Respond to Booking Request
          </h3>
          <p className="text-xs text-[#7A756D] mt-0.5">
            Select your decision below. Once submitted, your response is recorded.
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center bg-[#F5F2EC] p-1 rounded-xl border border-[#E8E3DA]">
          <button
            type="button"
            onClick={() => setActiveMode("ACCEPT")}
            disabled={isPending}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMode === "ACCEPT"
                ? "bg-white text-emerald-800 shadow-2xs"
                : "text-[#7A756D] hover:text-[#1A1714]"
            }`}
          >
            Accept Request
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("REJECT")}
            disabled={isPending}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMode === "REJECT"
                ? "bg-white text-rose-800 shadow-2xs"
                : "text-[#7A756D] hover:text-[#1A1714]"
            }`}
          >
            Decline Request
          </button>
        </div>
      </div>

      {activeMode === "ACCEPT" ? (
        <form action={acceptAction} className="space-y-4">
          <input type="hidden" name="requestId" value={requestId} />

          {acceptState.error && !acceptState.success && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{acceptState.error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="providerResponseNote"
              className="block text-xs font-semibold uppercase tracking-wider text-[#7A756D]"
            >
              Response Note / Operational Confirmation{" "}
              <span className="text-[#A9A49C] lowercase font-normal">(optional)</span>
            </label>
            <textarea
              id="providerResponseNote"
              name="providerResponseNote"
              rows={3}
              placeholder="e.g. Private dining room held for your party. Our events team will prepare the AV setup as requested."
              disabled={isPending}
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFCFA] px-3.5 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#1A1714] focus:outline-none focus:ring-1 focus:ring-[#1A1714] transition"
            />
            <p className="text-[11px] text-[#A9A49C]">
              This note will be visible to the enterprise organizer on their event portal.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-emerald-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 cursor-pointer"
            >
              {isAcceptPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Accept Booking Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <form action={rejectAction} className="space-y-4">
          <input type="hidden" name="requestId" value={requestId} />

          {rejectState.error && !rejectState.success && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{rejectState.error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="rejectionReason"
              className="block text-xs font-semibold uppercase tracking-wider text-[#7A756D]"
            >
              Reason for Declining <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="rejectionReason"
              name="rejectionReason"
              rows={3}
              required
              placeholder="e.g. Fully committed on this date and time. Alternative slots available the following evening."
              disabled={isPending}
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFCFA] px-3.5 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition"
            />
            <p className="text-[11px] text-[#A9A49C]">
              Please provide a polite, clear explanation for why this booking cannot be accommodated.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-rose-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50 cursor-pointer"
            >
              {isRejectPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Decline Booking Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
