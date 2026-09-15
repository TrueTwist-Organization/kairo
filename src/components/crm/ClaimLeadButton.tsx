"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClaimLeadButton({
  leadId,
  userId,
}: {
  leadId: string;
  userId: string;
}) {
  const router = useRouter();

  async function claim() {
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "assign_lead",
        leadId,
        assigned_to: userId,
      }),
    });
    router.refresh();
  }

  return (
    <Button size="sm" variant="outline" onClick={() => void claim()}>
      Claim lead
    </Button>
  );
}
