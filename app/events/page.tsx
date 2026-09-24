import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { EventsPageHeader } from "@/components/events/events-page-header";
import { EventsEmptyState } from "@/components/events/events-empty-state";
import { EventListItem } from "@/components/events/event-list-item";

export default async function EventsPage() {
  const user = await requireAppUser();

  const events = await db.orm.public.Event.where({ companyId: user.companyId })
    .orderBy((e) => e.dateTime.desc())
    .all();

  return (
    <div className="space-y-6">
      <EventsPageHeader companyName={user.company.name} />

      {events.length === 0 ? (
        <EventsEmptyState />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
          {/* Column header */}
          <div className="grid grid-cols-[1fr_auto] border-b border-slate-100 bg-slate-50 px-5 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Event
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Budget
            </span>
          </div>

          {/* Event rows */}
          <div className="divide-y divide-slate-100">
            {events.map((event) => (
              <EventListItem
                key={event.id}
                id={event.id}
                title={event.title}
                eventType={event.eventType}
                city={event.city}
                dateTime={event.dateTime}
                attendees={event.attendees}
                budget={event.budget}
                status={event.status}
              />
            ))}
          </div>

          {/* Footer count */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5">
            <p className="text-xs text-slate-400">
              {events.length} event{events.length !== 1 ? "s" : ""} for{" "}
              {user.company.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}