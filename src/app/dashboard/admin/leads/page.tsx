import { requireProfile } from "@/lib/crm/auth";
import { getLeads, getSalesPeople } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { AssignLeadForm } from "@/components/crm/AssignLeadForm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminLeadsPage() {
  const profile = await requireProfile(["admin"]);
  const [leads, sales] = await Promise.all([getLeads(profile), getSalesPeople()]);

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All leads</h1>
          <p className="mt-1 text-muted-foreground">
            Website form leads land here. Assign them to sales.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assign</TableHead>
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
                  <TableCell className="capitalize">
                    {lead.interest.replace(/-/g, " ")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AssignLeadForm
                      leadId={lead.id}
                      current={lead.assigned_to}
                      sales={sales.map((s) => ({ id: s.id, name: s.full_name }))}
                    />
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
