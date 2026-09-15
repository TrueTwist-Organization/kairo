"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateDealForm({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_deal",
        title: String(form.get("title") || ""),
        company: String(form.get("company") || ""),
        value_cents: Math.round(Number(form.get("value") || 0) * 100),
        owner_id: ownerId,
      }),
    });
    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New deal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input name="title" placeholder="Deal title" required />
          <Input name="company" placeholder="Company" required />
          <Input
            name="value"
            type="number"
            min="0"
            step="0.01"
            placeholder="Value (USD)"
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving…" : "Create deal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
