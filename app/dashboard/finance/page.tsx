import { requireUserRole } from "@/lib/auth";
import { getFinanceDashboardData } from "@/lib/finance/get-finance-dashboard-data";
import { FinanceKpiCards } from "@/components/finance/finance-kpi-cards";
import { FinanceRecordsTable } from "@/components/finance/finance-records-table";

export default async function FinancePage() {
  // 1. Authorize: FINANCE, COMPANY_ADMIN, and ADMIN roles
  const user = await requireUserRole(["FINANCE", "COMPANY_ADMIN", "ADMIN"]);

  // 2. Fetch tenant-isolated finance data & metrics
  const { metrics, records } = await getFinanceDashboardData(user.companyId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Financial Operations
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Finance &amp; Invoices
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor corporate event bookings, GST invoices, and settlement status for{" "}
          <strong className="text-slate-700">{user.company.name}</strong>.
        </p>
      </div>

      {/* Overview KPI Cards */}
      <FinanceKpiCards metrics={metrics} />

      {/* Main Records Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Billing &amp; Invoice Records
          </h2>
          <span className="text-xs text-slate-500">
            {records.length} record{records.length === 1 ? "" : "s"} total
          </span>
        </div>

        <FinanceRecordsTable records={records} />
      </div>
    </div>
  );
}
