import Link from "next/link";
import { Building2, ArrowRight, MapPin, Users } from "lucide-react";
import { getVenueDiscoveryUrl } from "@/lib/events/get-venue-discovery-query";

type EventVenueDiscoveryCardProps = {
  city: string;
  attendees: number;
};

export function EventVenueDiscoveryCard({
  city,
  attendees,
}: EventVenueDiscoveryCardProps) {
  const discoveryUrl = getVenueDiscoveryUrl({ city, attendees });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Partner Venue Discovery
          </h3>
        </div>
        <p className="text-base font-bold text-slate-900">
          Discover venues in {city}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            {attendees.toLocaleString("en-IN")} attendees
          </span>
        </div>
      </div>

      <div className="shrink-0">
        <Link
          href={discoveryUrl}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <span>Discover Venues</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
