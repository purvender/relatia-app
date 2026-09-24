import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import { EventsPageHeader } from "@/components/events/events-page-header";
import { EventsEmptyState } from "@/components/events/events-empty-state";
import { EventStatusBadge } from "@/components/events/event-status-badge";

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
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Attendees
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Budget
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {event.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {event.eventType}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {event.city}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {formatEventDateTime(event.dateTime)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {event.attendees}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    {formatRupees(event.budget)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <EventStatusBadge status={event.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}