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

export default async function AccountingPaymentsPage() {
  const profile = await requireProfile(["accounting", "admin"]);
  const invoices = (await getInvoices()).filter((i) =>
    ["sent", "paid", "overdue"].includes(i.status),
  );

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live payments</h1>
          <p className="mt-1 text-muted-foreground">
            Track invoice payment status (demo marks + Stripe when configured).
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell>
                    {formatMoney(invoice.amount_cents, invoice.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.paid_at
                      ? new Date(invoice.paid_at).toLocaleString()
                      : "—"}
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
