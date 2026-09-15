"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/crm/types";

export function InvoiceActions({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function markSent() {
    setLoading("send");
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_invoice_sent", invoiceId: invoice.id }),
    });
    // Best-effort Resend (optional)
    await fetch(`/api/crm/invoices/${invoice.id}/send`, { method: "POST" }).catch(() => null);
    setLoading(null);
    router.refresh();
  }

  async function markPaid() {
    setLoading("pay");
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_invoice_paid", invoiceId: invoice.id }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex justify-end gap-2">
      {invoice.status === "draft" ? (
        <Button size="sm" variant="outline" disabled={!!loading} onClick={() => void markSent()}>
          {loading === "send" ? "Sending…" : "Mark sent / email"}
        </Button>
      ) : null}
      {invoice.status === "sent" || invoice.status === "overdue" ? (
        <Button size="sm" disabled={!!loading} onClick={() => void markPaid()}>
          {loading === "pay" ? "Updating…" : "Mark paid"}
        </Button>
      ) : null}
      {invoice.status === "paid" ? (
        <span className="text-xs text-muted-foreground">Settled</span>
      ) : null}
    </div>
  );
}
