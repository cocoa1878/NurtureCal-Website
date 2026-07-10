import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getOwnerBillingClient, syncStripeInvoice } from "@/lib/owner-billing";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret) {
    return NextResponse.json({ error: "Stripe billing is not configured." }, { status: 503 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const body = await request.text();
  let event;

  try {
    event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  const billing = getOwnerBillingClient();
  if (!billing) {
    return NextResponse.json({ error: "Billing database is not configured." }, { status: 503 });
  }

  const { error: eventError } = await billing.from("owner_billing_webhook_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
    event_created_at: new Date(event.created * 1000).toISOString(),
    payload: event as unknown as Record<string, unknown>,
  });

  if (eventError?.code === "23505") {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (eventError) {
    return NextResponse.json({ error: "Unable to record Stripe event." }, { status: 500 });
  }

  try {
    if (event.data.object.object === "invoice") {
      await syncStripeInvoice(event.data.object);
    }

    await billing
      .from("owner_billing_webhook_events")
      .update({ processed_at: new Date().toISOString(), processing_error: null })
      .eq("stripe_event_id", event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook processing error.";
    await billing
      .from("owner_billing_webhook_events")
      .update({ processing_error: message })
      .eq("stripe_event_id", event.id);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
