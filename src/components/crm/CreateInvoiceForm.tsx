"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateInvoiceForm({ createdBy }: { createdBy: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_invoice",
        created_by: createdBy,
        customer_name: form.get("customer_name"),
        customer_email: form.get("customer_email"),
        company: form.get("company"),
        amount_cents: Math.round(Number(form.get("amount") || 0) * 100),
        description: form.get("description"),
      }),
    });
    const data = (await res.json()) as { error?: string };
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to create invoice");
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New invoice</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input name="customer_name" placeholder="Customer name" required />
          <Input name="customer_email" type="email" placeholder="Customer email" required />
          <Input name="company" placeholder="Company (optional)" />
          <Input name="amount" type="number" min="1" step="0.01" placeholder="Amount (USD)" required />
          <Textarea name="description" placeholder="Line item description" required />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating…" : "Create draft invoice"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
