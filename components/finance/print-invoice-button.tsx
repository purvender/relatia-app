"use client";

import { Printer } from "lucide-react";

export function PrintInvoiceButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      id="print-invoice-btn"
      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 print:hidden"
    >
      <Printer className="h-4 w-4" />
      <span>Print Invoice</span>
    </button>
  );
}
