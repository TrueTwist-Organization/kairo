"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  FileText,
  LogOut,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/crm/types";

const navByRole: Record<
  Profile["role"],
  { href: string; label: string; icon: typeof LayoutDashboard }[]
> = {
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/leads", label: "Leads", icon: Users },
    { href: "/dashboard/admin/sales", label: "Sales team", icon: KanbanSquare },
    { href: "/dashboard/admin/invoices", label: "Invoices", icon: FileText },
  ],
  sales: [
    { href: "/dashboard/sales", label: "My pipeline", icon: KanbanSquare },
    { href: "/dashboard/sales/leads", label: "My leads", icon: Users },
  ],
  accounting: [
    { href: "/dashboard/accounting", label: "Invoices", icon: FileText },
    {
      href: "/dashboard/accounting/payments",
      label: "Payments",
      icon: LayoutDashboard,
    },
  ],
};

export function DashboardShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const items = navByRole[profile.role];

  async function signOut() {
    await fetch("/api/crm/demo-auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 md:flex md:flex-col">
          <Link href="/" className="mb-8 flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot size={18} />
            </div>
            <div>
              <p className="font-semibold leading-none">Kairo CRM</p>
              <p className="mt-1 text-xs capitalize text-muted-foreground">
                {profile.role}
              </p>
            </div>
          </Link>

          <nav className="flex flex-1 flex-col gap-1">
            {items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-border pt-4">
            <div className="px-2">
              <p className="text-sm font-medium">{profile.full_name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {profile.email}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => void signOut()}
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
