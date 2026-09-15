export type AgentStatus = "running" | "waiting_approval" | "completed" | "queued";

export type Agent = {
  id: string;
  name: string;
  role: string;
  system: string;
  status: AgentStatus;
  progress: number;
  lastAction: string;
  evidence: string;
};

export type AgentRunStep = {
  id: string;
  label: string;
  detail: string;
  status: "done" | "active" | "pending";
};

const agents: Agent[] = [
  {
    id: "freight-auditor",
    name: "Freight Auditor",
    role: "Audits carrier invoices against contracts before payment",
    system: "TMS · Email · Contracts",
    status: "running",
    progress: 78,
    lastAction: "Matched accessorial line to contract rate card",
    evidence: "INV-88421 · evidence pack ready",
  },
  {
    id: "payables-matcher",
    name: "Payables Matcher",
    role: "Reconciles supplier invoices to POs and goods receipts",
    system: "SAP · Portals · Sheets",
    status: "waiting_approval",
    progress: 92,
    lastAction: "Flagged duplicate invoice before payment run",
    evidence: "PO-12044 · waiting finance lead",
  },
  {
    id: "inventory-planner",
    name: "Inventory Planner",
    role: "Closes stock gaps with replenishment and transfer proposals",
    system: "ERP · Supplier portals",
    status: "queued",
    progress: 12,
    lastAction: "Queued SKU gap scan for warehouse EU-3",
    evidence: "Availability signal intake",
  },
  {
    id: "claims-agent",
    name: "Claims Agent",
    role: "Disputes OTIF fines and recovers deductions end to end",
    system: "Carrier feeds · Inbox",
    status: "completed",
    progress: 100,
    lastAction: "Filed dispute with full shipment evidence pack",
    evidence: "Case CLM-309 closed",
  },
];

const runSteps: AgentRunStep[] = [
  {
    id: "1",
    label: "Capture process",
    detail: "Read walkthrough + contract + invoice stream",
    status: "done",
  },
  {
    id: "2",
    label: "Agent executes",
    detail: "Match rates across TMS, portal, and spreadsheet",
    status: "done",
  },
  {
    id: "3",
    label: "Human approval",
    detail: "Finance lead reviews write-back before payment",
    status: "active",
  },
  {
    id: "4",
    label: "Prove outcome",
    detail: "Evidence pack + audit trail written back",
    status: "pending",
  },
];

export function listAgents() {
  return agents;
}

export function getAgent(id: string) {
  return agents.find((a) => a.id === id) ?? null;
}

export function getLiveRun() {
  return {
    title: "Live agent run",
    agentId: "freight-auditor",
    agentName: "Freight Auditor",
    headline: "Freight audit closed with evidence",
    metrics: [
      { label: "Invoices reviewed", value: "12,480" },
      { label: "Overcharges found", value: "3.8%" },
      { label: "Claims filed", value: "214" },
    ],
    approval: {
      title: "Human approval gate",
      detail: "Payment write-back waiting on finance lead",
    },
    steps: runSteps,
  };
}
