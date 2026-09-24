import { Building2, SearchX } from "lucide-react";
import { VenueCard } from "@/components/venues/venue-card";
import type { VenueItem } from "@/lib/venues/get-venues";

type VenuesListProps = {
  venues: VenueItem[];
  hasActiveFilters?: boolean;
};

export function VenuesList({ venues, hasActiveFilters }: VenuesListProps) {
  if (venues.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-2xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {hasActiveFilters ? (
            <SearchX className="h-6 w-6 text-slate-400" />
          ) : (
            <Building2 className="h-6 w-6 text-slate-400" />
          )}
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          {hasActiveFilters ? "No Matching Venues" : "No Venues Available"}
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          {hasActiveFilters
            ? "No active venues match your selected filters. Try adjusting city, price band, or capacity."
            : "No active corporate venues are currently configured for your company."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Available Venues ({venues.length})
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
