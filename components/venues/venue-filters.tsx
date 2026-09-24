"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";

type VenueFiltersProps = {
  allowedCities?: readonly string[] | string[];
};

const CITIES = ["Bengaluru", "Mumbai", "Gurugram", "New Delhi", "Pune"];
const PRICE_BANDS = ["MODERATE", "PREMIUM", "LUXURY"];
const CAPACITY_OPTIONS = [
  { label: "Any capacity", value: "" },
  { label: "100+ guests", value: "100" },
  { label: "150+ guests", value: "150" },
  { label: "200+ guests", value: "200" },
  { label: "250+ guests", value: "250" },
];

export function VenueFilters({ allowedCities }: VenueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get("city") ?? "";
  const currentPriceBand = searchParams.get("priceBand") ?? "";
  const currentMinCapacity = searchParams.get("minCapacity") ?? "";

  const citiesList = allowedCities && allowedCities.length > 0 ? allowedCities : CITIES;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(currentCity || currentPriceBand || currentMinCapacity);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter Venues</span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* City Filter */}
        <div>
          <label htmlFor="filter-city" className="block text-xs font-medium text-slate-600 mb-1">
            City
          </label>
          <select
            id="filter-city"
            value={currentCity}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">All Cities</option>
            {citiesList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Price Band Filter */}
        <div>
          <label htmlFor="filter-price" className="block text-xs font-medium text-slate-600 mb-1">
            Price Band
          </label>
          <select
            id="filter-price"
            value={currentPriceBand}
            onChange={(e) => updateFilter("priceBand", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            <option value="">All Price Bands</option>
            {PRICE_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Capacity Filter */}
        <div>
          <label htmlFor="filter-capacity" className="block text-xs font-medium text-slate-600 mb-1">
            Minimum Capacity
          </label>
          <select
            id="filter-capacity"
            value={currentMinCapacity}
            onChange={(e) => updateFilter("minCapacity", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            {CAPACITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
