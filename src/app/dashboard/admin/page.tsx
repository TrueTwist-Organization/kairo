import { requireProfile } from "@/lib/crm/auth";
import { getDeals, getInvoices, getLeads, getSalesPeople } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { StatCard } from "@/components/crm/StatCard";
import { formatMoney } from "@/lib/crm/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminOverviewPage() {
  const profile = await requireProfile(["admin"]);
  const [leads, deals, invoices, salesPeople] = await Promise.all([
    getLeads(profile),
    getDeals(profile),
    getInvoices(),
    getSalesPeople(),
  ]);

  const pipelineValue = deals
    .filter((d) => d.stage !== "lost")
    .reduce((sum, d) => sum + d.value_cents, 0);
  const wonValue = deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + d.value_cents, 0);
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const paidAmount = paidInvoices.reduce((sum, i) => sum + i.amount_cents, 0);

  const salesWorkload = salesPeople.map((person) => {
    const owned = deals.filter((d) => d.owner_id === person.id);
    const open = owned.filter((d) => !["won", "lost"].includes(d.stage));
    return {
      ...person,
      openDeals: open.length,
      pipeline: open.reduce((s, d) => s + d.value_cents, 0),
      won: owned.filter((d) => d.stage === "won").length,
    };
  });

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin overview</h1>
          <p className="mt-1 text-muted-foreground">
            Leads, sales, invoices. Automation agents are on the marketing homepage.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Incoming leads" value={String(leads.length)} hint="All sources" />
          <StatCard
            title="Open pipeline"
            value={formatMoney(pipelineValue)}
            hint={`${deals.length} deals`}
          />
          <StatCard title="Won revenue" value={formatMoney(wonValue)} hint="Closed-won" />
          <StatCard
            title="Paid invoices"
            value={formatMoney(paidAmount)}
            hint={`${paidInvoices.length} settled`}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-semibold">Latest leads</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.slice(0, 8).map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-semibold">Sales team workload</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep</TableHead>
                  <TableHead>Open</TableHead>
                  <TableHead>Pipeline</TableHead>
                  <TableHead>Won</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesWorkload.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell>
                      <div className="font-medium">{rep.full_name}</div>
                      <div className="text-xs text-muted-foreground">{rep.email}</div>
                    </TableCell>
                    <TableCell>{rep.openDeals}</TableCell>
                    <TableCell>{formatMoney(rep.pipeline)}</TableCell>
                    <TableCell>{rep.won}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
