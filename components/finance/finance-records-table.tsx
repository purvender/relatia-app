"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  AlertCircle,
  Inbox,
  Building2,
  MapPin,
} from "lucide-react";
import { formatRupees, formatEventDateTime, getEventStatusBadgeConfig } from "@/lib/events/event-helpers";
import type { FinanceRecord } from "@/lib/finance/get-finance-dashboard-data";

type FinanceRecordsTableProps = {
  records: FinanceRecord[];
};

function getPaymentStatusBadge(status: string | null) {
  if (!status) return <span className="text-slate-400 text-xs">—</span>;

  switch (status.toUpperCase()) {
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3" />
          Paid
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
          <Clock className="h-3 w-3" />
          Payment Pending
        </span>
      );
    case "FAILED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
          <AlertCircle className="h-3 w-3" />
          Failed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
          {status}
        </span>
      );
  }
}

function getInvoiceStatusBadge(status: string | null) {
  if (!status) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 border border-slate-200">
        No Invoice
      </span>
    );
  }

  switch (status.toUpperCase()) {
    case "ISSUED":
      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
          Issued
        </span>
      );
    case "PAID":
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
          Paid
        </span>
      );
    case "CANCELLED":
      return (
        <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 border border-rose-200">
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200">
          {status}
        </span>
      );
  }
}

export function FinanceRecordsTable({ records }: FinanceRecordsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("ALL");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("ALL");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = rec.eventTitle.toLowerCase().includes(q);
        const matchesVenue = rec.venueName?.toLowerCase().includes(q) ?? false;
        const matchesInvoice = rec.invoiceNumber?.toLowerCase().includes(q) ?? false;
        const matchesCity = rec.eventCity.toLowerCase().includes(q);
        if (!matchesTitle && !matchesVenue && !matchesInvoice && !matchesCity) {
          return false;
        }
      }

      // 2. Event status filter
      if (eventStatusFilter !== "ALL" && rec.eventStatus !== eventStatusFilter) {
        return false;
      }

      // 3. Invoice status filter
      if (invoiceStatusFilter !== "ALL") {
        if (invoiceStatusFilter === "NO_INVOICE" && rec.invoiceId != null) {
          return false;
        }
        if (invoiceStatusFilter !== "NO_INVOICE" && rec.invoiceStatus !== invoiceStatusFilter) {
          return false;
        }
      }

      // 4. Payment status filter
      if (paymentStatusFilter !== "ALL" && rec.paymentStatus !== paymentStatusFilter) {
        return false;
      }

      return true;
    });
  }, [records, searchQuery, eventStatusFilter, invoiceStatusFilter, paymentStatusFilter]);

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-2xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Inbox className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          No Finance Records Yet
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
          No events have reached venue selection or invoice creation yet. Once a venue is selected for an approved event, billing records will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search + Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by event, venue, city, or invoice #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs placeholder:text-slate-400 text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Filters:</span>
          </div>

          {/* Event Status */}
          <select
            value={eventStatusFilter}
            onChange={(e) => setEventStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
          >
            <option value="ALL">All Event Statuses</option>
            <option value="VENUE_SELECTED">Venue Selected</option>
            <option value="BOOKING_REQUESTED">Booking Requested</option>
            <option value="BOOKED">Booked</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {/* Invoice Status */}
          <select
            value={invoiceStatusFilter}
            onChange={(e) => setInvoiceStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
          >
            <option value="ALL">All Invoice Statuses</option>
            <option value="ISSUED">Issued</option>
            <option value="PAID">Paid</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_INVOICE">No Invoice Yet</option>
          </select>

          {/* Payment Status */}
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Event &amp; Venue</th>
                <th className="px-4 py-3">Event Status</th>
                <th className="px-4 py-3">Invoice Number</th>
                <th className="px-4 py-3 text-right">Base Amount</th>
                <th className="px-4 py-3 text-right">GST Total</th>
                <th className="px-4 py-3 text-right">Total Amount</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No finance records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => {
                  const eventBadge = getEventStatusBadgeConfig(rec.eventStatus);
                  const gstTotalPaise =
                    (rec.cgstAmount ?? 0) +
                    (rec.sgstAmount ?? 0) +
                    (rec.igstAmount ?? 0);

                  return (
                    <tr
                      key={rec.eventId}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Event & Venue */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <Link
                            href={`/events/${rec.eventId}`}
                            className="hover:text-purple-700 transition-colors"
                          >
                            {rec.eventTitle}
                          </Link>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-slate-400" />
                            {rec.venueName ?? "Venue Pending"}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {rec.eventCity}
                          </span>
                        </div>
                      </td>

                      {/* Event Status */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${eventBadge.className}`}
                        >
                          {eventBadge.label}
                        </span>
                      </td>

                      {/* Invoice # & Status */}
                      <td className="px-4 py-3.5">
                        {rec.invoiceNumber ? (
                          <div>
                            <div className="font-mono font-semibold text-slate-800 flex items-center gap-1">
                              <FileText className="h-3 w-3 text-slate-400" />
                              <span>{rec.invoiceNumber}</span>
                            </div>
                            <div className="mt-0.5">
                              {getInvoiceStatusBadge(rec.invoiceStatus)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-400 text-xs italic">
                            No invoice issued
                          </div>
                        )}
                      </td>

                      {/* Base Amount */}
                      <td className="px-4 py-3.5 text-right font-medium text-slate-800">
                        {rec.baseAmount != null ? (
                          formatRupees(rec.baseAmount)
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* GST Total */}
                      <td className="px-4 py-3.5 text-right text-slate-600">
                        {rec.invoiceId != null ? (
                          formatRupees(gstTotalPaise)
                        ) : rec.bookingTaxAmount != null ? (
                          <span className="text-slate-400">
                            {formatRupees(rec.bookingTaxAmount)}{" "}
                            <span className="text-[10px]">(est)</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Total Amount */}
                      <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                        {rec.totalAmount != null ? (
                          formatRupees(rec.totalAmount)
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Payment Status */}
                      <td className="px-4 py-3.5">
                        {getPaymentStatusBadge(rec.paymentStatus)}
                      </td>

                      {/* Row Actions */}
                      <td className="px-4 py-3.5 text-right space-x-2">
                        <Link
                          href={`/events/${rec.eventId}`}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                        >
                          <span>Event</span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </Link>

                        {rec.invoiceId ? (
                          <Link
                            href={`/dashboard/finance/invoices/${rec.invoiceId}`}
                            className="inline-flex items-center gap-1 rounded-md border border-purple-200 bg-purple-50/60 px-2.5 py-1 text-[11px] font-semibold text-purple-700 hover:bg-purple-100 transition"
                          >
                            <span>Invoice</span>
                            <FileText className="h-3 w-3 text-purple-500" />
                          </Link>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary */}
        <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredRecords.length}</strong> of{" "}
            <strong className="text-slate-800">{records.length}</strong> finance records
          </span>
          <span className="text-[11px]">
            Relatia Corporate Finance · GST Compliant (INR Paise Engine)
          </span>
        </div>
      </div>
    </div>
  );
}
