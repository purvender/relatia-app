"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerSubmitForReviewAction } from "@/lib/provider/partner-actions";
import {
  CheckCircle2,
  Clock,
  Building2,
  Users,
  MapPin,
  Layers,
  Package,
  PartyPopper,
  ArrowRight,
  Shield,
} from "lucide-react";

type Props = {
  partner: {
    name: string;
    email: string;
    onboardingStep: string;
    submittedAt: string | null;
  };
  summary: {
    orgName: string | null;
    orgType: string | null;
    city: string | null;
    contactCount: number;
    venueCount: number;
    spaceCount: number;
    offeringCount: number;
  };
  alreadySubmitted: boolean;
};

function SummaryRow({
  icon: Icon,
  label,
  value,
  complete,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  complete: boolean;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F0EDE8] last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            complete
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#7A756D]">{label}</p>
          <p className="text-sm font-semibold text-[#1A1714]">{value}</p>
        </div>
      </div>
      {!complete && (
        <Link
          href={href}
          className="text-xs font-semibold text-[#C4A47C] hover:text-[#1A1714] shrink-0"
        >
          Add →
        </Link>
      )}
      {complete && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
    </div>
  );
}

export function SubmitReviewClient({ partner, summary, alreadySubmitted }: Props) {
  const router = useRouter();
  // Adapter: useActionState requires (prevState, formData) signature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function submitAction(prevState: unknown, formData: FormData) {
    return partnerSubmitForReviewAction();
  }
  const [state, action, isPending] = useActionState(submitAction, null);

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal");
    }, 2000);
  }

  const isComplete =
    summary.contactCount > 0 &&
    summary.venueCount > 0 &&
    summary.spaceCount > 0 &&
    summary.offeringCount > 0;

  return (
    <div className="mx-auto max-w-xl px-5 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#A9A49C] font-mono uppercase tracking-wider">
          <Link href="/partners/portal" className="hover:underline">
            Partner Portal
          </Link>
          <span>/</span>
          <span>Submit for Review</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Review & Submit Your Profile
        </h1>
        <p className="text-sm text-[#7A756D]">
          Once submitted, the Relatia Partner Ops team will review your profile within 2–3 business days and verify your venue before it appears in enterprise discovery.
        </p>
      </div>

      {/* Already submitted banner */}
      {alreadySubmitted && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-4 text-amber-900">
          <Clock className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Your profile is under review</p>
            <p className="text-xs text-amber-800">
              Submitted{" "}
              {partner.submittedAt
                ? new Date(partner.submittedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "recently"}
              . The Relatia team will be in touch via {partner.email}.
            </p>
          </div>
        </div>
      )}

      {/* Success after submission */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-4 text-emerald-900">
          <PartyPopper className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Profile submitted successfully!</p>
            <p className="text-xs text-emerald-800">{state.message}</p>
          </div>
        </div>
      )}

      {/* Error */}
      {state && !state.success && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm">
          <p className="font-semibold">{state.error}</p>
        </div>
      )}

      {/* Profile summary */}
      <div className="rounded-2xl border border-[#E8E3DA] bg-white shadow-sm divide-y divide-[#F0EDE8]">
        {/* Header row */}
        <div className="p-5">
          <p className="text-xs font-semibold text-[#A9A49C] uppercase tracking-wider mb-3">
            Profile Summary
          </p>
          <SummaryRow
            icon={Building2}
            label="Organisation"
            value={summary.orgName ?? "Not set"}
            complete={!!summary.orgName}
            href="/partners/portal/onboarding/org"
          />
          <SummaryRow
            icon={Users}
            label="Primary Contact"
            value={
              summary.contactCount > 0
                ? `${summary.contactCount} contact${summary.contactCount !== 1 ? "s" : ""} added`
                : "No contact added"
            }
            complete={summary.contactCount > 0}
            href="/partners/portal/onboarding/contact"
          />
          <SummaryRow
            icon={MapPin}
            label="Venue"
            value={
              summary.venueCount > 0
                ? `${summary.venueCount} venue${summary.venueCount !== 1 ? "s" : ""} registered`
                : "No venue added"
            }
            complete={summary.venueCount > 0}
            href="/partners/portal/onboarding/venue"
          />
          <SummaryRow
            icon={Layers}
            label="Bookable Space"
            value={
              summary.spaceCount > 0
                ? `${summary.spaceCount} space${summary.spaceCount !== 1 ? "s" : ""} defined`
                : "No space added"
            }
            complete={summary.spaceCount > 0}
            href="/partners/portal/onboarding/space"
          />
          <SummaryRow
            icon={Package}
            label="Package / Menu"
            value={
              summary.offeringCount > 0
                ? `${summary.offeringCount} package${summary.offeringCount !== 1 ? "s" : ""} listed`
                : "No package added"
            }
            complete={summary.offeringCount > 0}
            href="/partners/portal/onboarding/offering"
          />
        </div>

        {/* What happens next */}
        <div className="p-5 space-y-3 bg-[#FAF8F5]">
          <p className="text-xs font-semibold text-[#A9A49C] uppercase tracking-wider">
            What Happens After Submission
          </p>
          <ol className="space-y-2 text-xs text-[#7A756D] list-decimal list-inside">
            <li>Relatia Partner Ops reviews your venue and package details (2–3 business days)</li>
            <li>A Relatia representative may contact you to verify venue details or request photos</li>
            <li>Upon approval, your venue appears in Relatia enterprise discovery</li>
            <li>Enterprise clients can then shortlist and book your spaces for events</li>
          </ol>
        </div>
      </div>

      {/* Consent note */}
      <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] p-4 flex items-start gap-3 text-xs text-[#7A756D]">
        <Shield className="h-4 w-4 shrink-0 text-[#C4A47C] mt-0.5" />
        <p>
          By submitting, you confirm that all venue and package information is accurate and that you have authority to list this venue on Relatia. Your profile will remain in Draft mode until manually verified and published by Relatia.
        </p>
      </div>

      {/* Actions */}
      {!alreadySubmitted && !state?.success && (
        <div className="flex items-center justify-between">
          <Link
            href="/partners/portal"
            className="text-xs font-semibold text-[#7A756D] hover:text-[#1A1714]"
          >
            Back to Overview
          </Link>
          <form action={action}>
            <button
              type="submit"
              disabled={isPending || !isComplete}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1A1714] px-6 py-3 text-sm font-semibold text-[#F5F2EC] hover:bg-[#2C2825] disabled:opacity-50 transition-colors"
            >
              {isPending ? "Submitting..." : "Submit Profile for Review"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {!isComplete && !alreadySubmitted && (
        <p className="text-xs text-amber-700 font-medium text-center">
          Complete all required steps above before submitting for review.
        </p>
      )}
    </div>
  );
}
