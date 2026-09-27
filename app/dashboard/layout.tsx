import { requireScopedUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Platform scope renders platform sidebar; tenant scope renders workspace sidebar.
  const user = await requireScopedUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
