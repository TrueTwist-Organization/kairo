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
    id: "cold-email-agent",
    name: "Cold Email Campaign Agent",
    role: "Researches prospects and runs personalized outreach",
    system: "Gmail · AI writer · Search",
    status: "running",
    progress: 74,
    lastAction: "Researched a prospect and drafted the first note",
    evidence: "Cold email · waiting review",
  },
  {
    id: "lead-agent",
    name: "Lead Generation Agent",
    role: "Finds people who can enter the website funnel",
    system: "Chat model · Search · Memory",
    status: "waiting_approval",
    progress: 88,
    lastAction: "Prepared a lead list and held it for a person to approve",
    evidence: "Lead workflow · not sent yet",
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    role: "Supports campaigns for SEO, GEO, and AEO traffic",
    system: "HTTP · Memory · Chat model",
    status: "queued",
    progress: 20,
    lastAction: "Queued campaign copy for the website offer",
    evidence: "Campaign draft · calendar open",
  },
  {
    id: "follow-up-agent",
    name: "Follow-up Agent",
    role: "Continues the conversation and helps book the next call",
    system: "Gmail · Google Calendar · Memory",
    status: "completed",
    progress: 100,
    lastAction: "Sorted replies and offered times on the calendar",
    evidence: "Follow-up · run closed",
  },
];

const runSteps: AgentRunStep[] = [
  {
    id: "1",
    label: "Read the knowledge base",
    detail: "Use memory and search before the first note",
    status: "done",
  },
  {
    id: "2",
    label: "Connect Gmail and calendar",
    detail: "Keep follow-up and booking in the same workflow",
    status: "done",
  },
  {
    id: "3",
    label: "Draft with the AI writer",
    detail: "Write a specific cold email, not a generic blast",
    status: "active",
  },
  {
    id: "4",
    label: "Wait for a person to review",
    detail: "Nothing sends until a person approves it",
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
    agentId: "cold-email-agent",
    agentName: "Cold Email Campaign Agent",
    headline: "Research a prospect. Draft the outreach.",
    metrics: [
      { label: "Campaigns", value: "4" },
      { label: "Reply rate", value: "1.9%" },
      { label: "Calls booked", value: "67" },
    ],
    approval: {
      title: "Human approval gate",
      detail: "Draft waiting on a person before it sends",
    },
    steps: runSteps,
  };
}
