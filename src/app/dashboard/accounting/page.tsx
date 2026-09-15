import { requireProfile } from "@/lib/crm/auth";
import { getInvoices } from "@/lib/crm/data";
import { DashboardShell } from "@/components/crm/DashboardShell";
import { StatCard } from "@/components/crm/StatCard";
import { CreateInvoiceForm } from "@/components/crm/CreateInvoiceForm";
import { InvoiceActions } from "@/components/crm/InvoiceActions";
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

export default async function AccountingDashboardPage() {
  const profile = await requireProfile(["accounting", "admin"]);
  const invoices = await getInvoices();
  const paid = invoices.filter((i) => i.status === "paid");
  const sent = invoices.filter((i) => i.status === "sent");
  const paidTotal = paid.reduce((s, i) => s + i.amount_cents, 0);
  const outstanding = sent.reduce((s, i) => s + i.amount_cents, 0);

  return (
    <DashboardShell profile={profile}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
            <p className="mt-1 text-muted-foreground">
              Create invoices, email customers, track payments.
            </p>
          </div>
          <CreateInvoiceForm createdBy={profile.id} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Paid" value={formatMoney(paidTotal)} hint={`${paid.length} invoices`} />
          <StatCard
            title="Outstanding"
            value={formatMoney(outstanding)}
            hint={`${sent.length} awaiting payment`}
          />
          <StatCard title="All invoices" value={String(invoices.length)} />
        </div>

        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <InvoiceActions invoice={invoice} />
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
