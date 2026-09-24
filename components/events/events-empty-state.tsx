import Link from "next/link";
import { Plus, CalendarX } from "lucide-react";

export function EventsEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-2xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <CalendarX className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        No events requested yet
      </h3>
      <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
        Create your first corporate event request to initiate budget validation and approvals.
      </p>
      <div className="mt-6">
        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </Link>
      </div>
    </div>
  );
}
