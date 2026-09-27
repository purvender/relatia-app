"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerCreateOfferingAction } from "@/lib/provider/partner-actions";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  providerOrgId: number;
  venues: Array<{ id: number; name: string }>;
  spaces: Array<{ id: number; venueId: number; name: string }>;
};

export function OfferingFormClient({ providerOrgId, venues, spaces }: Props) {
  const router = useRouter();
  const [selectedVenueId, setSelectedVenueId] = useState<number>(venues[0]?.id || 0);
  const [state, action, isPending] = useActionState(partnerCreateOfferingAction, null);

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal/onboarding/submit");
    }, 1200);
  }

  const filteredSpaces = spaces.filter((s) => s.venueId === selectedVenueId);

  return (
    <div className="mx-auto max-w-xl px-5 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#A9A49C] font-mono uppercase tracking-wider">
          <Link href="/partners/portal" className="hover:underline">
            Partner Portal
          </Link>
          <span>/</span>
          <span>Step 5 of 5</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Add a Corporate Package or Menu
        </h1>
        <p className="text-sm text-[#7A756D]">
          Specify set menus, dining experiences, beverage packages, or minimum spend terms for corporate bookings.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold">{state.message}</p>
            <p className="text-xs text-emerald-700">Redirecting to profile review and submission...</p>
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
                  bookableSpaceId: "Specific Space",
                  name: "Package / Offering Title",
                  offeringType: "Package Type",
                  pricingBasis: "Pricing Model",
                  baseAmountPaise: "Base Price",
                  baseAmountRupees: "Base Price",
                  minimumSpendPaise: "Minimum Spend",
                  minimumSpendRupees: "Minimum Spend",
                  minGuests: "Minimum Guests",
                  maxGuests: "Maximum Guests",
                  description: "Package Description",
                  dietaryNotes: "Dietary Specifications",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Associated Venue <span className="text-rose-500">*</span>
            </label>
            <select
              name="venueId"
              required
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(Number(e.target.value))}
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
              Specific Space (Optional)
            </label>
            <select
              name="bookableSpaceId"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="">All Spaces / Whole Venue</option>
              {filteredSpaces.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Package / Offering Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Executive 4-Course Tasting Menu"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Package Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="offeringType"
              required
              defaultValue="SET_MENU"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="SET_MENU">Plated Set Menu</option>
              <option value="PER_PERSON_PACKAGE">Per-Person Banquet Package</option>
              <option value="FIXED_EVENT_PACKAGE">Fixed Event Package / Full Buyout</option>
              <option value="CUSTOM_EXPERIENCE">Chef Tasting &amp; Wine Experience</option>
              <option value="A_LA_CARTE_MIN_SPEND">A La Carte (Minimum Spend Commitment)</option>
              <option value="BEVERAGE_PACKAGE">Beverage &amp; Sommelier Package</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Pricing Model <span className="text-rose-500">*</span>
            </label>
            <select
              name="pricingBasis"
              required
              defaultValue="PER_PERSON"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="PER_PERSON">Per Person Price (₹)</option>
              <option value="FIXED_TOTAL">Fixed Total Package Fee (₹)</option>
              <option value="MINIMUM_SPEND_ONLY">Minimum Spend Commitment (₹)</option>
              <option value="CUSTOM_QUOTE">Custom Quote on Request</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Base Price (₹)
            </label>
            <input
              type="number"
              name="baseAmountRupees"
              min="0"
              placeholder="e.g. 3500"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Minimum F&amp;B Spend (₹)
            </label>
            <input
              type="number"
              name="minimumSpendRupees"
              min="0"
              placeholder="e.g. 50000"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Min Guests Required
            </label>
            <input
              type="number"
              name="minGuests"
              min="1"
              placeholder="e.g. 8"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Max Guests Supported
            </label>
            <input
              type="number"
              name="maxGuests"
              min="1"
              placeholder="e.g. 30"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Menu / Package Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Outline courses, signature dishes, wine pairings, or event duration inclusions..."
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Dietary Adaptations
            </label>
            <input
              type="text"
              name="dietaryNotes"
              placeholder="e.g. Vegetarian, Jain, Vegan &amp; Gluten-free options available"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Taxes &amp; Service Charge Note
            </label>
            <input
              type="text"
              name="pricingNotes"
              placeholder="e.g. Plus 18% GST and 10% service charge"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
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
