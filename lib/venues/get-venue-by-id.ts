import "server-only";

import { db } from "@/prisma/db";
import type { VenueItem } from "@/lib/venues/get-venues";

/**
 * Fetches a single active venue by ID, validating company scoping and active status.
 * Returns null if the venue does not exist, belongs to another company, or is inactive.
 */
export async function getVenueById(
  venueId: number,
  companyId: number,
): Promise<VenueItem | null> {
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();

  if (!venue || venue.companyId !== companyId || !venue.active) {
    return null;
  }

  return {
    id: venue.id,
    companyId: venue.companyId,
    name: venue.name,
    city: venue.city,
    address: venue.address ?? null,
    capacity: venue.capacity,
    cuisine: venue.cuisine,
    priceBand: venue.priceBand,
    tags: [...venue.tags],
    rating: venue.rating,
    active: venue.active,
  };
}
