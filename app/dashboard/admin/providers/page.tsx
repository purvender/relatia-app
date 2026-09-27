import Link from "next/link";
import { Building2, ChevronRight, MapPin } from "lucide-react";
import { requirePlatformAdmin } from "@/lib/auth";
import { getProviderOrganizations } from "@/lib/provider/service";
import {
  CreateProviderDialog,
  StatusBadge,
} from "@/components/provider/provider-components";

export default async function ProviderAdminListPage() {
  // Only internal PLATFORM_ADMIN role can access provider domain administration
  await requirePlatformAdmin();
  const providers = await getProviderOrganizations();


  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Operations & Supply Management
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Hospitality Provider Organizations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Internal onboarding foundation for restaurants, clubs, hotels, and event spaces.
          </p>
        </div>

        <CreateProviderDialog />
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Providers
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{providers.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Verified Partners
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {providers.filter((p) => p.status === "VERIFIED").length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Venues
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {providers.reduce((acc, p) => acc + p.venueCount, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Bookable Spaces
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {providers.reduce((acc, p) => acc + p.spaceCount, 0)}
          </p>
        </div>
      </div>

      {/* Providers Table / List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Registered Provider Network</h2>
          <span className="text-xs text-slate-500 font-medium">
            {providers.length} provider organizations
          </span>
        </div>

        {providers.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-2 text-sm font-bold text-slate-900">No Providers Onboarded Yet</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Start by onboarding your first Gurugram / Delhi-NCR hospitality provider organization.
            </p>
            <div className="mt-4">
              <CreateProviderDialog />
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {providers.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/admin/providers/${p.id}`}
                className="group flex items-center justify-between p-5 hover:bg-slate-50/80 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </span>
                    <StatusBadge status={p.status} />
                    <StatusBadge status={p.onboardingStatus} />
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {p.city}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span>
                      Type: <strong className="text-slate-700 font-medium">{p.providerType}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Venues: <strong className="text-slate-700 font-medium">{p.venueCount}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Bookable Spaces: <strong className="text-slate-700 font-medium">{p.spaceCount}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Contacts: <strong className="text-slate-700 font-medium">{p.contactCount}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-700">
                  <span className="text-xs font-semibold hidden sm:inline">Manage Provider</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
