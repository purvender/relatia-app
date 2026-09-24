import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAppUser } from "@/lib/auth";
import { getEventById } from "@/lib/events/get-event-by-id";
import { EventDetailsCard } from "@/components/events/event-details-card";
import { EventSubmitButton } from "@/components/events/event-submit-button";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate the segment is a valid integer before hitting the DB.
  const eventId = Number(id);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    notFound();
  }

  const user = await requireAppUser();

  // Fetch the event — returns null if not found or out of company scope.
  const event = await getEventById(eventId, user.companyId);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Events
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Operations
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Event Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.company.name} · Event #{event.id}
          </p>
        </div>

        {/* Submit action shown only when event is in DRAFT status */}
        {event.status === "DRAFT" && (
          <EventSubmitButton eventId={event.id} />
        )}
      </div>

      {/* Main detail card */}
      <EventDetailsCard
        event={event}
        currentUserId={user.id}
        currentUserRole={user.role}
      />
    </div>
  );
}
