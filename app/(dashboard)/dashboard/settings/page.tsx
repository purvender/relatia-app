import { requireUserRole } from "@/lib/auth";
import { db } from "@/prisma/db";

export default async function SettingsPage() {
  const user = await requireUserRole(["ADMIN"]);

  const policy = await db.orm.public.Policy.where({
    companyId: user.companyId,
  }).first();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Administration
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Company Policy & Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure expense thresholds and approval policies for {user.company.name}.
        </p>
      </div>

      {policy && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            Active Policy Limits
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Max Event Budget</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                ₹{(policy.maxBudget / 100).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Per-Person Cap</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                ₹{(policy.perPersonCap / 100).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs font-medium text-slate-500">Allowed Event Cities</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {policy.allowedCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
