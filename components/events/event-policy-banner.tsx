import { formatRupees } from "@/lib/events/event-helpers";

type PolicyBannerProps = {
  allowedCities: readonly string[];
  maxBudget: number;
  perPersonCap: number;
};

export function EventPolicyBanner({
  allowedCities,
  maxBudget,
  perPersonCap,
}: PolicyBannerProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Company Policy Compliance Guidance
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-600">
        <div>
          <span className="font-semibold text-slate-800">Allowed Cities:</span>{" "}
          <span className="text-slate-700">{allowedCities.join(", ")}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-800">Max Budget Cap:</span>{" "}
          <span className="text-slate-700">{formatRupees(maxBudget)}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-800">Per-Person Cap:</span>{" "}
          <span className="text-slate-700">{formatRupees(perPersonCap)}</span>
        </div>
      </div>
    </div>
  );
}
