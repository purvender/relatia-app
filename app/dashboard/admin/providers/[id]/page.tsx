import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requirePlatformAdmin } from "@/lib/auth";
import { getProviderOrganizationById } from "@/lib/provider/service";
import { ProviderDetailView } from "@/components/provider/provider-components";

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const providerId = Number(id);

  if (!Number.isInteger(providerId) || providerId <= 0) {
    notFound();
  }

  // Strictly protected for internal platform admins
  await requirePlatformAdmin();

  const providerData = await getProviderOrganizationById(providerId);
  if (!providerData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div>
        <Link
          href="/dashboard/admin/providers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Provider Network
        </Link>
      </div>

      {/* Main Hierarchical Provider Management Component */}
      <ProviderDetailView data={providerData} />
    </div>
  );
}
