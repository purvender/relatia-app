"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerCreateVenueAction } from "@/lib/provider/partner-actions";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

type Props = {
  providerOrgId: number;
};

export function VenueFormClient({ providerOrgId }: Props) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(partnerCreateVenueAction, null);

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal/onboarding/space");
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
          <span>Step 3 of 5</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Add Your First Venue
        </h1>
        <p className="text-sm text-[#7A756D]">
          Register the physical restaurant, dining room, lounge, or event property you want to list on Relatia.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold">{state.message}</p>
            <p className="text-xs text-emerald-700">Redirecting to bookable space form...</p>
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
                  <span className="capitalize">{key}</span>: {errs?.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Form */}
      <form action={action} className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-5 shadow-sm">
        <input type="hidden" name="providerOrgId" value={providerOrgId} />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Venue Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Amber Social Dining — Bandra"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Venue Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="venueType"
              required
              defaultValue="RESTAURANT"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="RESTAURANT">Fine Dining Restaurant</option>
              <option value="HOTEL_DINING">Hotel Dining / Ballroom</option>
              <option value="ROOFTOP">Rooftop Lounge &amp; Bar</option>
              <option value="PRIVATE_ROOM">Private Dining Suite</option>
              <option value="LOUNGE">Cocktail Lounge</option>
              <option value="BANQUET">Banquet &amp; Event Hall</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Price Positioning <span className="text-rose-500">*</span>
            </label>
            <select
              name="priceBand"
              required
              defaultValue="PREMIUM"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="LUXURY">Luxury (High-end corporate &amp; VIP)</option>
              <option value="PREMIUM">Premium (Upper mid-scale &amp; executive)</option>
              <option value="MID_SCALE">Mid-Scale (Accessible team dining)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              required
              placeholder="e.g. Mumbai"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Locality / District
            </label>
            <input
              type="text"
              name="locality"
              placeholder="e.g. Bandra West"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Full Street Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="e.g. Plot 42, Waterfield Road, Bandra West, Mumbai 400050"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Cuisine / Concept <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="cuisine"
              required
              placeholder="e.g. Modern Pan-Asian &amp; Craft Cocktails"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Total Overall Capacity (Guests) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="capacity"
              required
              min="1"
              placeholder="e.g. 120"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Key Features / Amenities (Comma Separated)
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g. Private Dining, Valet Parking, Outdoor Terrace, AV Equipment, Cocktail Bar"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Public Venue Description
          </label>
          <textarea
            name="publicDescription"
            rows={3}
            placeholder="Describe what makes your venue exceptional for corporate executive dinners, team celebrations, and client entertaining..."
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] p-4 flex items-start gap-3 text-xs text-[#7A756D]">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#C4A47C] mt-0.5" />
          <p>
            Venues remain in <strong>Draft / Internal</strong> mode after creation. They will not be visible on the public Relatia platform until verified by the Relatia Partner Ops team and published.
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
