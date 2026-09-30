import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Deal, Invoice, Lead } from "@/lib/crm/types";

const dataDir = path.join(process.cwd(), "data");
const storeFile = path.join(dataDir, "crm-demo.json");

type Store = {
  leads: Lead[];
  deals: Deal[];
  invoices: Invoice[];
};

const seed: Store = {
  leads: [
    {
      id: randomUUID(),
      name: "Jordan Lee",
      email: "jordan@notino.example",
      company: "Notino Ops",
      role: "Head of Logistics",
      interest: "ai-agent",
      message: "Need a cold email and follow-up agent connected to Gmail.",
      source: "website",
      status: "new",
      assigned_to: null,
      created_at: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      name: "Priya Shah",
      email: "priya@rohlik.example",
      company: "Rohlik Group",
      role: "Finance Lead",
      interest: "seo",
      message: "Looking to set up SEO, GEO, and AEO on the website.",
      source: "website",
      status: "contacted",
      assigned_to: "22222222-2222-2222-2222-222222222222",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  deals: [
    {
      id: randomUUID(),
      title: "Freight audit pilot",
      company: "Rohlik Group",
      value_cents: 4800000,
      currency: "usd",
      stage: "proposal",
      lead_id: null,
      owner_id: "22222222-2222-2222-2222-222222222222",
      expected_close: null,
      notes: "Pilot for EU lanes",
      created_at: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      title: "Payables automation",
      company: "Notino Ops",
      value_cents: 7200000,
      currency: "usd",
      stage: "qualified",
      lead_id: null,
      owner_id: "22222222-2222-2222-2222-222222222222",
      expected_close: null,
      notes: "",
      created_at: new Date().toISOString(),
    },
  ],
  invoices: [
    {
      id: randomUUID(),
      number: "INV-DEMO-1001",
      customer_name: "Rohlik Group",
      customer_email: "ap@rohlik.example",
      company: "Rohlik Group",
      amount_cents: 1250000,
      currency: "usd",
      status: "sent",
      deal_id: null,
      created_by: "33333333-3333-3333-3333-333333333333",
      stripe_checkout_session_id: null,
      paid_at: null,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      line_items: [
        {
          description: "Freight audit pilot — month 1",
          amount_cents: 1250000,
          quantity: 1,
        },
      ],
      created_at: new Date().toISOString(),
    },
  ],
};

async function ensureStore(): Promise<Store> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    return JSON.parse(await fs.readFile(storeFile, "utf8")) as Store;
  } catch {
    await fs.writeFile(storeFile, JSON.stringify(seed, null, 2), "utf8");
    return structuredClone(seed);
  }
}

async function writeStore(store: Store) {
  await fs.writeFile(storeFile, JSON.stringify(store, null, 2), "utf8");
}

export async function demoListLeads() {
  return (await ensureStore()).leads;
}
export async function demoListDeals() {
  return (await ensureStore()).deals;
}
export async function demoListInvoices() {
  return (await ensureStore()).invoices;
}

export async function demoCreateLead(
  input: Pick<
    Lead,
    "name" | "email" | "company" | "role" | "interest" | "message" | "source"
  >,
) {
  const store = await ensureStore();
  const lead: Lead = {
    id: randomUUID(),
    ...input,
    status: "new",
    assigned_to: null,
    created_at: new Date().toISOString(),
  };
  store.leads.unshift(lead);
  await writeStore(store);
  return lead;
}

export async function demoUpdateLead(
  id: string,
  patch: Partial<Pick<Lead, "assigned_to" | "status">>,
) {
  const store = await ensureStore();
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  store.leads[idx] = { ...store.leads[idx], ...patch };
  await writeStore(store);
  return store.leads[idx];
}

export async function demoCreateDeal(
  input: Pick<Deal, "title" | "company" | "value_cents" | "owner_id">,
) {
  const store = await ensureStore();
  const deal: Deal = {
    id: randomUUID(),
    title: input.title,
    company: input.company,
    value_cents: input.value_cents,
    currency: "usd",
    stage: "lead",
    lead_id: null,
    owner_id: input.owner_id,
    expected_close: null,
    notes: null,
    created_at: new Date().toISOString(),
  };
  store.deals.unshift(deal);
  await writeStore(store);
  return deal;
}

export async function demoUpdateDealStage(id: string, stage: Deal["stage"]) {
  const store = await ensureStore();
  const idx = store.deals.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  store.deals[idx] = { ...store.deals[idx], stage };
  await writeStore(store);
  return store.deals[idx];
}

export async function demoCreateInvoice(input: {
  customer_name: string;
  customer_email: string;
  company?: string | null;
  amount_cents: number;
  description: string;
  created_by: string;
}) {
  const store = await ensureStore();
  const invoice: Invoice = {
    id: randomUUID(),
    number: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
      Math.random() * 9000 + 1000,
    )}`,
    customer_name: input.customer_name,
    customer_email: input.customer_email,
    company: input.company || null,
    amount_cents: input.amount_cents,
    currency: "usd",
    status: "draft",
    deal_id: null,
    created_by: input.created_by,
    stripe_checkout_session_id: null,
    paid_at: null,
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    line_items: [
      {
        description: input.description,
        amount_cents: input.amount_cents,
        quantity: 1,
      },
    ],
    created_at: new Date().toISOString(),
  };
  store.invoices.unshift(invoice);
  await writeStore(store);
  return invoice;
}

export async function demoUpdateInvoice(id: string, patch: Partial<Invoice>) {
  const store = await ensureStore();
  const idx = store.invoices.findIndex((i) => i.id === id);
  if (idx < 0) return null;
  store.invoices[idx] = { ...store.invoices[idx], ...patch };
  await writeStore(store);
  return store.invoices[idx];
}
