import type { Metadata } from "next";
import Link from "next/link";
import { requirePartnerUser } from "@/lib/partner-auth";
import { db } from "@/prisma/db";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  ChevronRight,
  PartyPopper,
  ShieldCheck,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Dashboard — Relatia",
  description: "Track your hospitality partner onboarding progress and profile status.",
};

type OnboardingStep =
  | "ACCOUNT_CREATED"
  | "ORG_ADDED"
  | "CONTACT_ADDED"
  | "VENUE_ADDED"
  | "SPACE_ADDED"
  | "OFFERING_ADDED"
  | "SUBMITTED";

const STEP_LABELS: Record<OnboardingStep, string> = {
  ACCOUNT_CREATED: "Account created",
  ORG_ADDED: "Organisation added",
  CONTACT_ADDED: "Primary contact added",
  VENUE_ADDED: "First venue added",
  SPACE_ADDED: "Bookable space added",
  OFFERING_ADDED: "Package / menu added",
  SUBMITTED: "Submitted for review",
};

const STEP_ORDER: OnboardingStep[] = [
  "ACCOUNT_CREATED",
  "ORG_ADDED",
  "CONTACT_ADDED",
  "VENUE_ADDED",
  "SPACE_ADDED",
  "OFFERING_ADDED",
  "SUBMITTED",
];

function getNextStep(current: OnboardingStep): OnboardingStep | null {
  const idx = STEP_ORDER.indexOf(current);
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
}

function getNextStepHref(step: OnboardingStep): string {
  switch (step) {
    case "ACCOUNT_CREATED":
      return "/partners/portal/onboarding/org";
    case "ORG_ADDED":
      return "/partners/portal/onboarding/contact";
    case "CONTACT_ADDED":
      return "/partners/portal/onboarding/venue";
    case "VENUE_ADDED":
      return "/partners/portal/onboarding/space";
    case "SPACE_ADDED":
      return "/partners/portal/onboarding/offering";
    case "OFFERING_ADDED":
      return "/partners/portal/onboarding/submit";
    default:
      return "/partners/portal";
  }
}

function getStatusBadge(step: OnboardingStep, accepted: boolean) {
  if (accepted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        Verified &amp; Live
      </span>
    );
  }
  if (step === "SUBMITTED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
        <Clock className="h-3 w-3" />
        Under Review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F2EC] border border-[#E8E3DA] px-3 py-1 text-xs font-semibold text-[#7A756D]">
      <AlertCircle className="h-3 w-3" />
      Profile Incomplete
    </span>
  );
}

export default async function PartnerPortalPage() {
  const partner = await requirePartnerUser();
  const currentStep = partner.onboardingStep as OnboardingStep;
  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const nextStep = getNextStep(currentStep);
  const isSubmitted = currentStep === "SUBMITTED";
  const isAccepted = !!partner.acceptedAt;
  const progressPct = Math.round(
    ((currentStepIndex + 1) / STEP_ORDER.length) * 100,
  );

  // Fetch org summary if linked
  let orgName: string | null = null;
  let venueCount = 0;
  if (partner.providerOrgId) {
    const org = await db.orm.public.ProviderOrganization.where({
      id: partner.providerOrgId,
    }).first();
    if (org) {
      orgName = org.name;
      const venues = await db.orm.public.Venue.where({
        providerOrgId: partner.providerOrgId,
      }).all();
      venueCount = venues.length;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-8">
      {/* Greeting */}
      <div className="space-y-1">
        <p className="text-xs text-[#A9A49C] font-mono uppercase tracking-wider">
          Partner Portal
        </p>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Welcome, {partner.name.split(" ")[0]}
        </h1>
        {orgName && (
          <p className="text-sm text-[#7A756D]">
            {orgName}
          </p>
        )}
      </div>

      {/* Status card */}
      <div className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-[#A9A49C] font-medium uppercase tracking-wide">
              Profile Status
            </p>
            <div className="flex items-center gap-2">
              {getStatusBadge(currentStep, isAccepted)}
            </div>
          </div>
          {isAccepted && (
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
          )}
        </div>

        {/* Progress bar (only until submitted) */}
        {!isSubmitted && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#A9A49C]">
              <span>Onboarding progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F0ECE4] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#C17F3E] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Context message */}
        {isAccepted ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-800 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <PartyPopper className="h-3.5 w-3.5" />
              You are live in Relatia Enterprise Discovery
            </div>
            <p>
              Corporate event planners can now discover your venue. You will
              receive booking inquiries with verified host briefs.
            </p>
          </div>
        ) : isSubmitted ? (
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-xs text-amber-900 space-y-1">
            <div className="font-semibold">Your profile is under Relatia review</div>
            <p>
              Our operations team will verify your venue and contact details
              within 2–3 business days. We may reach out to the contact you
              provided if we need additional information.
            </p>
          </div>
        ) : nextStep ? (
          <div className="space-y-3">
            <p className="text-xs text-[#7A756D]">
              Complete the remaining steps to submit your venue for Relatia
              verification.
            </p>
            <Link
              href={getNextStepHref(currentStep)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1A1714] text-white px-4 py-2.5 text-xs font-semibold hover:bg-[#252118] transition-colors"
            >
              Continue setup: {STEP_LABELS[nextStep]}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : null}
      </div>

      {/* Steps checklist */}
      <div className="rounded-2xl border border-[#E8E3DA] bg-white divide-y divide-[#F0ECE4] shadow-sm overflow-hidden">
        <div className="px-6 py-3.5">
          <p className="text-xs font-semibold text-[#1A1714] uppercase tracking-wide">
            Onboarding Checklist
          </p>
        </div>
        {STEP_ORDER.map((step, i) => {
          const done = i <= currentStepIndex;
          const isCurrent = i === currentStepIndex && !isSubmitted;
          const isNext = i === currentStepIndex + 1 && !isSubmitted;
          const href = isNext ? getNextStepHref(currentStep) : undefined;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 px-6 py-3.5 text-xs ${
                done
                  ? "text-[#1A1714]"
                  : "text-[#A9A49C]"
              }`}
            >
              <div
                className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                  done
                    ? "bg-[#1A1714]"
                    : isCurrent
                    ? "border-2 border-[#C17F3E]"
                    : "border border-[#E8E3DA]"
                }`}
              >
                {done && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                )}
                {isCurrent && (
                  <span className="h-2 w-2 rounded-full bg-[#C17F3E]" />
                )}
              </div>
              <span className={done ? "font-medium" : ""}>
                {STEP_LABELS[step]}
              </span>
              {isNext && href && (
                <Link
                  href={href}
                  className="ml-auto text-[#C17F3E] font-semibold hover:underline flex items-center gap-1"
                >
                  Start <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      {partner.providerOrgId && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#E8E3DA] bg-white p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F5F2EC]">
              <Building2 className="h-4 w-4 text-[#7A756D]" />
            </div>
            <div>
              <p className="text-xl font-semibold text-[#1A1714]">{venueCount}</p>
              <p className="text-[11px] text-[#A9A49C]">
                {venueCount === 1 ? "Venue" : "Venues"} added
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-[#E8E3DA] bg-white p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F5F2EC]">
              <Layers className="h-4 w-4 text-[#7A756D]" />
            </div>
            <div>
              <p className="text-xl font-semibold text-[#1A1714] capitalize">
                {currentStep.replace(/_/g, " ").toLowerCase()}
              </p>
              <p className="text-[11px] text-[#A9A49C]">Current step</p>
            </div>
          </div>
        </div>
      )}

      {/* Info block */}
      <div className="rounded-xl border border-[#E8E3DA] bg-[#F5F2EC] p-5 text-xs text-[#7A756D] space-y-2">
        <p className="font-semibold text-[#1A1714]">How Relatia partner publishing works</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>You complete and submit your venue profile through this portal.</li>
          <li>
            Relatia&apos;s operations team reviews your submission and may contact
            you for additional information.
          </li>
          <li>
            Once verified, Relatia explicitly publishes your venue to enterprise
            discovery. You cannot self-publish.
          </li>
          <li>
            You will receive corporate booking inquiries with verified host briefs,
            guest counts, dietary requirements, and event purpose.
          </li>
        </ul>
      </div>
    </div>
  );
}
