import { MapPin, Star, Tag, ShieldCheck } from "lucide-react";
import type { VenueItem } from "@/lib/venues/get-venues";


type VenueDetailsCardProps = {
  venue: VenueItem;
};

type MetaRowProps = {
  label: string;
  value: React.ReactNode;
};

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-0">
      <dt className="w-full sm:w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="text-sm text-slate-800">{value}</dd>
    </div>
  );
}

function getPriceBandStyle(priceBand: string) {
  switch (priceBand.toUpperCase()) {
    case "LUXURY":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "PREMIUM":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "MODERATE":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  const priceBandBadge = getPriceBandStyle(venue.priceBand);
  const spaces = venue.bookableSpaces ?? [];
  const offerings = venue.offerings ?? [];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
              <MapPin className="h-3 w-3 text-slate-500" />
              {venue.city}
              {venue.locality && ` · ${venue.locality}`}
            </span>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priceBandBadge}`}>
              {venue.priceBand}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {venue.name}
          </h2>
          {venue.address && (
            <p className="mt-1 text-sm text-slate-500 max-w-prose">
              {venue.address}
            </p>
          )}
          {venue.publicDescription && (
            <p className="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
              {venue.publicDescription}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800 border border-amber-200">
            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
            <span>{venue.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Bookable Spaces Grid */}
      {spaces.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Bookable Hospitality Spaces
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Executive private dining rooms, terraces, and boardrooms inside this venue
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {spaces.length} Spaces Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spaces.map((space) => (
              <div
                key={space.id}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{space.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {space.spaceType.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Capacity: <span className="font-semibold text-slate-900">{space.minCapacity} – {space.maxCapacity} guests</span>
                  {space.seatedCapacity && ` (${space.seatedCapacity} seated)`}
                </p>
                {space.privacyLevel && (
                  <p className="text-[11px] text-slate-500">
                    Privacy Tier: {space.privacyLevel}
                  </p>
                )}
                {space.publicDescription && (
                  <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                    {space.publicDescription}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Offerings & Packages */}
      {offerings.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Curated Executive Packages & Menus
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured per-person packages and bespoke culinary experiences
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {offerings.length} Packages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offerings.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {pkg.offeringType.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      ₹{(pkg.baseAmount / 100).toLocaleString("en-IN")} {pkg.pricingBasis === "PER_PERSON" ? "/ guest" : "total"}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-slate-900">{pkg.name}</h4>
                  {pkg.minimumSpend > 0 && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Minimum Spend Requirement: ₹{(pkg.minimumSpend / 100).toLocaleString("en-IN")}
                    </p>
                  )}
                  {pkg.dietaryNotes && (
                    <p className="text-xs text-emerald-700 font-medium mt-1">
                      {pkg.dietaryNotes}
                    </p>
                  )}
                  {pkg.description && (
                    <p className="text-xs text-slate-500 mt-1.5 leading-normal">
                      {pkg.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specifications Grid */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          Venue Specifications
        </h3>
        <dl className="space-y-4">
          <MetaRow label="City & Area" value={`${venue.city}${venue.locality ? ` · ${venue.locality}` : ""}`} />
          <MetaRow
            label="Address"
            value={venue.address ?? "Address on request"}
          />
          <MetaRow
            label="Overall Venue Capacity"
            value={
              <span className="font-semibold text-slate-900">
                Up to {venue.capacity.toLocaleString("en-IN")} guests
              </span>
            }
          />
          <MetaRow
            label="Cuisine Offered"
            value={venue.cuisine}
          />
          <MetaRow
            label="Price Tier"
            value={
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priceBandBadge}`}>
                {venue.priceBand}
              </span>
            }
          />
        </dl>
      </div>

      {/* Governance & Availability Terms */}
      {(venue.availability || venue.cancellation) && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            Reservation & Cancellation Governance
          </h3>
          <dl className="space-y-4">
            {venue.availability && (
              <MetaRow
                label="Confirmation Protocol"
                value={
                  <span className="text-xs font-medium text-slate-700">
                    {venue.availability.requiresManualConfirmation
                      ? "Manual Host Confirmation Required (Guaranteed corporate seating reserved upon concierge dispatch)"
                      : "Direct Real-Time Allocation"}
                  </span>
                }
              />
            )}
            {venue.cancellation && (
              <MetaRow
                label="Cancellation Policy"
                value={
                  <span className="text-xs font-medium text-slate-700">
                    {venue.cancellation.summary} ({venue.cancellation.cutoffHours}h cutoff)
                  </span>
                }
              />
            )}
          </dl>
        </div>
      )}

      {/* Tags & Features */}
      {venue.tags.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            Tags & Highlights
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {venue.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200"
              >
                <Tag className="h-3 w-3 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Record Metadata */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          Partner Record
        </h3>
        <dl className="space-y-4">
          <MetaRow label="Venue ID" value={`#${venue.id}`} />
          <MetaRow
            label="Status"
            value={
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Active Partner Venue
              </span>
            }
          />
        </dl>
      </div>
    </div>
  );
}
