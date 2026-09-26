import "server-only";

import { db } from "@/prisma/db";

import type {
  PublicSafeBookableSpace,
  PublicSafeOffering,
  PublicSafeAvailabilitySummary,
  PublicSafeCancellationSummary,
} from "@/lib/provider/types";

export type VenueItem = {
  id: number;
  companyId: number | null;
  name: string;
  city: string;
  locality?: string | null;
  address: string | null;
  capacity: number;
  cuisine: string;
  priceBand: string;
  tags: string[];
  rating: number;
  active: boolean;
  publicDescription?: string | null;
  bookableSpaces?: PublicSafeBookableSpace[];
  offerings?: PublicSafeOffering[];
  availability?: PublicSafeAvailabilitySummary | null;
  cancellation?: PublicSafeCancellationSummary | null;
};


export type VenueFilterOptions = {
  city?: string;
  priceBand?: string;
  minCapacity?: number;
};

/**
 * Fetches active venues scoped strictly to the given company ID, with optional filters.
 * Filters supported:
 * - city: string (exact case-insensitive match)
 * - priceBand: string (MODERATE, PREMIUM, LUXURY)
 * - minCapacity: number (venue capacity >= minCapacity)
 */
export async function getVenues(
  companyId: number,
  filters?: VenueFilterOptions,
): Promise<VenueItem[]> {
  const rawVenues = await db.orm.public.Venue.where({ companyId })
    .where({ active: true })
    .all();

  let filtered = rawVenues.map((v) => ({
    id: v.id,
    companyId: v.companyId,
    name: v.name,
    city: v.city,
    address: v.address ?? null,
    capacity: v.capacity,
    cuisine: v.cuisine,
    priceBand: v.priceBand,
    tags: [...v.tags],
    rating: v.rating,
    active: v.active,
  }));

  if (filters?.city && filters.city.trim() !== "") {
    const targetCity = filters.city.trim().toLowerCase();
    filtered = filtered.filter(
      (v) => v.city.toLowerCase() === targetCity,
    );
  }

  if (filters?.priceBand && filters.priceBand.trim() !== "") {
    const targetBand = filters.priceBand.trim().toUpperCase();
    filtered = filtered.filter(
      (v) => v.priceBand.toUpperCase() === targetBand,
    );
  }

  if (filters?.minCapacity && filters.minCapacity > 0) {
    const minCap = filters.minCapacity;
    filtered = filtered.filter((v) => v.capacity >= minCap);
  }

  // Sort venues by rating descending, then name ascending
  filtered.sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return a.name.localeCompare(b.name);
  });

  return filtered;
}
