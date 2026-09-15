import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/crm/demo";
import { demoCreateLead } from "@/lib/crm/demo-store";
import { createAdminClient } from "@/lib/supabase/admin";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().optional(),
  interest: z.string().default("full-platform"),
  message: z.string().min(5),
  source: z.string().default("website"),
  type: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid lead" },
        { status: 400 },
      );
    }

    if (!isSupabaseConfigured()) {
      const lead = await demoCreateLead({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        role: parsed.data.role || null,
        interest: parsed.data.interest,
        message: parsed.data.message,
        source: parsed.data.source,
      });
      return NextResponse.json({ ok: true, id: lead.id, mode: "demo" }, { status: 201 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        role: parsed.data.role || null,
        interest: parsed.data.interest,
        message: parsed.data.message,
        source: parsed.data.source,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to capture lead",
      },
      { status: 500 },
    );
  }
}
