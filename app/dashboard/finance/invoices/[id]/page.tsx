import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireUserRole } from "@/lib/auth";
import { getInvoiceById } from "@/lib/finance/get-invoice-by-id";
import { InvoiceDetailCard } from "@/components/finance/invoice-detail-card";
import { PrintInvoiceButton } from "@/components/finance/print-invoice-button";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Validate parameter segment is integer
  const invoiceId = Number(id);
  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    notFound();
  }

  // 2. Authorize: FINANCE and ADMIN roles only
  const user = await requireUserRole(["FINANCE", "ADMIN"]);

  // 3. Fetch invoice safely within company scope (tenant isolation)
  const invoice = await getInvoiceById(invoiceId, user.companyId);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Top Header / Actions Bar (hidden when printing) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 print:hidden">
        <div>
          <Link
            href="/dashboard/finance"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Finance Dashboard
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tax Invoice
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {invoice.invoiceNumber}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.company.name} · Booking #{invoice.booking.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PrintInvoiceButton />
        </div>
      </div>

      {/* Main Printable Invoice Card */}
      <InvoiceDetailCard invoice={invoice} />
    </div>
  );
}
