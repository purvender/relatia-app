/**
 * Formats a monetary amount stored in paise to an Indian Rupee string.
 * e.g., 4000000 -> "₹40,000"
 */
export function formatRupees(paiseAmount: number): string {
  const rupees = paiseAmount / 100;
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/**
 * Formats an ISO date-time string into a human-readable Indian locale format.
 */
export function formatEventDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  if (Number.isNaN(date.getTime())) return dateTimeStr;
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

type StatusBadgeConfig = {
  label: string;
  className: string;
};

/**
 * Maps EventStatus values to clean B2B Tailwind badge styles.
 */
export function getEventStatusBadgeConfig(status: string): StatusBadgeConfig {
  switch (status) {
    case "DRAFT":
      return {
        label: "Draft",
        className: "bg-slate-100 text-slate-700 border-slate-200",
      };
    case "REQUESTED":
      return {
        label: "Requested",
        className: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "APPROVED":
      return {
        label: "Approved",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case "REJECTED":
      return {
        label: "Rejected",
        className: "bg-rose-50 text-rose-700 border-rose-200",
      };
    case "BOOKED":
      return {
        label: "Booked",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        className: "bg-indigo-50 text-indigo-700 border-indigo-200",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        className: "bg-slate-100 text-slate-500 border-slate-200",
      };
    default:
      return {
        label: status,
        className: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
}
