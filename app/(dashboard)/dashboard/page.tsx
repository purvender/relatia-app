import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ensureUserAndCompany } from "@/lib/auth";

const navLinks = [
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/approvals", label: "Approvals" },
  { href: "/dashboard/finance", label: "Finance" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default async function DashboardPage() {
  const { user, company } = await ensureUserAndCompany();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
        <p className="text-muted-foreground">
          {user.name} · {user.role}
        </p>
      </div>
      <nav className="flex flex-wrap gap-2">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            variant="outline"
            nativeButton={false}
            render={<Link href={link.href} />}
          >
            {link.label}
          </Button>
        ))}
      </nav>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your company and role for this sign-in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p>Company: {company.name}</p>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
        </CardContent>
      </Card>
    </div>
  );
}
