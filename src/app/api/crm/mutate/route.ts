import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/crm/demo";
import {
  demoCreateDeal,
  demoCreateInvoice,
  demoUpdateDealStage,
  demoUpdateInvoice,
  demoUpdateLead,
} from "@/lib/crm/demo-store";
import { createClient } from "@/lib/supabase/server";
import type { Deal } from "@/lib/crm/types";

const schema = z.object({
  action: z.enum([
    "assign_lead",
    "create_deal",
    "update_deal_stage",
    "create_invoice",
    "mark_invoice_sent",
    "mark_invoice_paid",
  ]),
  leadId: z.string().optional(),
  assigned_to: z.string().nullable().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  value_cents: z.number().optional(),
  owner_id: z.string().optional(),
  dealId: z.string().optional(),
  stage: z
    .enum(["lead", "qualified", "proposal", "negotiation", "won", "lost"])
    .optional(),
  customer_name: z.string().optional(),
  customer_email: z.string().optional(),
  amount_cents: z.number().optional(),
  description: z.string().optional(),
  created_by: z.string().optional(),
  invoiceId: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const data = parsed.data;

  try {
    if (!isSupabaseConfigured()) {
      switch (data.action) {
        case "assign_lead":
          await demoUpdateLead(data.leadId!, {
            assigned_to: data.assigned_to ?? null,
            status: data.assigned_to ? "contacted" : "new",
          });
          break;
        case "create_deal":
          await demoCreateDeal({
            title: data.title!,
            company: data.company!,
            value_cents: data.value_cents || 0,
            owner_id: data.owner_id!,
          });
          break;
        case "update_deal_stage":
          await demoUpdateDealStage(data.dealId!, data.stage as Deal["stage"]);
          break;
        case "create_invoice":
          await demoCreateInvoice({
            customer_name: data.customer_name!,
            customer_email: data.customer_email!,
            company: data.company || null,
            amount_cents: data.amount_cents || 0,
            currency: "usd",
            deal_id: null,
            created_by: data.created_by!,
            due_date: new Date(Date.now() + 14 * 86400000)
              .toISOString()
              .slice(0, 10),
            line_items: [
              {
                description: data.description || "Services",
                amount_cents: data.amount_cents || 0,
                quantity: 1,
              },
            ],
          });
          break;
        case "mark_invoice_sent":
          await demoUpdateInvoice(data.invoiceId!, { status: "sent" });
          break;
        case "mark_invoice_paid":
          await demoUpdateInvoice(data.invoiceId!, {
            status: "paid",
            paid_at: new Date().toISOString(),
          });
          break;
        default:
          break;
      }
      return NextResponse.json({ ok: true, mode: "demo" });
    }

    const supabase = await createClient();
    switch (data.action) {
      case "assign_lead":
        await supabase
          .from("leads")
          .update({
            assigned_to: data.assigned_to ?? null,
            status: data.assigned_to ? "contacted" : "new",
          })
          .eq("id", data.leadId!);
        break;
      case "create_deal":
        await supabase.from("deals").insert({
          title: data.title,
          company: data.company,
          value_cents: data.value_cents || 0,
          owner_id: data.owner_id,
          stage: "lead",
        });
        break;
      case "update_deal_stage":
        await supabase
          .from("deals")
          .update({ stage: data.stage })
          .eq("id", data.dealId!);
        break;
      case "create_invoice": {
        const number = `INV-${new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "")}-${Math.floor(Math.random() * 9000 + 1000)}`;
        await supabase.from("invoices").insert({
          number,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          company: data.company || null,
          amount_cents: data.amount_cents || 0,
          currency: "usd",
          status: "draft",
          created_by: data.created_by,
          line_items: [
            {
              description: data.description || "Services",
              amount_cents: data.amount_cents || 0,
              quantity: 1,
            },
          ],
        });
        break;
      }
      case "mark_invoice_sent":
        await supabase
          .from("invoices")
          .update({ status: "sent" })
          .eq("id", data.invoiceId!);
        break;
      case "mark_invoice_paid":
        await supabase
          .from("invoices")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", data.invoiceId!);
        break;
      default:
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Mutation failed" },
      { status: 500 },
    );
  }
}
