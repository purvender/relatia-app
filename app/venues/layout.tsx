import { requireAppUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";

export default async function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAppUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
