import { NextResponse } from "next/server";
import { Resend } from "resend";
import { chicagoDate, reminderCopy, reminderFor } from "@/lib/billing-reminders";
import { formatBillingAmount, getOwnerBillingClient, NURTURECAL_STRIPE_CUSTOMER_ID } from "@/lib/owner-billing";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const billing = getOwnerBillingClient();
  const resendKey = process.env.RESEND_API_KEY;
  if (!billing || !resendKey) {
    return NextResponse.json({ error: "Billing reminders are not configured." }, { status: 503 });
  }

  const { data: invoices, error } = await billing
    .from("owner_billing_invoices")
    .select("*")
    .eq("stripe_customer_id", NURTURECAL_STRIPE_CUSTOMER_ID)
    .eq("status", "open")
    .not("due_at", "is", null);

  if (error) return NextResponse.json({ error: "Unable to load billing invoices." }, { status: 500 });

  const resend = new Resend(resendKey);
  const today = chicagoDate(new Date());
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const portalUrl = process.env.BILLING_PORTAL_URL || "https://www.nurturecal.com/owner-guide/billing";
  let sent = 0;

  for (const invoice of invoices ?? []) {
    const kind = reminderFor(invoice, today);
    if (!kind || !invoice.customer_email || !invoice.hosted_invoice_url) continue;

    const { data: existing } = await billing
      .from("owner_billing_reminder_log")
      .select("id")
      .eq("invoice_id", invoice.id)
      .eq("reminder_kind", kind)
      .eq("status", "sent")
      .maybeSingle();
    if (existing) continue;

    const amountRemaining = invoice.amount_due_cents - invoice.amount_paid_cents;
    const amount = formatBillingAmount(amountRemaining, invoice.currency);
    const dueDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "America/Chicago" }).format(new Date(invoice.due_at!));
    const copy = reminderCopy(kind, amount, dueDate);
    try {
      const email = await resend.emails.send({
        from,
        to: invoice.customer_email,
        subject: copy.subject,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#173633"><h1>${copy.heading}</h1><p>${copy.body}</p><p>${copy.closing}</p><p><a href="${invoice.hosted_invoice_url}">Open secure Stripe invoice</a></p><p><a href="${portalUrl}">View billing history</a></p><p>Thank you,<br>NurtureCal</p></div>`,
        text: `${copy.heading}\n\n${copy.body}\n\n${copy.closing}\n\nPay securely: ${invoice.hosted_invoice_url}\nView billing history: ${portalUrl}\n\nThank you,\nNurtureCal`,
      });
      await billing.from("owner_billing_reminder_log").upsert(
        { invoice_id: invoice.id, reminder_kind: kind, recipient_email: invoice.customer_email, status: "sent", resend_email_id: email.data?.id ?? null },
        { onConflict: "invoice_id,reminder_kind" },
      );
      sent += 1;
    } catch (sendError) {
      const message = sendError instanceof Error ? sendError.message : "Email delivery failed.";
      await billing.from("owner_billing_reminder_log").upsert(
        { invoice_id: invoice.id, reminder_kind: kind, recipient_email: invoice.customer_email, status: "failed", error_message: message },
        { onConflict: "invoice_id,reminder_kind" },
      );
    }
  }

  return NextResponse.json({ ok: true, sent });
}
