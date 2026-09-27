import type { Metadata } from "next";
import Link from "next/link";
import { requirePartnerUser } from "@/lib/partner-auth";
import { getProviderBookingRequests } from "@/lib/provider/service";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import {
  Inbox,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowUpRight,
  Building2,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { db } from "@/prisma/db";

export const metadata: Metadata = {
  title: "Booking Requests Inbox — Partner Portal",
  description: "View and manage incoming corporate booking requests from enterprise clients.",
};

type TabKey = "pending" | "accepted" | "rejected" | "all";

function ProviderRequestStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING_PROVIDER_REVIEW":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
          <Clock className="h-3 w-3 text-amber-600" />
          Pending Review
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Accepted
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200">
          <XCircle className="h-3 w-3 text-rose-600" />
          Declined
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
          <Ban className="h-3 w-3 text-slate-500" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
          {status}
        </span>
      );
  }
}

export default async function PartnerInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;
  const currentTab: TabKey =
    tabParam === "accepted"
      ? "accepted"
      : tabParam === "rejected"
      ? "rejected"
      : tabParam === "all"
      ? "all"
      : "pending";

  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-12 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 border border-amber-200">
          <Inbox className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="text-xl font-bold text-[#1A1714]">No Provider Linked</h1>
        <p className="text-sm text-[#7A756D] max-w-md mx-auto">
          Please complete your hospitality partner profile onboarding to start receiving corporate booking requests.
        </p>
        <div>
          <Link
            href="/partners/portal/onboarding"
            className="inline-flex items-center justify-center rounded-xl bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#2D2A26] transition"
          >
            Complete Onboarding
          </Link>
        </div>
      </div>
    );
  }

  const providerOrg = await db.orm.public.ProviderOrganization.where({
    id: partner.providerOrgId,
  }).first();

  const isVerified = providerOrg?.status === "VERIFIED";

  // Fetch all requests for this provider organization
  const allRequests = await getProviderBookingRequests(partner.providerOrgId);

  const pendingRequests = allRequests.filter(
    (r) => r.status === "PENDING_PROVIDER_REVIEW",
  );
  const acceptedRequests = allRequests.filter((r) => r.status === "ACCEPTED");
  const rejectedRequests = allRequests.filter((r) => r.status === "REJECTED");

  const displayedRequests =
    currentTab === "pending"
      ? pendingRequests
      : currentTab === "accepted"
      ? acceptedRequests
      : currentTab === "rejected"
      ? rejectedRequests
      : allRequests;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-5">
        <div>
          <span className="text-[11px] font-mono text-[#A9A49C] uppercase tracking-wider">
            Hospitality Partner Inbox
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1A1714]">
            Booking Requests
          </h1>
          <p className="mt-1 text-xs text-[#7A756D]">
            Manage incoming corporate dining and event reservation requests for {providerOrg?.name || "your organization"}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            {pendingRequests.length} Pending Review
          </span>
        </div>
      </div>

      {/* Verification Notice if Org is not verified yet */}
      {!isVerified && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">
              Partner Profile Verification in Progress
            </p>
            <p className="mt-0.5 text-amber-800">
              Your profile is undergoing review by the Relatia Partner Operations team. Once verified, corporate clients will be able to discover your venues and submit booking requests directly to this inbox.
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E3DA] pb-3 text-xs font-semibold">
        <Link
          href="/partners/portal/inbox?tab=pending"
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === "pending"
              ? "bg-[#1A1714] text-white shadow-2xs"
              : "text-[#7A756D] hover:bg-[#F5F2EC] hover:text-[#1A1714]"
          }`}
        >
          <span>Pending</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              currentTab === "pending"
                ? "bg-white/20 text-white"
                : "bg-[#E8E3DA] text-[#7A756D]"
            }`}
          >
            {pendingRequests.length}
          </span>
        </Link>

        <Link
          href="/partners/portal/inbox?tab=accepted"
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === "accepted"
              ? "bg-[#1A1714] text-white shadow-2xs"
              : "text-[#7A756D] hover:bg-[#F5F2EC] hover:text-[#1A1714]"
          }`}
        >
          <span>Accepted</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              currentTab === "accepted"
                ? "bg-white/20 text-white"
                : "bg-[#E8E3DA] text-[#7A756D]"
            }`}
          >
            {acceptedRequests.length}
          </span>
        </Link>

        <Link
          href="/partners/portal/inbox?tab=rejected"
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === "rejected"
              ? "bg-[#1A1714] text-white shadow-2xs"
              : "text-[#7A756D] hover:bg-[#F5F2EC] hover:text-[#1A1714]"
          }`}
        >
          <span>Declined</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              currentTab === "rejected"
                ? "bg-white/20 text-white"
                : "bg-[#E8E3DA] text-[#7A756D]"
            }`}
          >
            {rejectedRequests.length}
          </span>
        </Link>

        <Link
          href="/partners/portal/inbox?tab=all"
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === "all"
              ? "bg-[#1A1714] text-white shadow-2xs"
              : "text-[#7A756D] hover:bg-[#F5F2EC] hover:text-[#1A1714]"
          }`}
        >
          <span>All Requests</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              currentTab === "all"
                ? "bg-white/20 text-white"
                : "bg-[#E8E3DA] text-[#7A756D]"
            }`}
          >
            {allRequests.length}
          </span>
        </Link>
      </div>

      {/* Requests List or Empty State */}
      {displayedRequests.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F2EC]">
            <Inbox className="h-6 w-6 text-[#A9A49C]" />
          </div>
          <h3 className="text-base font-semibold text-[#1A1714]">
            No {currentTab === "all" ? "" : currentTab} booking requests
          </h3>
          <p className="text-xs text-[#7A756D] max-w-sm mx-auto">
            {currentTab === "pending"
              ? "You're all caught up! New requests from enterprise clients will appear here."
              : `There are currently no ${currentTab} requests in your inbox.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-[#E8E3DA] bg-white p-5 shadow-2xs hover:border-[#1A1714]/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A9A49C]">
                    Request #{req.id} · {req.companyName}
                  </span>
                  <h3 className="text-base font-bold text-[#1A1714] mt-0.5">
                    {req.eventTitle}
                  </h3>
                  <p className="text-xs text-[#7A756D]">
                    Venue: <span className="font-medium text-[#1A1714]">{req.venueName}</span> ({req.venueCity})
                    {req.spaceName && ` · Space: ${req.spaceName}`}
                    {req.offeringName && ` · Package: ${req.offeringName}`}
                  </p>
                </div>

                <div className="shrink-0">
                  <ProviderRequestStatusBadge status={req.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[#FDFCFA] p-3 rounded-xl border border-[#E8E3DA]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#A9A49C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#A9A49C] block">Date &amp; Time</span>
                    <span className="font-semibold text-[#1A1714]">
                      {formatEventDateTime(req.requestedDateTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#A9A49C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#A9A49C] block">Attendees</span>
                    <span className="font-semibold text-[#1A1714]">
                      {req.attendees.toLocaleString("en-IN")} guests
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Building2 className="h-3.5 w-3.5 text-[#A9A49C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#A9A49C] block">Estimated Budget</span>
                    <span className="font-semibold text-[#1A1714]">
                      {req.estimatedAmountPaise
                        ? formatRupees(req.estimatedAmountPaise)
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-[#A9A49C]">
                  Received {formatEventDateTime(req.createdAt)}
                </span>
                <Link
                  href={`/partners/portal/inbox/${req.id}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1A1714] hover:text-[#5B13EC] transition-colors"
                >
                  <span>Review Request</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
