import { requireAppUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAppUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
