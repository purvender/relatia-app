import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePartnerUser } from "@/lib/partner-auth";
import { getProviderBookingRequestById } from "@/lib/provider/service";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import { PartnerRequestActionClient } from "./request-action-client";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  Mail,
  User,
  Utensils,
  FileText,
  AlertCircle,
} from "lucide-react";
import { db } from "@/prisma/db";

export const metadata: Metadata = {
  title: "Request Details — Partner Portal",
  description: "Review and respond to enterprise booking requests.",
};

function ProviderRequestStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING_PROVIDER_REVIEW":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          Waiting for your response
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Request Accepted
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800 border border-rose-200">
          <XCircle className="h-3.5 w-3.5 text-rose-600" />
          Request Declined
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
          <Ban className="h-3.5 w-3.5 text-slate-500" />
          Request Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
          {status}
        </span>
      );
  }
}

export default async function PartnerRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const requestId = Number(id);

  if (!Number.isInteger(requestId) || requestId <= 0) {
    notFound();
  }

  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    notFound();
  }

  // Tenant-scoped fetch — ensures request belongs to this provider org
  const request = await getProviderBookingRequestById(
    requestId,
    partner.providerOrgId,
  );

  if (!request) {
    notFound();
  }

  // Check provider org status
  const providerOrg = await db.orm.public.ProviderOrganization.where({
    id: partner.providerOrgId,
  }).first();
  const isOrgVerified = providerOrg?.status === "VERIFIED";

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="space-y-3">
        <Link
          href="/partners/portal/inbox"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A756D] hover:text-[#1A1714] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Requests Inbox
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-5">
          <div>
            <span className="text-[11px] font-mono text-[#A9A49C] uppercase tracking-wider">
              Request #{request.id} · {request.companyName}
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1A1714]">
              {request.eventTitle}
            </h1>
            <p className="mt-1 text-xs text-[#7A756D]">
              Submitted on {formatEventDateTime(request.createdAt)}
            </p>
          </div>

          <div className="shrink-0">
            <ProviderRequestStatusBadge status={request.status} />
          </div>
        </div>
      </div>

      {/* Unverified Org Warning Banner */}
      {!isOrgVerified && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">
              Partner Profile Verification Pending
            </p>
            <p className="mt-0.5 text-amber-800">
              Your organization is currently under review by Relatia Partner Ops. Once verified, you will be able to accept and decline booking requests.
            </p>
          </div>
        </div>
      )}

      {/* Action Section / Final Status Card */}
      {request.status === "PENDING_PROVIDER_REVIEW" ? (
        isOrgVerified ? (
          <PartnerRequestActionClient
            requestId={request.id}
            eventTitle={request.eventTitle}
          />
        ) : (
          <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 text-center space-y-2">
            <p className="text-sm font-semibold text-[#1A1714]">
              Action Locked
            </p>
            <p className="text-xs text-[#7A756D]">
              Profile verification is required before accepting or declining corporate requests.
            </p>
          </div>
        )
      ) : request.status === "ACCEPTED" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <h3 className="text-base font-semibold text-emerald-950">
              Booking Request Accepted
            </h3>
          </div>
          {request.respondedAt && (
            <p className="text-xs text-emerald-800">
              Accepted on {formatEventDateTime(request.respondedAt)}
            </p>
          )}
          {request.providerResponseNote && (
            <div className="bg-white/80 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-950 mt-2">
              <span className="font-semibold block mb-1">Your Confirmation Note:</span>
              {request.providerResponseNote}
            </div>
          )}
        </div>
      ) : request.status === "REJECTED" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <h3 className="text-base font-semibold text-rose-950">
              Booking Request Declined
            </h3>
          </div>
          {request.respondedAt && (
            <p className="text-xs text-rose-800">
              Declined on {formatEventDateTime(request.respondedAt)}
            </p>
          )}
          {request.rejectionReason && (
            <div className="bg-white/80 border border-rose-200/80 rounded-xl p-3.5 text-xs text-rose-950 mt-2">
              <span className="font-semibold block mb-1">Reason for Declining:</span>
              {request.rejectionReason}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-2">
          <div className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-slate-500 shrink-0" />
            <h3 className="text-base font-semibold text-slate-800">
              Request Cancelled
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            This request was cancelled by the client before partner confirmation.
          </p>
        </div>
      )}

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A756D]">
            <Calendar className="h-4 w-4 text-[#A9A49C]" />
            Requested Date &amp; Time
          </div>
          <p className="text-base font-bold text-[#1A1714]">
            {formatEventDateTime(request.requestedDateTime)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A756D]">
            <Users className="h-4 w-4 text-[#A9A49C]" />
            Party Size
          </div>
          <p className="text-base font-bold text-[#1A1714]">
            {request.attendees.toLocaleString("en-IN")} Attendees
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A756D]">
            <Building2 className="h-4 w-4 text-[#A9A49C]" />
            Target Venue
          </div>
          <p className="text-base font-bold text-[#1A1714]">
            {request.venueName}
          </p>
          <p className="text-xs text-[#7A756D]">{request.venueCity}</p>
        </div>
      </div>

      {/* Detailed Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enterprise Client Details */}
        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A756D] border-b border-[#E8E3DA] pb-3">
            Client &amp; Requester Information
          </h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#A9A49C]">Company</dt>
              <dd className="font-semibold text-[#1A1714]">{request.companyName}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Requester Name</dt>
              <dd className="font-medium text-[#1A1714] flex items-center gap-1.5 mt-0.5">
                <User className="h-3.5 w-3.5 text-[#A9A49C]" />
                {request.requesterName}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Requester Email</dt>
              <dd className="font-medium text-[#1A1714] flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3.5 w-3.5 text-[#A9A49C]" />
                {request.requesterEmail || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Estimated Budget</dt>
              <dd className="font-semibold text-[#1A1714]">
                {request.estimatedAmountPaise
                  ? formatRupees(request.estimatedAmountPaise)
                  : "Not specified"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Space & Offering Details */}
        <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A756D] border-b border-[#E8E3DA] pb-3">
            Space &amp; Package Preferences
          </h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#A9A49C]">Bookable Space Requested</dt>
              <dd className="font-medium text-[#1A1714]">
                {request.spaceName || "Any suitable section / venue wide"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Selected Package / Menu</dt>
              <dd className="font-medium text-[#1A1714] flex items-center gap-1.5 mt-0.5">
                <Utensils className="h-3.5 w-3.5 text-[#A9A49C]" />
                {request.offeringName || "Standard corporate dining"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Dietary Preferences</dt>
              <dd className="font-medium text-[#1A1714]">
                {request.dietaryNotes || "No specific dietary restrictions logged"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#A9A49C]">Operational &amp; Setup Notes</dt>
              <dd className="font-medium text-[#1A1714] flex items-start gap-1.5 mt-0.5">
                <FileText className="h-3.5 w-3.5 text-[#A9A49C] shrink-0 mt-0.5" />
                <span>{request.operationalNotes || "No custom operational notes provided"}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
