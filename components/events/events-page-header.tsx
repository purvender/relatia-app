import Link from "next/link";
import { Plus } from "lucide-react";

type EventsPageHeaderProps = {
  companyName: string;
};

export function EventsPageHeader({ companyName }: EventsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Operations
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Corporate Events
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage event requests and venue bookings for{" "}
          <span className="font-semibold text-slate-700">{companyName}</span>.
        </p>
      </div>

      <Link
        href="/events/new"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <Plus className="h-4 w-4" />
        <span>Create Event</span>
      </Link>
    </div>
  );
}
