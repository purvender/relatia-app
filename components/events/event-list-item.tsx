import Link from "next/link";
import { ArrowRight, MapPin, Users, CalendarDays } from "lucide-react";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";

type EventListItemProps = {
  id: number;
  title: string;
  eventType: string;
  city: string;
  dateTime: string;
  attendees: number;
  budget: number;
  status: string;
};

export function EventListItem({
  id,
  title,
  eventType,
  city,
  dateTime,
  attendees,
  budget,
  status,
}: EventListItemProps) {
  return (
    <Link
      href={`/events/${id}`}
      className="group flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
    >
      {/* Left: title + subtitle metadata */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
            {title}
          </span>
          <EventStatusBadge status={status} />
        </div>

        <p className="mt-0.5 text-xs text-slate-500 truncate">{eventType}</p>

        {/* Secondary metadata row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" />
            {city}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3 w-3 shrink-0" />
            {formatEventDateTime(dateTime)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3 shrink-0" />
            {attendees.toLocaleString("en-IN")} attendees
          </span>
        </div>
      </div>

      {/* Right: budget + arrow */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="text-sm font-semibold text-slate-900">
          {formatRupees(budget)}
        </span>
        <ArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-600" />
      </div>
    </Link>
  );
}
