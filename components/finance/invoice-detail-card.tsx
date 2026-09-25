import { Building2, Calendar, MapPin, Users, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { formatRupees, formatEventDateTime } from "@/lib/events/event-helpers";
import type { InvoiceDetail } from "@/lib/finance/get-invoice-by-id";

type InvoiceDetailCardProps = {
  invoice: InvoiceDetail;
};

function getPaymentStatusBadge(status: string) {
  switch (status.toUpperCase()) {
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Paid
        </span>
      );
    case "PENDING":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
          <Clock className="h-3.5 w-3.5" />
          Payment Pending
        </span>
      );
  }
}

function getInvoiceStatusBadge(status: string) {
  switch (status.toUpperCase()) {
    case "ISSUED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
          Issued
        </span>
      );
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          Paid
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
          {status}
        </span>
      );
  }
}

export function InvoiceDetailCard({ invoice }: InvoiceDetailCardProps) {
  const isIntraState = invoice.cgstAmount > 0 || invoice.sgstAmount > 0;
  const totalGst = invoice.cgstAmount + invoice.sgstAmount + invoice.igstAmount;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
      {/* Top Document Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Relatia
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Corporate Events &amp; Venue Operations Platform
          </p>
        </div>

        <div className="sm:text-right">
          <div className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Tax Invoice
          </div>
          <h2 className="mt-2 text-xl font-mono font-bold text-slate-900">
            {invoice.invoiceNumber}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Issued: {formatEventDateTime(invoice.issuedAt)}
          </p>
          <div className="mt-3 flex items-center gap-2 sm:justify-end">
            {getInvoiceStatusBadge(invoice.status)}
            {getPaymentStatusBadge(invoice.booking.paymentStatus)}
          </div>
        </div>
      </div>

      {/* Supplier & Recipient Addresses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 py-8 border-b border-slate-200 text-xs">
        {/* Supplier (Billed From) */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Billed From (Supplier)
          </span>
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <p className="font-bold text-sm text-slate-900">
              {invoice.venue?.name ?? `Venue #${invoice.booking.id}`}
            </p>
            {invoice.venue?.address && (
              <p className="text-slate-600">{invoice.venue.address}</p>
            )}
            <p className="text-slate-600 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              {invoice.venue?.city ?? invoice.event.city}
            </p>
            <div className="pt-2 border-t border-slate-200/60 mt-2">
              <span className="font-mono text-[11px] text-slate-700 font-semibold">
                GSTIN: {invoice.supplierGstin}
              </span>
            </div>
          </div>
        </div>

        {/* Recipient (Billed To) */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Billed To (Corporate Recipient)
          </span>
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 space-y-1">
            <p className="font-bold text-sm text-slate-900">
              {invoice.company.name}
            </p>
            <p className="text-slate-600 font-medium">
              Event: {invoice.event.title} (#{invoice.event.id})
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-400" />
                {formatEventDateTime(invoice.event.dateTime)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 text-slate-400" />
                {invoice.event.attendees} attendees
              </span>
            </p>
            <div className="pt-2 border-t border-slate-200/60 mt-2">
              <span className="font-mono text-[11px] text-slate-700 font-semibold">
                GSTIN: {invoice.recipientGstin}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Invoice Table */}
      <div className="py-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Services &amp; Charges Summary
        </h3>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-center">Tax Type</th>
                <th className="px-4 py-3 text-right">Base Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-4">
                  <p className="font-bold text-slate-900">
                    Venue Reservation &amp; Corporate Catering Package
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {invoice.event.title} at {invoice.venue?.name ?? "Selected Venue"} (
                    {invoice.event.city}) · Booking #{invoice.booking.id}
                  </p>
                </td>
                <td className="px-4 py-4 text-center font-medium text-slate-600">
                  {isIntraState ? "CGST (9%) + SGST (9%)" : "IGST (18%)"}
                </td>
                <td className="px-4 py-4 text-right font-bold text-slate-900 text-sm">
                  {formatRupees(invoice.baseAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Calculations Breakdown */}
      <div className="flex flex-col sm:flex-row sm:justify-end border-t border-slate-200 pt-6">
        <div className="w-full sm:w-80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal (Base Amount)</span>
            <span className="font-medium text-slate-900">
              {formatRupees(invoice.baseAmount)}
            </span>
          </div>

          {isIntraState ? (
            <>
              <div className="flex items-center justify-between text-slate-600">
                <span>Central GST (CGST @ 9%)</span>
                <span className="font-medium text-slate-900">
                  {formatRupees(invoice.cgstAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>State GST (SGST @ 9%)</span>
                <span className="font-medium text-slate-900">
                  {formatRupees(invoice.sgstAmount)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between text-slate-600">
              <span>Integrated GST (IGST @ 18%)</span>
              <span className="font-medium text-slate-900">
                {formatRupees(invoice.igstAmount)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
            <span>Total GST Tax Amount</span>
            <span className="font-semibold text-slate-900">
              {formatRupees(totalGst)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-3 border-t-2 border-slate-900">
            <span>Grand Total (INR)</span>
            <span className="text-base text-purple-900">
              {formatRupees(invoice.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Footer / Terms */}
      <div className="mt-10 rounded-lg border border-slate-100 bg-slate-50/60 p-4 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-700" />
          <span>GST Compliance Declaration</span>
        </div>
        <p>
          This is a computer-generated tax invoice issued via Relatia Corporate Events Platform.
          All amounts are recorded in exact integer paise values. Payment settlement is handled per corporate procurement policies.
        </p>
      </div>
    </div>
  );
}
