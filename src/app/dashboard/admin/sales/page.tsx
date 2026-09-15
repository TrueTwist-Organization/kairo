import { requireProfile } from "@/lib/crm/auth";
import { getDeals, getSalesPeople } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { PIPELINE_STAGES, STAGE_LABELS, formatMoney } from "@/lib/crm/types";
import { Badge } from "@/components/ui/badge";

export default async function AdminSalesPage() {
  const profile = await requireProfile(["admin"]);
  const [deals, people] = await Promise.all([getDeals(profile), getSalesPeople()]);
  const ownerName = new Map(people.map((p) => [p.id, p.full_name]));

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales pipeline</h1>
          <p className="mt-1 text-muted-foreground">Full-team view of every deal stage.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PIPELINE_STAGES.filter((s) => s !== "lost").map((stage) => {
            const items = deals.filter((d) => d.stage === stage);
            const total = items.reduce((s, d) => s + d.value_cents, 0);
            return (
              <div key={stage} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">{STAGE_LABELS[stage]}</h2>
                  <Badge variant="secondary">{formatMoney(total)}</Badge>
                </div>
                <div className="space-y-2">
                  {items.map((deal) => (
                    <div
                      key={deal.id}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <p className="font-medium">{deal.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {deal.company} · {ownerName.get(deal.owner_id) ?? "Unassigned"}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {formatMoney(deal.value_cents, deal.currency)}
                      </p>
                    </div>
                  ))}
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No deals</p>
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
