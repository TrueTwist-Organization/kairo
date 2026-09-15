import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { LeadInput } from "./validators";

const dataDir = path.join(process.cwd(), "data");
const leadsFile = path.join(dataDir, "leads.json");

export type StoredLead = LeadInput & {
  id: string;
  createdAt: string;
};

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, "[]", "utf8");
  }
}

export async function saveLead(lead: LeadInput): Promise<StoredLead> {
  await ensureStore();
  const raw = await fs.readFile(leadsFile, "utf8");
  const existing = JSON.parse(raw) as StoredLead[];
  const entry: StoredLead = {
    ...lead,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  existing.unshift(entry);
  await fs.writeFile(leadsFile, JSON.stringify(existing, null, 2), "utf8");
  return entry;
}

export async function listLeads(): Promise<StoredLead[]> {
  await ensureStore();
  const raw = await fs.readFile(leadsFile, "utf8");
  return JSON.parse(raw) as StoredLead[];
}
