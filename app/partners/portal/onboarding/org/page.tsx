"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerCreateProviderOrgAction } from "@/lib/provider/partner-actions";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function PartnerOrgOnboardingPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(
    partnerCreateProviderOrgAction,
    null,
  );

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal/onboarding/contact");
    }, 1200);
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#A9A49C] font-mono uppercase tracking-wider">
          <Link href="/partners/portal" className="hover:underline">
            Partner Portal
          </Link>
          <span>/</span>
          <span>Step 1 of 5</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Create Your Provider Organisation
        </h1>
        <p className="text-sm text-[#7A756D]">
          Tell us about your parent company, hospitality group, or individual
          venue business entity.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold">{state.message}</p>
            <p className="text-xs text-emerald-700">
              Redirecting to primary contact form...
            </p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {state && !state.success && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm space-y-1">
          <p className="font-semibold">{state.error}</p>
          {state.fieldErrors && (
            <ul className="text-xs list-disc list-inside space-y-0.5 text-rose-700">
              {Object.entries(state.fieldErrors).map(([key, errs]) => (
                <li key={key}>
                  <span className="capitalize">{key}</span>:{" "}
                  {errs?.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Form */}
      <form
        action={action}
        className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-5 shadow-sm"
      >
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Organisation Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Amber Hospitality Group"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
          <p className="text-xs text-[#7A756D]">
            The public or corporate name of your group or standalone entity.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Legal Entity Name
          </label>
          <input
            type="text"
            name="legalName"
            placeholder="e.g. Amber Hospitality Private Limited"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
          <p className="text-xs text-[#7A756D]">
            Optional. Official registered company name for invoicing and
            agreements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Business Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="providerType"
              required
              defaultValue="RESTAURANT_GROUP"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="RESTAURANT_GROUP">Restaurant Group</option>
              <option value="HOTEL">Hotel / Resort</option>
              <option value="EVENT_SPACE">Event Venue / Banquet</option>
              <option value="CATERING">Catering &amp; Culinary</option>
              <option value="LOUNGE">Lounge / Rooftop / Club</option>
              <option value="INDEPENDENT_VENUE">Independent Restaurant</option>
              <option value="OTHER">Other Partner Entity</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Primary City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              required
              placeholder="e.g. Mumbai"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] p-4 flex items-start gap-3 text-xs text-[#7A756D]">
          <Shield className="h-4 w-4 shrink-0 text-[#C4A47C] mt-0.5" />
          <p>
            Your organisation details remain private to your account and Relatia
            review ops until approved. Relatia does not share partner account
            details with external buyers without consent.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/partners/portal"
            className="text-xs font-semibold text-[#7A756D] hover:text-[#1A1714]"
          >
            Back to Overview
          </Link>
          <button
            type="submit"
            disabled={isPending || !!state?.success}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-[#F5F2EC] hover:bg-[#2C2825] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Creating..." : "Save & Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
