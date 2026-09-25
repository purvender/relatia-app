import { Receipt, Clock, SendHorizonal, IndianRupee } from "lucide-react";
import { formatRupees } from "@/lib/events/event-helpers";
import type { FinanceDashboardMetrics } from "@/lib/finance/get-finance-dashboard-data";

type FinanceKpiCardsProps = {
  metrics: FinanceDashboardMetrics;
};

export function FinanceKpiCards({ metrics }: FinanceKpiCardsProps) {
  const cards = [
    {
      title: "Booking Requests",
      value: metrics.totalBookingRequests.toLocaleString("en-IN"),
      description: "Awaiting finance processing",
      icon: SendHorizonal,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Invoices Issued",
      value: metrics.totalInvoicesIssued.toLocaleString("en-IN"),
      description: "GST tax invoices generated",
      icon: Receipt,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Pending Payments",
      value: metrics.pendingPaymentCount.toLocaleString("en-IN"),
      description: "Awaiting payment settlement",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Total Invoiced Volume",
      value: formatRupees(metrics.totalInvoicedAmount),
      description: "Base venue cost + GST",
      icon: IndianRupee,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg border ${card.color}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
              </div>
            </div>

            <div className="mt-3">
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
