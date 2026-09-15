import { requireProfile } from "@/lib/crm/auth";
import { getLeads } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { ClaimLeadButton } from "@/components/crm/ClaimLeadButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function SalesLeadsPage() {
  const profile = await requireProfile(["sales"]);
  const leads = await getLeads(profile);

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My leads</h1>
          <p className="mt-1 text-muted-foreground">
            Unassigned pool + leads assigned to you.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {lead.email} · {lead.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lead.assigned_to === profile.id ? (
                      <span className="text-xs text-muted-foreground">
                        Assigned to you
                      </span>
                    ) : (
                      <ClaimLeadButton leadId={lead.id} userId={profile.id} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}
