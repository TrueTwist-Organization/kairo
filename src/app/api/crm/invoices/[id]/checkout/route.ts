import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

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

  try {
    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: invoice.customer_email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: invoice.currency || "usd",
            unit_amount: invoice.amount_cents,
            product_data: {
              name: `Invoice ${invoice.number}`,
              description:
                invoice.line_items?.[0]?.description || "Kairo services",
            },
          },
        },
      ],
      metadata: { invoice_id: invoice.id },
      success_url: `${appUrl}/dashboard/accounting/payments?paid=1`,
      cancel_url: `${appUrl}/dashboard/accounting?canceled=1`,
    });

    await supabase
      .from("invoices")
      .update({
        stripe_checkout_session_id: session.id,
        status: invoice.status === "draft" ? "sent" : invoice.status,
      })
      .eq("id", id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Stripe checkout failed. Check STRIPE_SECRET_KEY.",
      },
      { status: 500 },
    );
  }
}
