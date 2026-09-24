import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAppUser } from "@/lib/auth";
import { getVenueById } from "@/lib/venues/get-venue-by-id";
import { VenueDetailsCard } from "@/components/venues/venue-details-card";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate the segment is a valid integer before hitting the DB.
  const venueId = Number(id);
  if (!Number.isInteger(venueId) || venueId <= 0) {
    notFound();
  }

  const user = await requireAppUser();

  // Fetch the active venue — returns null if missing, inactive, or cross-company.
  const venue = await getVenueById(venueId, user.companyId);

  if (!venue) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <Link
            href="/venues"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Venues
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Partner Venues
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {venue.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.company.name} · Venue #{venue.id}
          </p>
        </div>
      </div>

      {/* Venue detail card */}
      <VenueDetailsCard venue={venue} />
    </div>
  );
}
