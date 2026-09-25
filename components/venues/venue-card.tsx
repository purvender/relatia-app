import Link from "next/link";
import { MapPin, Users, Utensils, Star, Tag, ArrowRight } from "lucide-react";
import type { VenueItem } from "@/lib/venues/get-venues";

type VenueCardProps = {
  venue: VenueItem;
  eventId?: number;
};

function getPriceBandBadgeConfig(priceBand: string) {
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

export function VenueCard({ venue, eventId }: VenueCardProps) {
  const priceBandStyle = getPriceBandBadgeConfig(venue.priceBand);
  const detailUrl = eventId ? `/venues/${venue.id}?eventId=${eventId}` : `/venues/${venue.id}`;

  return (
    <Link
      href={detailUrl}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-slate-300 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      <div className="space-y-3">
        {/* Top Header: Name & Rating */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors flex items-center gap-1.5">
              <span>{venue.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-slate-600 shrink-0" />
            </h3>
            {venue.address && (
              <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                {venue.address}
              </p>
            )}
          </div>
          <div className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>{venue.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Badges: City & PriceBand */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
            <MapPin className="h-3 w-3 text-slate-500" />
            {venue.city}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priceBandStyle}`}
          >
            {venue.priceBand}
          </span>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50/70 p-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 min-w-0">
            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Up to {venue.capacity.toLocaleString("en-IN")} guests</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Utensils className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{venue.cuisine}</span>
          </div>
        </div>

        {/* Tags */}
        {venue.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Tag className="h-3 w-3 text-slate-400 shrink-0" />
            {venue.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[11px] font-medium text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
