"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PIPELINE_STAGES, STAGE_LABELS, type Deal } from "@/lib/crm/types";

export function DealStageSelect({
  dealId,
  stage,
}: {
  dealId: string;
  stage: Deal["stage"];
}) {
  const router = useRouter();

  async function onChange(value: string) {
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_deal_stage",
        dealId,
        stage: value,
      }),
    });
    router.refresh();
  }

  return (
    <Select value={stage} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PIPELINE_STAGES.map((s) => (
          <SelectItem key={s} value={s}>
            {STAGE_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
