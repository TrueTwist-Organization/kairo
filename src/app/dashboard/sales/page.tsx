import { requireProfile } from "@/lib/crm/auth";
import { getDeals, getLeads } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { StatCard } from "@/components/crm/StatCard";
import { CreateDealForm } from "@/components/crm/CreateDealForm";
import { DealStageSelect } from "@/components/crm/DealStageSelect";
import { PIPELINE_STAGES, STAGE_LABELS, formatMoney } from "@/lib/crm/types";
import { Badge } from "@/components/ui/badge";

export default async function SalesDashboardPage() {
  const profile = await requireProfile(["sales"]);
  const [deals, leads] = await Promise.all([
    getDeals(profile),
    getLeads(profile),
  ]);

  const openValue = deals
    .filter((d) => !["won", "lost"].includes(d.stage))
    .reduce((s, d) => s + d.value_cents, 0);
  const wonValue = deals
    .filter((d) => d.stage === "won")
    .reduce((s, d) => s + d.value_cents, 0);

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My sales pipeline</h1>
            <p className="mt-1 text-muted-foreground">
              You only see your own deals and available leads.
            </p>
          </div>
          <CreateDealForm ownerId={profile.id} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="My open pipeline" value={formatMoney(openValue)} />
          <StatCard title="Won" value={formatMoney(wonValue)} />
          <StatCard title="Leads available" value={String(leads.length)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PIPELINE_STAGES.filter((s) => s !== "lost").map((stage) => {
            const items = deals.filter((d) => d.stage === stage);
            return (
              <div key={stage} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">{STAGE_LABELS[stage]}</h2>
                  <Badge variant="secondary">{items.length}</Badge>
                </div>
                <div className="space-y-2">
                  {items.map((deal) => (
                    <div
                      key={deal.id}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <p className="font-medium">{deal.title}</p>
                      <p className="text-xs text-muted-foreground">{deal.company}</p>
                      <p className="mt-1 text-sm font-semibold">
                        {formatMoney(deal.value_cents, deal.currency)}
                      </p>
                      <div className="mt-2">
                        <DealStageSelect dealId={deal.id} stage={deal.stage} />
                      </div>
                    </div>
                  ))}
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Empty stage</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
