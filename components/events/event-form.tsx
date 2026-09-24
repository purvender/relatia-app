import Link from "next/link";
import { createEventAction } from "@/app/events/actions";

export function EventForm() {
  return (
    <form
      action={createEventAction}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs"
    >
      {/* Section 1: Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          1. Basic Information
        </h3>

        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-900"
          >
            Event Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={3}
            placeholder="e.g. Board Dinner & Strategy Meeting"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="eventType"
            className="block text-sm font-semibold text-slate-900"
          >
            Event Type <span className="text-rose-500">*</span>
          </label>
          <input
            id="eventType"
            name="eventType"
            type="text"
            required
            placeholder="e.g. Client Dinner, Team Offsite, Executive Mixer"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="purpose"
            className="block text-sm font-semibold text-slate-900"
          >
            Business Purpose
          </label>
          <textarea
            id="purpose"
            name="purpose"
            rows={3}
            placeholder="Describe the business rationale for this event..."
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Section 2: Location & Schedule */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          2. Location & Schedule
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-slate-900"
            >
              City <span className="text-rose-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              placeholder="e.g. Bengaluru"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dateTime"
              className="block text-sm font-semibold text-slate-900"
            >
              Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              id="dateTime"
              name="dateTime"
              type="datetime-local"
              required
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Budget & Capacity */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          3. Budget & Attendance
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="attendees"
              className="block text-sm font-semibold text-slate-900"
            >
              Number of Attendees <span className="text-rose-500">*</span>
            </label>
            <input
              id="attendees"
              name="attendees"
              type="number"
              min={1}
              required
              placeholder="8"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="budget"
              className="block text-sm font-semibold text-slate-900"
            >
              Total Budget (INR) <span className="text-rose-500">*</span>
            </label>
            <input
              id="budget"
              name="budget"
              type="number"
              min={1}
              step="0.01"
              required
              placeholder="40000"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Preferences */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          4. Preferences
        </h3>

        <div className="space-y-2">
          <label
            htmlFor="diet"
            className="block text-sm font-semibold text-slate-900"
          >
            Dietary Preference
          </label>
          <select
            id="diet"
            name="diet"
            defaultValue="NONE"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white"
          >
            <option value="NONE">NONE</option>
            <option value="VEG">VEG</option>
            <option value="NON_VEG">NON_VEG</option>
            <option value="JAIN">JAIN</option>
            <option value="VEGAN">VEGAN</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Save & Submit Event
        </button>

        <Link
          href="/events"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
