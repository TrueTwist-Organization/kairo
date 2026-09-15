import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  customer_name: z.string().min(2),
  customer_email: z.string().email(),
  company: z.string().optional().nullable(),
  amount: z.number().positive(),
  description: z.string().min(2),
  created_by: z.string().uuid(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid invoice" },
      { status: 400 },
    );
  }

  const amountCents = Math.round(parsed.data.amount * 100);
  const number = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
    Math.random() * 9000 + 1000,
  )}`;

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      number,
      customer_name: parsed.data.customer_name,
      customer_email: parsed.data.customer_email,
      company: parsed.data.company || null,
      amount_cents: amountCents,
      currency: "usd",
      status: "draft",
      created_by: parsed.data.created_by,
      line_items: [
        {
          description: parsed.data.description,
          amount_cents: amountCents,
          quantity: 1,
        },
      ],
      due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
