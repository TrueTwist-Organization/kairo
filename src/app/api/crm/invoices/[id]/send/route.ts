import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResend, fromEmail } from "@/lib/resend";
import { formatMoney } from "@/lib/crm/types";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const payUrl = `${appUrl}/dashboard/accounting?invoice=${invoice.id}`;

  try {
    const resend = getResend();
    await resend.emails.send({
      from: fromEmail(),
      to: invoice.customer_email,
      subject: `Invoice ${invoice.number} from Kairo`,
      html: `
        <h2>Invoice ${invoice.number}</h2>
        <p>Hi ${invoice.customer_name},</p>
        <p>Please find your invoice for <strong>${formatMoney(
          invoice.amount_cents,
          invoice.currency,
        )}</strong>.</p>
        <p>Our accounting team can send a Stripe payment link on request, or you can reply to this email.</p>
        <p><a href="${payUrl}">View invoice reference</a></p>
        <p>— Kairo Accounting</p>
      `,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Resend failed. Check RESEND_API_KEY.",
      },
      { status: 500 },
    );
  }

  await supabase.from("invoices").update({ status: "sent" }).eq("id", id);
  return NextResponse.json({ ok: true });
}
