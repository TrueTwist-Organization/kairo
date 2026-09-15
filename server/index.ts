import express from "express";
import cors from "cors";
import { leadSchema } from "./validators";
import { listLeads, saveLead } from "./leads";
import { getAgent, getLiveRun, listAgents } from "./agents";

const app = express();
const PORT = Number(process.env.PORT || 4000);
const ADMIN_KEY = process.env.ADMIN_KEY || "change-me-in-production";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "kairo-node-api",
    runtime: "nodejs",
    time: new Date().toISOString(),
  });
});

app.get("/api/agents", (_req, res) => {
  res.json({ agents: listAgents() });
});

app.get("/api/agents/live-run", (_req, res) => {
  res.json(getLiveRun());
});

app.get("/api/agents/:id", (req, res) => {
  const agent = getAgent(req.params.id);
  if (!agent) {
    res.status(404).json({ error: "Agent not found" });
    return;
  }
  res.json({ agent });
});

app.post("/api/leads", async (req, res) => {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid input";
      res.status(400).json({ error: message });
      return;
    }
    const lead = await saveLead(parsed.data);
    res.status(201).json({
      ok: true,
      id: lead.id,
      message: "Lead stored successfully",
    });
  } catch {
    res.status(500).json({ error: "Unable to save your request right now" });
  }
});

app.get("/api/leads", async (req, res) => {
  const auth = req.headers["x-admin-key"];
  if (!auth || auth !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const leads = await listLeads();
  res.json({ leads });
});

app.listen(PORT, () => {
  console.log(`Kairo Node.js API running on http://localhost:${PORT}`);
});
