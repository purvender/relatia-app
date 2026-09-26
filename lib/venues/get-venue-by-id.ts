import "server-only";

import { db } from "@/prisma/db";
import type { VenueItem } from "@/lib/venues/get-venues";
import { getPublicSafeVenueDetail } from "@/lib/provider/service";

/**
 * Fetches a single active venue by ID, validating company scoping (or public discoverability) and active status.
 * Returns null if the venue does not exist or is inactive.
 */
export async function getVenueById(
  venueId: number,
  companyId: number,
): Promise<VenueItem | null> {
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();

  if (!venue || !venue.active) {
    return null;
  }

  // Tenant access rule: venue must either belong to the company OR be discoverable with DISCOVERABLE visibility
  if (venue.companyId !== companyId) {
    if (!venue.isDiscoverable || venue.visibility !== "DISCOVERABLE") {
      return null;
    }
  }

  // Load public-safe detail hierarchy
  const safeDetail = await getPublicSafeVenueDetail(venue.id);

  return {
    id: venue.id,
    companyId: venue.companyId ?? null,
    name: venue.name,
    city: venue.city,
    locality: venue.locality ?? null,
    address: venue.address ?? null,
    capacity: venue.capacity,
    cuisine: venue.cuisine,
    priceBand: venue.priceBand,
    tags: [...venue.tags],
    rating: venue.rating,
    active: venue.active,
    publicDescription: venue.publicDescription ?? null,
    bookableSpaces: safeDetail?.bookableSpaces ?? [],
    offerings: safeDetail?.offerings ?? [],
    availability: safeDetail?.availability ?? null,
    cancellation: safeDetail?.cancellation ?? null,
  };
}
