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

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
              <MapPin className="h-3 w-3 text-slate-500" />
              {venue.city}
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
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800 border border-amber-200">
            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
            <span>{venue.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xs">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
          Venue Specifications
        </h3>
        <dl className="space-y-4">
          <MetaRow label="City" value={venue.city} />
          <MetaRow
            label="Address"
            value={venue.address ?? "Address on request"}
          />
          <MetaRow
            label="Seating Capacity"
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
