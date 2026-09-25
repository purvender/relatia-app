import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { getVenues } from "@/lib/venues/get-venues";
import { VenuesPageHeader } from "@/components/venues/venues-page-header";
import { VenueFilters } from "@/components/venues/venue-filters";
import { VenuesList } from "@/components/venues/venues-list";

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    priceBand?: string;
    minCapacity?: string;
    eventId?: string;
  }>;
}) {
  const params = await searchParams;
  const user = await requireAppUser();

  const city = typeof params.city === "string" ? params.city : undefined;
  const priceBand = typeof params.priceBand === "string" ? params.priceBand : undefined;
  const minCapacityRaw = typeof params.minCapacity === "string" ? params.minCapacity : undefined;
  const minCapacity = minCapacityRaw ? Number(minCapacityRaw) : undefined;
  const rawEventId = typeof params.eventId === "string" ? params.eventId : undefined;
  const parsedEventId = rawEventId ? Number(rawEventId) : undefined;
  const eventId = parsedEventId && Number.isInteger(parsedEventId) && parsedEventId > 0 ? parsedEventId : undefined;

  const policy = await db.orm.public.Policy.where({ companyId: user.companyId }).first();
  const allowedCities = policy?.allowedCities ?? [];

  const venues = await getVenues(user.companyId, {
    city,
    priceBand,
    minCapacity: minCapacity && !Number.isNaN(minCapacity) ? minCapacity : undefined,
  });

  const hasActiveFilters = Boolean(city || priceBand || minCapacityRaw);

  return (
    <div className="space-y-6">
      <VenuesPageHeader companyName={user.company.name} />

      <VenueFilters allowedCities={allowedCities} />

      <VenuesList venues={venues} hasActiveFilters={hasActiveFilters} eventId={eventId} />
    </div>
  );
}
