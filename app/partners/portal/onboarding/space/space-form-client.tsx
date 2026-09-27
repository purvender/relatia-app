"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerCreateSpaceAction } from "@/lib/provider/partner-actions";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  providerOrgId: number;
  venues: Array<{ id: number; name: string }>;
};

export function SpaceFormClient({ providerOrgId, venues }: Props) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(partnerCreateSpaceAction, null);

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal/onboarding/offering");
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
          <span>Step 4 of 5</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Add a Bookable Space
        </h1>
        <p className="text-sm text-[#7A756D]">
          Define specific private rooms, semi-private sections, rooftops, or buyouts that corporate buyers can reserve.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold">{state.message}</p>
            <p className="text-xs text-emerald-700">Redirecting to package/offering form...</p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {state && !state.success && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm space-y-1">
          <p className="font-semibold">{state.error}</p>
          {state.fieldErrors && (
            <ul className="text-xs list-disc list-inside space-y-0.5 text-rose-700">
              {Object.entries(state.fieldErrors).map(([key, errs]) => {
                const fieldNames: Record<string, string> = {
                  venueId: "Venue",
                  name: "Space Name",
                  spaceType: "Space Type",
                  privacyLevel: "Privacy Level",
                  minCapacity: "Minimum Capacity",
                  maxCapacity: "Maximum Capacity",
                  seatedCapacity: "Seated Capacity",
                  standingCapacity: "Standing Capacity",
                  publicDescription: "Space Description",
                };
                const fieldLabel = fieldNames[key] || key;
                return (
                  <li key={key}>
                    <span className="font-semibold">{fieldLabel}</span>: {errs?.join(", ")}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Form */}
      <form action={action} className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-5 shadow-sm">
        <input type="hidden" name="providerOrgId" value={providerOrgId} />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Select Venue <span className="text-rose-500">*</span>
          </label>
          <select
            name="venueId"
            required
            defaultValue={venues[0]?.id}
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          >
            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Space Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. The Executive Lotus Room / Grand Terrace"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Space Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="spaceType"
              required
              defaultValue="PRIVATE_DINING"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="PRIVATE_DINING">Private Dining Room (PDR)</option>
              <option value="SEMI_PRIVATE_DINING">Semi-Private Section</option>
              <option value="MAIN_DINING_SECTION">Main Dining Section</option>
              <option value="TERRACE">Terrace / Outdoor Patio</option>
              <option value="ROOFTOP">Rooftop Deck / Lounge</option>
              <option value="BALLROOM">Grand Ballroom / Banquet Suite</option>
              <option value="BOARDROOM">Executive Dining Boardroom</option>
              <option value="LOUNGE">Cocktail Lounge Space</option>
              <option value="CLUB_EVENT_SPACE">Private Club Event Space</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Privacy Level <span className="text-rose-500">*</span>
            </label>
            <select
              name="privacyLevel"
              required
              defaultValue="EXCLUSIVE"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="EXCLUSIVE">Fully Exclusive (Door / Partitioned)</option>
              <option value="SEMI_PRIVATE">Semi-Private (Screened / Curtained)</option>
              <option value="OPEN">Open Atmosphere</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Minimum Capacity (Guests) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="minCapacity"
              required
              min="1"
              placeholder="e.g. 10"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Maximum Capacity (Guests) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="maxCapacity"
              required
              min="1"
              placeholder="e.g. 30"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Seated Dinner Capacity
            </label>
            <input
              type="number"
              name="seatedCapacity"
              min="0"
              placeholder="e.g. 24"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Standing Cocktail Capacity
            </label>
            <input
              type="number"
              name="standingCapacity"
              min="0"
              placeholder="e.g. 35"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Space Description &amp; Highlights
          </label>
          <textarea
            name="publicDescription"
            rows={3}
            placeholder="Describe room layout, natural light, dedicated service team, AV equipment, or private entrance..."
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
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
            disabled={isPending || state?.success}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-[#F5F2EC] hover:bg-[#2C2825] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Saving..." : "Save & Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
