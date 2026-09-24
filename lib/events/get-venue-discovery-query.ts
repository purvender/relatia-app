import "server-only";

export type EventVenueDiscoveryInput = {
  city?: string | null;
  attendees?: number | null;
};

/**
 * Builds the URL search parameters string for venue discovery based on event context.
 * e.g., city="Bengaluru", attendees=120 -> "/venues?city=Bengaluru&minCapacity=100"
 */
export function getVenueDiscoveryUrl(input: EventVenueDiscoveryInput): string {
  const params = new URLSearchParams();

  if (input.city && input.city.trim()) {
    params.set("city", input.city.trim());
  }

  if (input.attendees && input.attendees > 0) {
    let capBucket = "100";
    if (input.attendees >= 250) capBucket = "250";
    else if (input.attendees >= 200) capBucket = "200";
    else if (input.attendees >= 150) capBucket = "150";
    else if (input.attendees >= 100) capBucket = "100";
    else capBucket = "100";

    params.set("minCapacity", capBucket);
  }

  const queryString = params.toString();
  return queryString ? `/venues?${queryString}` : "/venues";
}
