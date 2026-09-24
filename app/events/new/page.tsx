import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { EventPolicyBanner } from "@/components/events/event-policy-banner";
import { EventForm } from "@/components/events/event-form";

export default async function NewEventPage() {
  const user = await requireAppUser();

  const policy = await db.orm.public.Policy.where({
    companyId: user.companyId,
  }).first();

  if (!policy) {
    throw new Error("Company policy not found.");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Operations
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Create Corporate Event
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Submit a new event request for {user.company.name}.
        </p>

        <div className="mt-4">
          <EventPolicyBanner
            allowedCities={policy.allowedCities}
            maxBudget={policy.maxBudget}
            perPersonCap={policy.perPersonCap}
          />
        </div>
      </div>

      <EventForm />
    </div>
  );
}