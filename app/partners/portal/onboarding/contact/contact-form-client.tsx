"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { partnerCreateContactAction } from "@/lib/provider/partner-actions";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  providerOrgId: number;
  email: string;
  name: string;
};

export function ContactFormClient({ providerOrgId, email, name }: Props) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(partnerCreateContactAction, null);

  if (state?.success) {
    setTimeout(() => {
      router.push("/partners/portal/onboarding/venue");
    }, 1200);
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#A9A49C] font-mono uppercase tracking-wider">
          <Link href="/partners/portal" className="hover:underline">
            Partner Portal
          </Link>
          <span>/</span>
          <span>Step 2 of 5</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#1A1714] tracking-tight">
          Primary Operational Contact
        </h1>
        <p className="text-sm text-[#7A756D]">
          Provide the main operational decision-maker or manager Relatia should coordinate with for bookings and partner communications.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold">{state.message}</p>
            <p className="text-xs text-emerald-700">Redirecting to venue creation form...</p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {state && !state.success && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm space-y-1">
          <p className="font-semibold">{state.error}</p>
          {state.fieldErrors && (
            <ul className="text-xs list-disc list-inside space-y-0.5 text-rose-700">
              {Object.entries(state.fieldErrors).map(([key, errs]) => {
                const fieldNames: Record<string, string> = {
                  name: "Contact Name",
                  role: "Role / Title",
                  email: "Email Address",
                  phone: "Phone Number",
                  preferredContactMethod: "Preferred Contact Channel",
                  category: "Functional Category",
                };
                const fieldLabel = fieldNames[key] || key;
                return (
                  <li key={key}>
                    <span className="font-semibold">{fieldLabel}</span>: {errs?.join(", ")}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Form */}
      <form action={action} className="rounded-2xl border border-[#E8E3DA] bg-white p-6 space-y-5 shadow-sm">
        <input type="hidden" name="providerOrgId" value={providerOrgId} />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Contact Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={name}
            placeholder="e.g. Vikram Sharma"
            className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Job Title / Role <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g. General Manager / Events Director"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Functional Category
            </label>
            <select
              name="category"
              defaultValue="MANAGEMENT"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="MANAGEMENT">General Management</option>
              <option value="SALES">Events &amp; Sales</option>
              <option value="OPERATIONS">Restaurant Operations</option>
              <option value="FINANCE">Accounts &amp; Billing</option>
              <option value="GENERAL">General Contact</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={email}
              placeholder="e.g. manager@restaurant.com"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#1A1714] placeholder-[#A9A49C] focus:border-[#C4A47C] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1A1714] uppercase tracking-wider">
            Preferred Contact Channel
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "EMAIL", label: "Email" },
              { id: "PHONE", label: "Phone Call" },
              { id: "WHATSAPP", label: "WhatsApp" },
            ].map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-2 rounded-xl border border-[#E8E3DA] bg-[#FDFBF7] p-3 text-xs text-[#1A1714] font-medium cursor-pointer hover:border-[#C4A47C] transition-colors"
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method.id}
                  defaultChecked={method.id === "EMAIL"}
                  className="accent-[#1A1714]"
                />
                {method.label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/partners/portal"
            className="text-xs font-semibold text-[#7A756D] hover:text-[#1A1714]"
          >
            Back to Overview
          </Link>
          <button
            type="submit"
            disabled={isPending || state?.success}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-[#F5F2EC] hover:bg-[#2C2825] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Saving..." : "Save & Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
