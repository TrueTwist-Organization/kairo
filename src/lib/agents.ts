/** Frontend agent catalogue (English UI copy). Live status comes from Node.js API. */
export const agentsCatalog = [
  {
    id: "freight-auditor",
    name: "Freight Auditor",
    role: "Audits carrier invoices against contracts before payment",
    systems: ["TMS", "Email", "Contracts"],
  },
  {
    id: "payables-matcher",
    name: "Payables Matcher",
    role: "Reconciles supplier invoices to POs and goods receipts",
    systems: ["SAP", "Portals", "Sheets"],
  },
  {
    id: "inventory-planner",
    name: "Inventory Planner",
    role: "Closes stock gaps with replenishment and transfer proposals",
    systems: ["ERP", "Supplier portals"],
  },
  {
    id: "claims-agent",
    name: "Claims Agent",
    role: "Disputes OTIF fines and recovers deductions end to end",
    systems: ["Carrier feeds", "Inbox"],
  },
] as const;

export type AgentApiItem = {
  id: string;
  name: string;
  role: string;
  system: string;
  status: "running" | "waiting_approval" | "completed" | "queued";
  progress: number;
  lastAction: string;
  evidence: string;
};

export type LiveRunResponse = {
  title: string;
  agentId: string;
  agentName: string;
  headline: string;
  metrics: { label: string; value: string }[];
  approval: { title: string; detail: string };
  steps: {
    id: string;
    label: string;
    detail: string;
    status: "done" | "active" | "pending";
  }[];
};
