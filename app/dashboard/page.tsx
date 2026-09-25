import Link from "next/link";
import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { Calendar, Building2, Shield, Plus, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAppUser();

  const events = await db.orm.public.Event.where({
    companyId: user.companyId,
  })
    .orderBy((e) => e.dateTime.desc())
    .all();

  const venues = await db.orm.public.Venue.where({
    companyId: user.companyId,
  }).all();

  const policy = await db.orm.public.Policy.where({
    companyId: user.companyId,
  }).first();

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overview
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, {user.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Corporate event operations dashboard for{" "}
            <span className="font-semibold text-slate-700">
              {user.company.name}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/events/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Link>
        </div>
      </div>

      {/* Real Summary Metrics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Events */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Events
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {events.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Recorded for company</p>
        </div>

        {/* Metric 2: Available Venues */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Available Venues
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {venues.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Pre-approved corporate spaces</p>
        </div>

        {/* Metric 3: Allowed Cities */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Allowed Cities
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Shield className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {policy ? policy.allowedCities.length : 0}
          </p>
          <p className="mt-1 text-xs text-slate-500">Policy approved locations</p>
        </div>

        {/* Metric 4: Max Budget Cap */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Max Event Cap
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold">
              ₹
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {policy ? `₹${(policy.maxBudget / 100).toLocaleString("en-IN")}` : "N/A"}
          </p>
          <p className="mt-1 text-xs text-slate-500">Single event policy threshold</p>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Event Requests
            </h2>
            <p className="text-xs text-slate-500">
              Latest corporate events submitted by your team
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-slate-900">
              No events requested yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Get started by creating your first corporate event request.
            </p>
            <div className="mt-6">
              <Link
                href="/events/new"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Event</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {events.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {event.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {event.city} • {event.eventType} • {event.attendees} attendees
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{(event.budget / 100).toLocaleString("en-IN")}
                  </p>
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 mt-0.5">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}