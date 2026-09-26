"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Plus,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  RefreshCw,
  Phone,
  Mail,
  Lock,
  Info,
  Power,
  Sliders,
  FileText,
  UserCheck,
} from "lucide-react";
import type { ProviderDetailHierarchy } from "@/lib/provider/service";
import type {
  ProviderOrganizationRecord,
  ProviderContactRecord,
  ProviderVenueRecord,
  BookableSpaceRecord,
  OfferingRecord,
  AvailabilityMetadataRecord,
  CancellationPolicyRecord,
} from "@/lib/provider/types";
import {
  createProviderAction,
  updateProviderAction,
  createProviderContactAction,
  updateProviderContactAction,
  toggleProviderContactAction,
  createProviderVenueAction,
  updateProviderVenueAction,
  createBookableSpaceAction,
  updateBookableSpaceAction,
  toggleBookableSpaceAction,
  createOfferingAction,
  updateOfferingAction,
  toggleOfferingAction,
  updateAvailabilityAction,
  updateCancellationPolicyAction,
  recordVerificationAction,
  syncVenueReadinessAction,
  updateVenueVisibilityAction,
} from "@/lib/provider/actions";

// Helpers for badges
export function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "VERIFIED":
    case "COMPLETE":
    case "READY_FOR_DISCOVERY":
    case "DISCOVERABLE":
    case "ACTIVE":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3" />
          {status.replace(/_/g, " ")}
        </span>
      );
    case "PENDING_VERIFICATION":
    case "PENDING_REVIEW":
    case "IN_PROGRESS":
    case "REVIEW_REQUIRED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
          <Clock className="h-3 w-3" />
          {status.replace(/_/g, " ")}
        </span>
      );
    case "DRAFT":
    case "NOT_STARTED":
    case "INTERNAL_ONLY":
    case "UNVERIFIED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
          <Info className="h-3 w-3 text-slate-400" />
          {status.replace(/_/g, " ")}
        </span>
      );
    case "BLOCKED":
    case "REJECTED":
    case "ARCHIVED":
    case "PAUSED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
          <XCircle className="h-3 w-3" />
          {status.replace(/_/g, " ")}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {status}
        </span>
      );
  }
}

// 1. Create Provider Organization Dialog
export function CreateProviderDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createProviderAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
        if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
      >
        <Plus className="h-4 w-4" />
        New Provider Organization
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Onboard Provider Organization
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Internal operator sequence for hospitality supply partner
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Organization / Brand Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. The Oberoi Group - Delhi-NCR"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
                {fieldErrors?.name && (
                  <p className="mt-1 text-xs text-rose-600">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Legal Registered Name
                </label>
                <input
                  name="legalName"
                  type="text"
                  placeholder="e.g. EIH Limited"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Provider Type *
                  </label>
                  <select
                    name="providerType"
                    defaultValue="RESTAURANT"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="RESTAURANT">Restaurant / Dining</option>
                    <option value="HOTEL">Hotel / Resort</option>
                    <option value="CLUB">Private Club / Lounge</option>
                    <option value="CATERING_COMPANY">Catering Partner</option>
                    <option value="EXPERIENCE_PROVIDER">Experience Provider</option>
                    <option value="ACTIVITY_PROVIDER">Activity Provider</option>
                    <option value="LIVE_ENTERTAINMENT">Live Entertainment</option>
                    <option value="GIFTING_PROVIDER">Gifting Provider</option>
                    <option value="MERCHANDISE_PROVIDER">Merchandise Provider</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Primary City *
                  </label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue="Gurugram"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Internal Operational Notes
                </label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  placeholder="Restricted internal notes on onboarding tier, relationship owner, key account contact..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Save Provider"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 1b. Edit Provider Organization Dialog
export function EditProviderDialog({ provider }: { provider: ProviderOrganizationRecord }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors(null);
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(provider.id));

    startTransition(async () => {
      const res = await updateProviderAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
        if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Edit2 className="h-3.5 w-3.5" />
        Edit Provider
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Edit Provider Organization
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update corporate entity information and onboarding lifecycle
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Brand / Organization Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={provider.name}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
                {fieldErrors?.name && (
                  <p className="mt-1 text-xs text-rose-600">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Legal Registered Entity
                </label>
                <input
                  name="legalName"
                  type="text"
                  defaultValue={provider.legalName ?? ""}
                  placeholder="e.g. EIH Limited"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Provider Type
                  </label>
                  <select
                    name="providerType"
                    defaultValue={provider.providerType}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="RESTAURANT">Restaurant / Dining</option>
                    <option value="HOTEL">Hotel / Resort</option>
                    <option value="CLUB">Private Club / Lounge</option>
                    <option value="CATERING_COMPANY">Catering Partner</option>
                    <option value="EXPERIENCE_PROVIDER">Experience Provider</option>
                    <option value="ACTIVITY_PROVIDER">Activity Provider</option>
                    <option value="LIVE_ENTERTAINMENT">Live Entertainment</option>
                    <option value="GIFTING_PROVIDER">Gifting Provider</option>
                    <option value="MERCHANDISE_PROVIDER">Merchandise Provider</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    City *
                  </label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={provider.city}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Provider Status
                  </label>
                  <select
                    name="status"
                    defaultValue={provider.status}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PENDING_VERIFICATION">PENDING_VERIFICATION</option>
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Onboarding Status
                  </label>
                  <select
                    name="onboardingStatus"
                    defaultValue={provider.onboardingStatus}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="NOT_STARTED">NOT_STARTED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="REVIEW_REQUIRED">REVIEW_REQUIRED</option>
                    <option value="READY_FOR_DISCOVERY">READY_FOR_DISCOVERY</option>
                    <option value="BLOCKED">BLOCKED</option>
                    <option value="COMPLETE">COMPLETE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Internal Notes (Restricted)
                </label>
                <textarea
                  name="internalNotes"
                  rows={3}
                  defaultValue={provider.internalNotes ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Update Provider"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 2. Add Contact Dialog
export function AddContactDialog({ providerOrgId }: { providerOrgId: number }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await createProviderContactAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Contact
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Add Provider Key Contact
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Role / Title *</label>
                  <input
                    name="role"
                    type="text"
                    required
                    placeholder="e.g. General Manager"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Category</label>
                  <select
                    name="category"
                    defaultValue="OPERATIONS"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="OPERATIONS">Operations / Concierge</option>
                    <option value="SALES">Sales & Banqueting</option>
                    <option value="MANAGEMENT">GM / Management</option>
                    <option value="FINANCE">Billing / Finance</option>
                    <option value="GENERAL">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@property.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+91 9811X XXXXX"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Preferred Channel</label>
                  <select
                    name="preferredContactMethod"
                    defaultValue="EMAIL"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="EMAIL">Email</option>
                    <option value="PHONE">Direct Call</option>
                    <option value="WHATSAPP">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Internal Notes</label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  placeholder="Availability hours, escalation priority..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 2b. Edit Contact Dialog
export function EditContactDialog({
  contact,
  providerOrgId,
}: {
  contact: ProviderContactRecord;
  providerOrgId: number;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(contact.id));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateProviderContactAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100"
        title="Edit contact"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Edit Provider Contact
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={contact.name}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Role / Title *</label>
                  <input
                    name="role"
                    type="text"
                    required
                    defaultValue={contact.role}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Category</label>
                  <select
                    name="category"
                    defaultValue={contact.category}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="OPERATIONS">Operations / Concierge</option>
                    <option value="SALES">Sales & Banqueting</option>
                    <option value="MANAGEMENT">GM / Management</option>
                    <option value="FINANCE">Billing / Finance</option>
                    <option value="GENERAL">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={contact.email}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={contact.phone ?? ""}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Preferred Channel</label>
                  <select
                    name="preferredContactMethod"
                    defaultValue={contact.preferredContactMethod}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="EMAIL">Email</option>
                    <option value="PHONE">Direct Call</option>
                    <option value="WHATSAPP">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Internal Notes</label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  defaultValue={contact.internalNotes ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id={`contact-active-${contact.id}`}
                  name="isActive"
                  value="true"
                  defaultChecked={contact.isActive}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor={`contact-active-${contact.id}`} className="text-xs text-slate-700 font-medium">
                  Active Contact (available for notifications)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 2c. Toggle Contact Status Button
export function ToggleContactButton({
  contactId,
  providerOrgId,
  isActive,
}: {
  contactId: number;
  providerOrgId: number;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleProviderContactAction(contactId, !isActive, providerOrgId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border transition-colors ${
        isActive
          ? "border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
      title={isActive ? "Deactivate Contact" : "Activate Contact"}
    >
      <Power className="h-3 w-3" />
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}

// 3. Add Venue Dialog
export function AddVenueDialog({
  providerOrgId,
  triggerLabel = "Add Venue",
}: {
  providerOrgId: number;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors(null);
    const formData = new FormData(e.currentTarget);
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await createProviderVenueAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
        if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Physical Venue</h3>
                <p className="text-xs text-slate-500">
                  Establishment profile for corporate dining, banqueting, or event hospitality.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Venue Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. 360° at The Oberoi"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                  {fieldErrors?.name && <p className="mt-1 text-xs text-rose-600">{fieldErrors.name[0]}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Venue Type</label>
                  <select
                    name="venueType"
                    defaultValue="RESTAURANT"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="RESTAURANT">Fine Dining / Restaurant</option>
                    <option value="HOTEL_BALLROOM">Hotel Ballroom / Hall</option>
                    <option value="ROOFTOP_LOUNGE">Rooftop / Sky Lounge</option>
                    <option value="PRIVATE_CLUB">Executive Private Club</option>
                    <option value="TERRACE_GARDEN">Terrace / Garden Pavilion</option>
                    <option value="BOARDROOM_SUITE">Executive Boardroom Suite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">City *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue="Gurugram"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Micro-Locality</label>
                  <input
                    name="locality"
                    type="text"
                    placeholder="e.g. DLF Cyber Hub"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Overall Capacity *</label>
                  <input
                    name="capacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={60}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Street Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="e.g. 443, Udyog Vihar Phase V, Sector 19, Gurugram"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Cuisine / Culinary Style *</label>
                  <input
                    name="cuisine"
                    type="text"
                    required
                    placeholder="e.g. Modern Indian & European"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Price Band</label>
                  <select
                    name="priceBand"
                    defaultValue="PREMIUM"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="MODERATE">Moderate (₹1,500–₹2,500/head)</option>
                    <option value="PREMIUM">Premium (₹2,500–₹5,000/head)</option>
                    <option value="LUXURY">Luxury (₹5,000+/head)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Tags (Comma-Separated)</label>
                  <input
                    name="tags"
                    type="text"
                    placeholder="PDR, Valet, Full Bar, Wine Cellar"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Public-Safe Description (Enterprise Discoverable)
                </label>
                <textarea
                  name="publicDescription"
                  rows={2}
                  placeholder="Atmosphere, executive seating layout, signature culinary repertoire..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Internal Operations Notes (Restricted)
                </label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  placeholder="Commission terms, direct manager phone, access requirements..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Save Venue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 3b. Edit Venue Dialog
export function EditVenueDialog({
  venue,
  providerOrgId,
  triggerLabel,
}: {
  venue: ProviderVenueRecord;
  providerOrgId: number;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors(null);
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(venue.id));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateProviderVenueAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
        if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Edit2 className="h-3.5 w-3.5" />
        {triggerLabel ?? "Edit Venue"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit Venue Details</h3>
                <p className="text-xs text-slate-500">
                  Update location, capacity, cuisine, tags, and operational visibility.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Venue Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={venue.name}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                  {fieldErrors?.name && <p className="mt-1 text-xs text-rose-600">{fieldErrors.name[0]}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Venue Type</label>
                  <select
                    name="venueType"
                    defaultValue={venue.venueType ?? "RESTAURANT"}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="RESTAURANT">Fine Dining / Restaurant</option>
                    <option value="HOTEL_BALLROOM">Hotel Ballroom / Hall</option>
                    <option value="ROOFTOP_LOUNGE">Rooftop / Sky Lounge</option>
                    <option value="PRIVATE_CLUB">Executive Private Club</option>
                    <option value="TERRACE_GARDEN">Terrace / Garden Pavilion</option>
                    <option value="BOARDROOM_SUITE">Executive Boardroom Suite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">City *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={venue.city}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Micro-Locality</label>
                  <input
                    name="locality"
                    type="text"
                    defaultValue={venue.locality ?? ""}
                    placeholder="e.g. DLF Cyber Hub"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Overall Capacity *</label>
                  <input
                    name="capacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={venue.capacity}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Street Address</label>
                <input
                  name="address"
                  type="text"
                  defaultValue={venue.address ?? ""}
                  placeholder="e.g. 443, Udyog Vihar Phase V, Sector 19, Gurugram"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Cuisine / Style *</label>
                  <input
                    name="cuisine"
                    type="text"
                    required
                    defaultValue={venue.cuisine}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Price Band</label>
                  <select
                    name="priceBand"
                    defaultValue={venue.priceBand}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="MODERATE">Moderate (₹1,500–₹2,500/head)</option>
                    <option value="PREMIUM">Premium (₹2,500–₹5,000/head)</option>
                    <option value="LUXURY">Luxury (₹5,000+/head)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Tags (Comma-Separated)</label>
                  <input
                    name="tags"
                    type="text"
                    defaultValue={venue.tags.join(", ")}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Visibility Status</label>
                  <select
                    name="visibility"
                    defaultValue={venue.visibility}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="INTERNAL_ONLY">INTERNAL_ONLY</option>
                    <option value="DISCOVERABLE">DISCOVERABLE</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`venue-active-${venue.id}`}
                    name="active"
                    value="true"
                    defaultChecked={venue.active}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <label htmlFor={`venue-active-${venue.id}`} className="text-xs text-slate-700 font-medium">
                    Active Venue (open for business)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Public-Safe Description (Enterprise Host Facing)
                </label>
                <textarea
                  name="publicDescription"
                  rows={3}
                  defaultValue={venue.publicDescription ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Internal Operations Notes (Restricted)
                </label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  defaultValue={venue.internalNotes ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 4. Add BookableSpace Dialog
export function AddBookableSpaceDialog({
  venueId,
  providerOrgId,
  triggerLabel = "Add Bookable Space",
}: {
  venueId: number;
  providerOrgId?: number;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("venueId", String(venueId));
    if (providerOrgId) formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await createBookableSpaceAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" />
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Add Bookable Space
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Space Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. The Grand Diplomatic PDR"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Space Type *</label>
                  <select
                    name="spaceType"
                    defaultValue="PRIVATE_DINING"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="PRIVATE_DINING">Private Dining Room (PDR)</option>
                    <option value="SEMI_PRIVATE_DINING">Semi-Private Dining Area</option>
                    <option value="TERRACE">Outdoor Terrace</option>
                    <option value="ROOFTOP">Rooftop Pavilion</option>
                    <option value="BALLROOM">Grand Ballroom</option>
                    <option value="BOARDROOM">Executive Boardroom</option>
                    <option value="LOUNGE">Lounge Area</option>
                    <option value="MAIN_DINING_SECTION">Main Dining Section</option>
                    <option value="CLUB_EVENT_SPACE">Club Event Space</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Privacy Level</label>
                  <select
                    name="privacyLevel"
                    defaultValue="EXCLUSIVE"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="EXCLUSIVE">Exclusive (Fully Enclosed)</option>
                    <option value="SEMI_PRIVATE">Semi-Private (Screened / Curtain)</option>
                    <option value="OPEN">Open Dedicated Section</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Min Capacity *</label>
                  <input
                    name="minCapacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={4}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Max Capacity *</label>
                  <input
                    name="maxCapacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={14}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Seated Capacity</label>
                  <input
                    name="seatedCapacity"
                    type="number"
                    placeholder="e.g. 12"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Standing Capacity</label>
                  <input
                    name="standingCapacity"
                    type="number"
                    placeholder="e.g. 20"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Public-Safe Description</label>
                <textarea
                  name="publicDescription"
                  rows={2}
                  placeholder="Dedicated AV screen, private butler service, discreet executive entrance..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Internal Notes</label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  placeholder="Turnover time, minimum spend override policy..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add Space"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 4b. Edit BookableSpace Dialog
export function EditBookableSpaceDialog({
  space,
  venueId,
  providerOrgId,
}: {
  space: BookableSpaceRecord;
  venueId: number;
  providerOrgId: number;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(space.id));
    formData.append("venueId", String(venueId));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateBookableSpaceAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100"
        title="Edit space"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Edit Bookable Space
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Space Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={space.name}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Space Type *</label>
                  <select
                    name="spaceType"
                    defaultValue={space.spaceType}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="PRIVATE_DINING">Private Dining Room (PDR)</option>
                    <option value="SEMI_PRIVATE_DINING">Semi-Private Dining Area</option>
                    <option value="TERRACE">Outdoor Terrace</option>
                    <option value="ROOFTOP">Rooftop Pavilion</option>
                    <option value="BALLROOM">Grand Ballroom</option>
                    <option value="BOARDROOM">Executive Boardroom</option>
                    <option value="LOUNGE">Lounge Area</option>
                    <option value="MAIN_DINING_SECTION">Main Dining Section</option>
                    <option value="CLUB_EVENT_SPACE">Club Event Space</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Privacy Level</label>
                  <select
                    name="privacyLevel"
                    defaultValue={space.privacyLevel ?? "EXCLUSIVE"}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="EXCLUSIVE">Exclusive (Fully Enclosed)</option>
                    <option value="SEMI_PRIVATE">Semi-Private (Screened / Curtain)</option>
                    <option value="OPEN">Open Dedicated Section</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Min Capacity *</label>
                  <input
                    name="minCapacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={space.minCapacity}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Max Capacity *</label>
                  <input
                    name="maxCapacity"
                    type="number"
                    required
                    min={1}
                    defaultValue={space.maxCapacity}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Seated Capacity</label>
                  <input
                    name="seatedCapacity"
                    type="number"
                    defaultValue={space.seatedCapacity ?? ""}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Standing Capacity</label>
                  <input
                    name="standingCapacity"
                    type="number"
                    defaultValue={space.standingCapacity ?? ""}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Public-Safe Description</label>
                <textarea
                  name="publicDescription"
                  rows={2}
                  defaultValue={space.publicDescription ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Internal Notes</label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  defaultValue={space.internalNotes ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id={`space-active-${space.id}`}
                  name="isActive"
                  value="true"
                  defaultChecked={space.isActive}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor={`space-active-${space.id}`} className="text-xs text-slate-700 font-medium">
                  Active Space (surfaced in readiness and bookings)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 4c. Toggle BookableSpace Button
export function ToggleBookableSpaceButton({
  spaceId,
  venueId,
  providerOrgId,
  isActive,
}: {
  spaceId: number;
  venueId: number;
  providerOrgId: number;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleBookableSpaceAction(spaceId, !isActive, venueId, providerOrgId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
        isActive
          ? "border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
      title={isActive ? "Deactivate Space" : "Activate Space"}
    >
      <Power className="h-3 w-3" />
      {isActive ? "Active" : "Paused"}
    </button>
  );
}

// 5. Add Offering / Package Dialog
export function AddOfferingDialog({
  venueId,
  providerOrgId,
  bookableSpaces,
  triggerLabel = "Add Package / Menu",
}: {
  venueId: number;
  providerOrgId?: number;
  bookableSpaces: BookableSpaceRecord[];
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("venueId", String(venueId));
    if (providerOrgId) formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await createOfferingAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" />
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Add Package / Set Menu
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Package / Menu Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. 4-Course Executive Tasting Menu"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Offering Type *</label>
                  <select
                    name="offeringType"
                    defaultValue="SET_MENU"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="SET_MENU">Set Menu (Multi-Course)</option>
                    <option value="PER_PERSON_PACKAGE">Per-Person Package (Food + Bev)</option>
                    <option value="FIXED_EVENT_PACKAGE">Fixed Event Package</option>
                    <option value="A_LA_CARTE_MIN_SPEND">A La Carte with Minimum Spend</option>
                    <option value="BEVERAGE_PACKAGE">Beverage Pairing Package</option>
                    <option value="CUSTOM_EXPERIENCE">Custom Chef Experience</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Pricing Basis *</label>
                  <select
                    name="pricingBasis"
                    defaultValue="PER_PERSON"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="PER_PERSON">Per Person (₹ / Guest)</option>
                    <option value="FIXED_TOTAL">Fixed Total Amount (₹ Total)</option>
                    <option value="MINIMUM_SPEND_ONLY">Minimum Spend Commitment Only</option>
                    <option value="CUSTOM_QUOTE">Custom Quote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Attach to Specific Space (Optional)</label>
                <select
                  name="bookableSpaceId"
                  defaultValue=""
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                >
                  <option value="">Venue-Wide (Applies to all spaces)</option>
                  {bookableSpaces.map((space) => (
                    <option key={space.id} value={space.id}>
                      {space.name} ({space.spaceType.replace(/_/g, " ")})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Base Amount (₹ Rupees) *</label>
                  <input
                    name="baseAmountRupees"
                    type="number"
                    required
                    min={0}
                    defaultValue={3500}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Stored in integer paise</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Minimum Spend (₹ Rupees)</label>
                  <input
                    name="minimumSpendRupees"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Min Guests</label>
                  <input
                    name="minGuests"
                    type="number"
                    min={1}
                    placeholder="e.g. 4"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Max Guests</label>
                  <input
                    name="maxGuests"
                    type="number"
                    min={1}
                    placeholder="e.g. 25"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Dietary & Menu Notes</label>
                <input
                  name="dietaryNotes"
                  type="text"
                  placeholder="e.g. Jain / Vegan options available with 24h notice"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Includes welcome cocktail, 4 savory courses, dessert platter, and coffee service..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    name="taxIncluded"
                    type="checkbox"
                    value="true"
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  Taxes Included (GST & Service)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    name="isCustomQuote"
                    type="checkbox"
                    value="true"
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  Custom Quote Only
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 5b. Edit Offering Dialog
export function EditOfferingDialog({
  offering,
  venueId,
  providerOrgId,
  bookableSpaces,
}: {
  offering: OfferingRecord;
  venueId: number;
  providerOrgId: number;
  bookableSpaces: BookableSpaceRecord[];
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(offering.id));
    formData.append("venueId", String(venueId));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateOfferingAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100"
        title="Edit package"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Edit Package / Offering
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Package / Menu Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={offering.name}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Offering Type *</label>
                  <select
                    name="offeringType"
                    defaultValue={offering.offeringType}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="SET_MENU">Set Menu (Multi-Course)</option>
                    <option value="PER_PERSON_PACKAGE">Per-Person Package (Food + Bev)</option>
                    <option value="FIXED_EVENT_PACKAGE">Fixed Event Package</option>
                    <option value="A_LA_CARTE_MIN_SPEND">A La Carte with Minimum Spend</option>
                    <option value="BEVERAGE_PACKAGE">Beverage Pairing Package</option>
                    <option value="CUSTOM_EXPERIENCE">Custom Chef Experience</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Pricing Basis *</label>
                  <select
                    name="pricingBasis"
                    defaultValue={offering.pricingBasis}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                  >
                    <option value="PER_PERSON">Per Person (₹ / Guest)</option>
                    <option value="FIXED_TOTAL">Fixed Total Amount (₹ Total)</option>
                    <option value="MINIMUM_SPEND_ONLY">Minimum Spend Commitment Only</option>
                    <option value="CUSTOM_QUOTE">Custom Quote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Attach to Space</label>
                <select
                  name="bookableSpaceId"
                  defaultValue={offering.bookableSpaceId ? String(offering.bookableSpaceId) : ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white"
                >
                  <option value="">Venue-Wide (All spaces)</option>
                  {bookableSpaces.map((space) => (
                    <option key={space.id} value={space.id}>
                      {space.name} ({space.spaceType.replace(/_/g, " ")})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Base Amount (₹ Rupees) *</label>
                  <input
                    name="baseAmountRupees"
                    type="number"
                    required
                    min={0}
                    defaultValue={offering.baseAmount / 100}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Minimum Spend (₹ Rupees)</label>
                  <input
                    name="minimumSpendRupees"
                    type="number"
                    min={0}
                    defaultValue={offering.minimumSpend / 100}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Min Guests</label>
                  <input
                    name="minGuests"
                    type="number"
                    min={1}
                    defaultValue={offering.minGuests ?? ""}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Max Guests</label>
                  <input
                    name="maxGuests"
                    type="number"
                    min={1}
                    defaultValue={offering.maxGuests ?? ""}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Dietary & Menu Notes</label>
                <input
                  name="dietaryNotes"
                  type="text"
                  defaultValue={offering.dietaryNotes ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={offering.description ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    name="taxIncluded"
                    type="checkbox"
                    value="true"
                    defaultChecked={offering.taxIncluded}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  Taxes Included
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    name="isActive"
                    type="checkbox"
                    value="true"
                    defaultChecked={offering.isActive}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  Active Offering
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 5c. Toggle Offering Button
export function ToggleOfferingButton({
  offeringId,
  venueId,
  providerOrgId,
  isActive,
}: {
  offeringId: number;
  venueId: number;
  providerOrgId: number;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleOfferingAction(offeringId, !isActive, venueId, providerOrgId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
        isActive
          ? "border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
      title={isActive ? "Deactivate Offering" : "Activate Offering"}
    >
      <Power className="h-3 w-3" />
      {isActive ? "Active" : "Paused"}
    </button>
  );
}

// 6. Edit Availability Terms Dialog
export function EditAvailabilityDialog({
  venueId,
  providerOrgId,
  availability,
}: {
  venueId: number;
  providerOrgId: number;
  availability: AvailabilityMetadataRecord | null;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("venueId", String(venueId));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateAvailabilityAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded px-2 py-0.5 bg-white hover:bg-slate-50"
      >
        <Sliders className="h-3 w-3" />
        Edit Availability
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Configure Availability Terms
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`manual-confirm-${venueId}`}
                  name="requiresManualConfirmation"
                  value="true"
                  defaultChecked={availability?.requiresManualConfirmation ?? true}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor={`manual-confirm-${venueId}`} className="text-xs text-slate-700 font-semibold">
                  Requires Manual Concierge / Host Confirmation
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Advance Lead Time (Hours) *
                </label>
                <input
                  name="leadTimeHours"
                  type="number"
                  required
                  min={1}
                  max={168}
                  defaultValue={availability?.leadTimeHours ?? 24}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Minimum notice before booking event (default 24h)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Operating Days / Schedule</label>
                <input
                  name="operatingDaysNotes"
                  type="text"
                  defaultValue={availability?.operatingDaysNotes ?? ""}
                  placeholder="e.g. Tuesday–Sunday (Closed Mondays)"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Availability Guidance Notes</label>
                <textarea
                  name="availabilityNotes"
                  rows={2}
                  defaultValue={availability?.availabilityNotes ?? ""}
                  placeholder="Peak slot rules, Friday evening minimums..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Availability"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 7. Edit Cancellation Policy Dialog
export function EditCancellationPolicyDialog({
  venueId,
  providerOrgId,
  cancellation,
}: {
  venueId: number;
  providerOrgId: number;
  cancellation: CancellationPolicyRecord | null;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("venueId", String(venueId));
    formData.append("providerOrgId", String(providerOrgId));

    startTransition(async () => {
      const res = await updateCancellationPolicyAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded px-2 py-0.5 bg-white hover:bg-slate-50"
      >
        <Sliders className="h-3 w-3" />
        Edit Cancellation Terms
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Configure Cancellation Policy
            </h3>
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Policy Summary *</label>
                <textarea
                  name="summary"
                  rows={2}
                  required
                  defaultValue={
                    cancellation?.summary ??
                    "Standard corporate dining terms: 48-hour complimentary cancellation window prior to event seating."
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Complimentary Cutoff (Hours) *
                  </label>
                  <input
                    name="cutoffHours"
                    type="number"
                    required
                    min={0}
                    max={336}
                    defaultValue={cancellation?.cutoffHours ?? 48}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Deposit % (if required)</label>
                  <input
                    name="depositPercent"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={cancellation?.depositPercent ?? 0}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Cutoff Guidance Notes</label>
                <input
                  name="cutoffNotes"
                  type="text"
                  defaultValue={cancellation?.cutoffNotes ?? ""}
                  placeholder="e.g. Deposit refunded within 3-5 business days"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Cancellation Policy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 8. Record Verification Dialog
export function RecordVerificationDialog({
  providerOrgId,
  venueId,
  currentStatus,
  venueName,
  triggerLabel,
}: {
  providerOrgId?: number;
  venueId?: number;
  currentStatus: string;
  venueName?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (providerOrgId) formData.append("providerOrgId", String(providerOrgId));
    if (venueId) formData.append("venueId", String(venueId));

    startTransition(async () => {
      const res = await recordVerificationAction(null, formData);
      if (res.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
        {triggerLabel ?? (venueId ? `Verify Venue (${currentStatus})` : `Verify Provider (${currentStatus})`)}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Record Operations Verification
            </h3>
            {venueName && (
              <p className="text-xs text-slate-500 mt-1">
                Target Venue: <span className="font-semibold text-slate-800">{venueName}</span>
              </p>
            )}
            {error && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Verification Outcome *</label>
                <select
                  name="status"
                  defaultValue="VERIFIED"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none bg-white font-medium"
                >
                  <option value="VERIFIED">VERIFIED (Full Operational Clearance)</option>
                  <option value="PENDING_REVIEW">PENDING_REVIEW (Provisional / Pending Docs)</option>
                  <option value="REJECTED">REJECTED (Quality or Compliance Deficiency)</option>
                  <option value="UNVERIFIED">UNVERIFIED (Reset State)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Verification Source / Method</label>
                <input
                  name="verificationSource"
                  type="text"
                  defaultValue="PHYSICAL_SITE_INSPECTION"
                  placeholder="e.g. PHYSICAL_SITE_INSPECTION, FSSAI_AUDIT"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Audit Notes & Findings</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Checked PDR layout, sound isolation, air conditioning, menu consistency, and FSSAI license validity..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isPending ? "Recording..." : "Record Verification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 9. Sync Readiness Button
export function SyncReadinessButton({
  venueId,
  providerOrgId,
}: {
  venueId: number;
  providerOrgId?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSync = () => {
    startTransition(async () => {
      await syncVenueReadinessAction(venueId, providerOrgId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleSync}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
    >
      <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
      Re-Evaluate Readiness
    </button>
  );
}

// 10. Venue Verification Panel
export function VenueVerificationPanel({
  venueId,
  venueName,
  providerOrgId,
  verificationStatus,
  lastVerifiedAt,
  latestRecord,
}: {
  venueId: number;
  venueName: string;
  providerOrgId: number;
  verificationStatus: string;
  lastVerifiedAt: string | null;
  latestRecord?: {
    verifiedBy?: string | null;
    notes?: string | null;
    verificationSource?: string | null;
    status: string;
    verifiedAt?: string | null;
  } | null;
}) {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Verification Status</span>
          <StatusBadge status={verificationStatus} />
        </div>
        <RecordVerificationDialog
          providerOrgId={providerOrgId}
          venueId={venueId}
          currentStatus={verificationStatus}
          venueName={venueName}
        />
      </div>

      {lastVerifiedAt && (
        <p className="mt-2 text-[11px] text-slate-500">
          Last verified:{" "}
          <span className="font-semibold text-slate-700">
            {new Date(lastVerifiedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </p>
      )}

      {latestRecord && (
        <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3 space-y-1">
          <div className="flex items-center gap-2">
            <StatusBadge status={latestRecord.status} />
            {latestRecord.verificationSource && (
              <span className="text-[11px] font-semibold text-slate-600">{latestRecord.verificationSource}</span>
            )}
            {latestRecord.verifiedAt && (
              <span className="text-[11px] text-slate-400 ml-auto">
                {new Date(latestRecord.verifiedAt).toLocaleDateString("en-IN")}
              </span>
            )}
          </div>
          {latestRecord.verifiedBy && (
            <p className="text-[11px] text-slate-500">Verified by: {latestRecord.verifiedBy}</p>
          )}
          {latestRecord.notes && (
            <p className="text-[11px] text-slate-700 mt-1 leading-snug">{latestRecord.notes}</p>
          )}
        </div>
      )}

      {(verificationStatus === "UNVERIFIED" || verificationStatus === "REJECTED") && (
        <p className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5">
          <span className="font-semibold">Action required:</span> Record a verification audit before this venue can be promoted to DISCOVERABLE.
        </p>
      )}
    </div>
  );
}

// 11. Venue Visibility Control
export function UpdateVenueVisibilityControl({
  venueId,
  providerOrgId,
  currentVisibility,
}: {
  venueId: number;
  providerOrgId: number;
  currentVisibility: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (newVisibility: string) => {
    setError(null);
    setSuccessMsg(null);
    const formData = new FormData();
    formData.append("venueId", String(venueId));
    formData.append("providerOrgId", String(providerOrgId));
    formData.append("visibility", newVisibility);

    startTransition(async () => {
      const res = await updateVenueVisibilityAction(null, formData);
      if (res.success) {
        setSuccessMsg(res.message ?? "Visibility updated.");
        setTimeout(() => {
          setSuccessMsg(null);
          router.refresh();
        }, 1500);
      } else {
        setError(res.error);
      }
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={currentVisibility}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
      >
        <option value="DRAFT">Draft</option>
        <option value="INTERNAL_ONLY">Internal Only</option>
        <option value="DISCOVERABLE">Discoverable</option>
        <option value="PAUSED">Paused</option>
        <option value="ARCHIVED">Archived</option>
      </select>
      {isPending && <span className="text-[11px] text-slate-400">Saving...</span>}
      {successMsg && <span className="text-[11px] text-emerald-600 font-medium">{successMsg}</span>}
      {error && <span className="text-[11px] text-rose-600 font-medium">{error}</span>}
    </div>
  );
}

// 12. Main Provider Detail View Layout
export function ProviderDetailView({ data }: { data: ProviderDetailHierarchy }) {
  const { provider, contacts, documents, venues, verificationRecords } = data;
  const [activeTab, setActiveTab] = useState<"venues" | "contacts" | "compliance">("venues");

  // Aggregate metrics
  const totalVenues = venues.length;
  const totalActiveSpaces = venues.reduce(
    (acc, v) => acc + v.bookableSpaces.filter((s) => s.isActive && s.status === "ACTIVE").length,
    0,
  );
  const totalActiveOfferings = venues.reduce(
    (acc, v) => acc + v.offerings.filter((o) => o.isActive).length,
    0,
  );
  const eligibleVenuesCount = venues.filter((v) => v.readiness.isEligible).length;
  const primaryContact = contacts.find((c) => c.isActive) ?? contacts[0] ?? null;

  return (
    <div className="space-y-6">
      {/* Provider Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Provider #{provider.id}
              </span>
              <StatusBadge status={provider.status} />
              <StatusBadge status={provider.onboardingStatus} />
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                <MapPin className="h-3 w-3 text-slate-400" />
                {provider.city}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {provider.name}
            </h1>
            {provider.legalName && (
              <p className="text-xs text-slate-500 mt-0.5">
                Legal Entity: <span className="font-medium text-slate-700">{provider.legalName}</span> · Type: {provider.providerType}
              </p>
            )}

            {/* Overview Metric Pills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1">
                <Building2 className="h-3.5 w-3.5 text-slate-500" />
                <strong className="text-slate-900">{totalVenues}</strong> Venues
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1">
                <Sliders className="h-3.5 w-3.5 text-slate-500" />
                <strong className="text-slate-900">{totalActiveSpaces}</strong> Active Spaces
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <strong className="text-slate-900">{totalActiveOfferings}</strong> Active Offerings
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <strong className="text-slate-900">{eligibleVenuesCount}/{totalVenues}</strong> Discoverable
              </span>
              {primaryContact && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Primary: <strong className="text-slate-900">{primaryContact.name}</strong> ({primaryContact.role})
                </span>
              )}
            </div>

            {provider.internalNotes && (
              <div className="mt-3 rounded-lg bg-amber-50/70 p-2.5 text-xs text-amber-900 border border-amber-200/60 max-w-2xl flex items-start gap-2">
                <Lock className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Internal Operator Note:</span> {provider.internalNotes}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <EditProviderDialog provider={provider} />
            <RecordVerificationDialog providerOrgId={provider.id} currentStatus={provider.status} />
            <AddVenueDialog providerOrgId={provider.id} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex border-b border-slate-100 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("venues")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "venues"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Venues & Bookable Spaces ({venues.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "contacts"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Contacts & Operations ({contacts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compliance")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "compliance"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Verification & Compliance ({documents.length} Docs · {verificationRecords.length} Audits)
          </button>
        </div>
      </div>

      {/* Tab Content: Venues */}
      {activeTab === "venues" && (
        <div className="space-y-6">
          {venues.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Building2 className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-2 text-sm font-bold text-slate-900">No Venues Added Yet</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Add a physical venue (e.g. restaurant, ballroom, private dining floor) to begin configuring bookable spaces and packages.
              </p>
              <div className="mt-4">
                <AddVenueDialog providerOrgId={provider.id} />
              </div>
            </div>
          ) : (
            venues.map(({ venue, readiness, bookableSpaces, offerings, availability, cancellation }) => (
              <div
                key={venue.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6"
              >
                {/* Venue Header Bar */}
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Venue #{venue.id}
                      </span>
                      <StatusBadge status={venue.visibility} />
                      <StatusBadge status={venue.verificationStatus} />
                      {venue.locality && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          <MapPin className="h-3 w-3" />
                          {venue.locality}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-1.5 text-xl font-bold text-slate-900">{venue.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {venue.cuisine} · Price Band: <span className="font-semibold text-slate-700">{venue.priceBand}</span> · Capacity: Up to {venue.capacity} guests
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <EditVenueDialog venue={venue} providerOrgId={provider.id} />
                    <UpdateVenueVisibilityControl
                      venueId={venue.id}
                      providerOrgId={provider.id}
                      currentVisibility={venue.visibility}
                    />
                    <SyncReadinessButton venueId={venue.id} providerOrgId={provider.id} />
                    <AddBookableSpaceDialog venueId={venue.id} providerOrgId={provider.id} />
                    <AddOfferingDialog
                      venueId={venue.id}
                      providerOrgId={provider.id}
                      bookableSpaces={bookableSpaces}
                    />
                  </div>
                </div>

                {/* Discovery Readiness Inspection Scorecard */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Discovery Readiness Engine
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-500 font-medium">Readiness Score: </span>
                        <span className="text-xs font-bold text-slate-900">{readiness.score}%</span>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          readiness.isEligible
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {readiness.isEligible ? "ELIGIBLE FOR DISCOVERY" : "READINESS BLOCKED"}
                      </span>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {readiness.checks.map((check) => (
                      <div
                        key={check.id}
                        className="flex items-start gap-2 rounded-lg bg-white p-2 border border-slate-200/70"
                      >
                        {check.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : check.critical ? (
                          <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <p className="font-semibold text-slate-800">{check.name}</p>
                            {!check.passed && check.id === "identity_fields" && (
                              <EditVenueDialog venue={venue} providerOrgId={provider.id} triggerLabel="Fix" />
                            )}
                            {!check.passed && check.id === "address_info" && (
                              <EditVenueDialog venue={venue} providerOrgId={provider.id} triggerLabel="Add Area" />
                            )}
                            {!check.passed && check.id === "bookable_spaces" && (
                              <AddBookableSpaceDialog venueId={venue.id} providerOrgId={provider.id} triggerLabel="+ Space" />
                            )}
                            {!check.passed && check.id === "pricing_integrity" && (
                              <AddOfferingDialog venueId={venue.id} providerOrgId={provider.id} bookableSpaces={bookableSpaces} triggerLabel="+ Package" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {readiness.blockers.length > 0 && (
                    <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                      <span className="font-bold">Required Actions to Unlock Discovery:</span>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                        {readiness.blockers.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Per-venue verification panel — inline below blockers */}
                  <VenueVerificationPanel
                    venueId={venue.id}
                    venueName={venue.name}
                    providerOrgId={provider.id}
                    verificationStatus={venue.verificationStatus}
                    lastVerifiedAt={venue.lastVerifiedAt ?? null}
                    latestRecord={
                      verificationRecords
                        .filter((r) => r.venueId === venue.id)
                        .sort((a, b) =>
                          new Date(b.verifiedAt ?? b.createdAt).getTime() -
                          new Date(a.verifiedAt ?? a.createdAt).getTime(),
                        )[0] ?? null
                    }
                  />
                </div>

                {/* Bookable Spaces Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Bookable Spaces ({bookableSpaces.length})
                    </h3>
                    <AddBookableSpaceDialog venueId={venue.id} providerOrgId={provider.id} />
                  </div>

                  {bookableSpaces.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 bg-slate-50/50">
                      No Bookable Spaces added. Add a Private Dining Room, Terrace, or Boardroom to allow corporate seatings.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {bookableSpaces.map((space) => (
                        <div
                          key={space.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {space.spaceType.replace(/_/g, " ")}
                              </span>
                              <div className="flex items-center gap-1">
                                <ToggleBookableSpaceButton
                                  spaceId={space.id}
                                  venueId={venue.id}
                                  providerOrgId={provider.id}
                                  isActive={space.isActive}
                                />
                                <EditBookableSpaceDialog
                                  space={space}
                                  venueId={venue.id}
                                  providerOrgId={provider.id}
                                />
                              </div>
                            </div>
                            <h4 className="mt-2 text-sm font-bold text-slate-900">{space.name}</h4>
                            <p className="text-xs text-slate-600 mt-1">
                              Capacity: <span className="font-semibold">{space.minCapacity} – {space.maxCapacity} guests</span>
                            </p>
                            {space.privacyLevel && (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Privacy: {space.privacyLevel}
                              </p>
                            )}
                            {space.publicDescription && (
                              <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                                {space.publicDescription}
                              </p>
                            )}
                          </div>

                          {space.internalNotes && (
                            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-amber-800 bg-amber-50/50 p-1.5 rounded">
                              <span className="font-bold">Internal:</span> {space.internalNotes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Offerings and Packages */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Offerings & Fixed Packages ({offerings.length})
                    </h3>
                    <AddOfferingDialog
                      venueId={venue.id}
                      providerOrgId={provider.id}
                      bookableSpaces={bookableSpaces}
                    />
                  </div>

                  {offerings.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 bg-slate-50/50">
                      No packages attached. Add set menus or per-person packages for direct enterprise quote calculation.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {offerings.map((offering) => (
                        <div
                          key={offering.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                {offering.offeringType.replace(/_/g, " ")}
                              </span>
                              <div className="flex items-center gap-1">
                                <ToggleOfferingButton
                                  offeringId={offering.id}
                                  venueId={venue.id}
                                  providerOrgId={provider.id}
                                  isActive={offering.isActive}
                                />
                                <EditOfferingDialog
                                  offering={offering}
                                  venueId={venue.id}
                                  providerOrgId={provider.id}
                                  bookableSpaces={bookableSpaces}
                                />
                              </div>
                            </div>
                            <div className="mt-2 flex items-baseline justify-between">
                              <h4 className="text-sm font-bold text-slate-900">{offering.name}</h4>
                              <span className="text-xs font-bold text-slate-900">
                                ₹{(offering.baseAmount / 100).toLocaleString("en-IN")}{" "}
                                {offering.pricingBasis === "PER_PERSON" ? "/ guest" : "total"}
                              </span>
                            </div>
                            {offering.minimumSpend > 0 && (
                              <p className="text-xs text-slate-500 mt-0.5">
                                Min Spend: ₹{(offering.minimumSpend / 100).toLocaleString("en-IN")}
                              </p>
                            )}
                            {offering.dietaryNotes && (
                              <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                                {offering.dietaryNotes}
                              </p>
                            )}
                            {offering.description && (
                              <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">
                                {offering.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Availability & Cancellation Terms Governance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                        Availability Governance
                      </span>
                      <EditAvailabilityDialog
                        venueId={venue.id}
                        providerOrgId={provider.id}
                        availability={availability}
                      />
                    </div>
                    <p className="text-slate-600">
                      Manual Confirmation Required:{" "}
                      <span className="font-semibold text-slate-800">
                        {availability?.requiresManualConfirmation ? "Yes (Safe Concierge Flow)" : "No"}
                      </span>
                    </p>
                    <p className="text-slate-600">
                      Advance Lead Time:{" "}
                      <span className="font-semibold text-slate-800">
                        {availability?.leadTimeHours ?? 24} hours
                      </span>
                    </p>
                    {availability?.operatingDaysNotes && (
                      <p className="text-slate-600">
                        Schedule: <span className="font-medium">{availability.operatingDaysNotes}</span>
                      </p>
                    )}
                    {availability?.availabilityNotes && (
                      <p className="text-slate-500 text-[11px] mt-1 italic">{availability.availabilityNotes}</p>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                        Cancellation Governance
                      </span>
                      <EditCancellationPolicyDialog
                        venueId={venue.id}
                        providerOrgId={provider.id}
                        cancellation={cancellation}
                      />
                    </div>
                    <p className="text-slate-600">
                      Summary:{" "}
                      <span className="font-semibold text-slate-800">
                        {cancellation?.summary ?? "Standard 48-hour complimentary cancellation window."}
                      </span>
                    </p>
                    <p className="text-slate-600">
                      Complimentary Cutoff:{" "}
                      <span className="font-semibold text-slate-800">
                        {cancellation?.cutoffHours ?? 48} hours prior
                      </span>
                    </p>
                    {cancellation?.depositRequired && (
                      <p className="text-slate-600">
                        Deposit Required:{" "}
                        <span className="font-semibold text-slate-800">{cancellation.depositPercent}%</span>
                      </p>
                    )}
                    {cancellation?.cutoffNotes && (
                      <p className="text-slate-500 text-[11px] mt-1 italic">{cancellation.cutoffNotes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Contacts */}
      {activeTab === "contacts" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Provider Key Contacts & Operations</h3>
              <p className="text-xs text-slate-500">
                Authorized hospitality managers, event concierges, and billing contacts.
              </p>
            </div>
            <AddContactDialog providerOrgId={provider.id} />
          </div>

          {contacts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No contacts recorded. Add operations or sales contacts for reservation coordination.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {contacts.map((c) => (
                <div key={c.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{c.name}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      {!c.isActive && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{c.role}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3 w-3 text-slate-400" />
                        {c.email}
                      </span>
                      {c.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {c.phone}
                        </span>
                      )}
                    </div>
                    {c.internalNotes && (
                      <p className="text-[11px] text-amber-700 bg-amber-50/50 px-2 py-0.5 rounded mt-1.5 inline-block">
                        Note: {c.internalNotes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Preferred: {c.preferredContactMethod}</span>
                    <ToggleContactButton
                      contactId={c.id}
                      providerOrgId={provider.id}
                      isActive={c.isActive}
                    />
                    <EditContactDialog contact={c} providerOrgId={provider.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Compliance & Documents */}
      {activeTab === "compliance" && (
        <div className="space-y-6">
          {/* Documents Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Internal Compliance & Statutory Documents
            </h3>
            {documents.length === 0 ? (
              <p className="text-xs text-slate-500">No documents recorded.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="rounded-xl border border-slate-200 p-3 text-xs bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{doc.title}</span>
                      <StatusBadge status={doc.reviewStatus} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Type: {doc.docType.replace(/_/g, " ")}</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">Ref: {doc.fileReference}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verification Audit Records */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Verification Audit History
            </h3>
            {verificationRecords.length === 0 ? (
              <p className="text-xs text-slate-500">No verification audits recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {verificationRecords.map((audit) => (
                  <div key={audit.id} className="rounded-xl border border-slate-200 p-3.5 text-xs bg-white space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={audit.status} />
                        <span className="font-semibold text-slate-800">{audit.verificationSource ?? "Operational Audit"}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">
                        {audit.verifiedAt ? new Date(audit.verifiedAt).toLocaleDateString("en-IN") : "Pending"}
                      </span>
                    </div>
                    {audit.verifiedBy && (
                      <p className="text-slate-500 text-[11px]">Audited by: {audit.verifiedBy}</p>
                    )}
                    {audit.notes && (
                      <p className="text-slate-700 mt-1 text-[11px]">{audit.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
