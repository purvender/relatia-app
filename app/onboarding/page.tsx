import { requireOnboardingUser } from "@/lib/auth";
import { createCompanyAction } from "./actions";

export default async function OnboardingPage() {
  const user = await requireOnboardingUser();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-6 py-12">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">Step 1 of 1</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Set up your company
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Signed in as {user.email}. Create your company workspace to continue.
          </p>
        </div>

        <form action={createCompanyAction} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-900"
            >
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Acme Technologies Private Limited"
              required
              minLength={2}
              maxLength={80}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
            <p className="text-xs text-gray-500">
              This creates your first workspace and default approval policy.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Create company
          </button>
        </form>
      </div>
    </main>
  );
}