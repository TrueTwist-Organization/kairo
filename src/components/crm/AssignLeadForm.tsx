"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AssignLeadForm({
  leadId,
  current,
  sales,
}: {
  leadId: string;
  current: string | null;
  sales: { id: string; name: string }[];
}) {
  const router = useRouter();

  async function onChange(value: string) {
    await fetch("/api/crm/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "assign_lead",
        leadId,
        assigned_to: value === "unassigned" ? null : value,
      }),
    });
    router.refresh();
  }

  return (
    <Select value={current ?? "unassigned"} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Assign" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {sales.map((person) => (
          <SelectItem key={person.id} value={person.id}>
            {person.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
