/** Frontend agent catalogue (English UI copy). Live status comes from Node.js API. */
export const agentsCatalog = [
  {
    id: "cold-email-agent",
    name: "Cold Email Campaign Agent",
    role: "Researches prospects and runs personalized outreach",
    systems: ["Gmail", "AI writer", "Search"],
  },
  {
    id: "lead-agent",
    name: "Lead Generation Agent",
    role: "Finds people who can enter the website funnel",
    systems: ["Chat model", "Search", "Memory"],
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    role: "Supports campaigns for SEO, GEO, and AEO traffic",
    systems: ["HTTP", "Memory", "Chat model"],
  },
  {
    id: "follow-up-agent",
    name: "Follow-up Agent",
    role: "Continues the conversation and helps book the next call",
    systems: ["Gmail", "Google Calendar", "Memory"],
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
