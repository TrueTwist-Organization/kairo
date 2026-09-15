"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Clock3, Loader2, PauseCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  agentsCatalog,
  type AgentApiItem,
  type LiveRunResponse,
} from "@/lib/agents";

const statusMeta: Record<
  AgentApiItem["status"],
  { label: string; icon: typeof Bot; tone: string }
> = {
  running: {
    label: "Running",
    icon: Loader2,
    tone: "bg-accent text-accent-ink",
  },
  waiting_approval: {
    label: "Needs approval",
    icon: PauseCircle,
    tone: "bg-white text-ink",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    tone: "bg-success/20 text-success",
  },
  queued: {
    label: "Queued",
    icon: Clock3,
    tone: "bg-white/10 text-white/70",
  },
};

export function Agents() {
  const [agents, setAgents] = useState<AgentApiItem[]>([]);
  const [liveRun, setLiveRun] = useState<LiveRunResponse | null>(null);
  const [activeId, setActiveId] = useState("freight-auditor");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [agentsRes, runRes] = await Promise.all([
          fetch("/api/agents"),
          fetch("/api/agents/live-run"),
        ]);
        if (!agentsRes.ok || !runRes.ok) return;
        const agentsData = (await agentsRes.json()) as { agents: AgentApiItem[] };
        const runData = (await runRes.json()) as LiveRunResponse;
        if (cancelled) return;
        setAgents(agentsData.agents);
        setLiveRun(runData);
        setActiveId(runData.agentId);
      } catch {
        // Frontend keeps static catalogue if API is offline.
      }
    }

    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const active =
    agents.find((a) => a.id === activeId) ??
    agents[0] ??
    null;

  return (
    <section id="agents" className="scroll-mt-28 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Agents
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Real agents that run your ops — not chatbots
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Like Duvo-style production agents: they work inside SAP, portals,
            sheets, and inboxes, pause for human approval, and write outcomes
            back with evidence.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            {(agents.length ? agents : agentsCatalog.map((a) => ({
              id: a.id,
              name: a.name,
              role: a.role,
              system: a.systems.join(" · "),
              status: "queued" as const,
              progress: 0,
              lastAction: "Waiting for Node.js API…",
              evidence: "—",
            }))).map((agent, i) => {
              const meta = statusMeta[agent.status];
              const Icon = meta.icon;
              const selected = activeId === agent.id;
              return (
                <Reveal key={agent.id} delay={i * 0.05} y={16}>
                  <button
                    type="button"
                    onClick={() => setActiveId(agent.id)}
                    className={`w-full rounded-[22px] border p-5 text-left transition ${
                      selected
                        ? "border-accent bg-white/10"
                        : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-ink">
                          <Bot size={18} />
                        </div>
                        <div>
                          <p className="font-display text-lg font-bold">{agent.name}</p>
                          <p className="mt-1 text-sm text-white/55">{agent.role}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.tone}`}
                      >
                        <Icon
                          size={12}
                          className={agent.status === "running" ? "animate-spin" : ""}
                        />
                        {meta.label}
                      </span>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-white/45">{agent.system}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="h-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#151922] to-[#0b0d12] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    {liveRun?.title ?? "Agent workspace"}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold sm:text-3xl">
                    {active?.name ?? liveRun?.agentName ?? "Freight Auditor"}
                  </h3>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-ink">
                  LIVE
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {active?.lastAction ??
                  "Agent is matching invoices to contracted rates across systems."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {(liveRun?.metrics ?? [
                  { label: "Invoices", value: "—" },
                  { label: "Findings", value: "—" },
                  { label: "Claims", value: "—" },
                ]).map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-white/45">
                      {m.label}
                    </p>
                    <p className="font-display mt-1 text-xl font-bold text-accent-hot">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {(liveRun?.steps ?? []).map((step) => (
                  <div
                    key={step.id}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        step.status === "done"
                          ? "bg-success"
                          : step.status === "active"
                            ? "bg-accent animate-pulse"
                            : "bg-white/25"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className="mt-0.5 text-xs text-white/50">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3">
                <div className="pulse-ring relative flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-ink" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {liveRun?.approval.title ?? "Human approval gate"}
                  </p>
                  <p className="text-xs text-white/55">
                    {active?.evidence ??
                      liveRun?.approval.detail ??
                      "Sensitive write-back waits for a human."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
