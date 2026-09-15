import { requireProfile } from "@/lib/crm/auth";
import { getInvoices } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { formatMoney } from "@/lib/crm/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminInvoicesPage() {
  const profile = await requireProfile(["admin"]);
  const invoices = await getInvoices();

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All invoices</h1>
          <p className="mt-1 text-muted-foreground">Accounting activity across the company.</p>
        </div>
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>
                    <div>{invoice.customer_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {invoice.customer_email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatMoney(invoice.amount_cents, invoice.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize" variant="secondary">
                      {invoice.status}
                    </Badge>
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
