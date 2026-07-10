import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatBillingAmount, getOwnerBillingClient, type OwnerBillingInvoice } from "@/lib/owner-billing";

export const runtime = "nodejs";

type ReminderKind = "before_due_3" | "overdue_3" | "overdue_7";

function chicagoDate(value: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const part = (type: string) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

function reminderFor(invoice: OwnerBillingInvoice, today: string): ReminderKind | null {
  if (!invoice.due_at) return null;
  const dueDate = chicagoDate(new Date(invoice.due_at));
  if (today === addDays(dueDate, -3)) return "before_due_3";
  if (today === addDays(dueDate, 3)) return "overdue_3";
  if (today === addDays(dueDate, 7)) return "overdue_7";
  return null;
}

function reminderCopy(kind: ReminderKind, invoice: OwnerBillingInvoice) {
  const amount = formatBillingAmount(invoice.amount_due_cents, invoice.currency);
  const dueDate = invoice.due_at
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "America/Chicago" }).format(new Date(invoice.due_at))
    : "the listed due date";

  if (kind === "before_due_3") {
    return { subject: `Reminder: NurtureCal support invoice due ${dueDate}`, heading: "Your support invoice is due soon.", body: `Your ${amount} NurtureCal support invoice is due on ${dueDate}.` };
  }
  if (kind === "overdue_3") {
    return { subject: "Courtesy reminder: NurtureCal support invoice", heading: "A quick payment reminder.", body: `Your ${amount} NurtureCal support invoice was due on ${dueDate}.` };
  }
  return { subject: "Follow-up: NurtureCal support invoice", heading: "A quick follow-up on your invoice.", body: `Your ${amount} NurtureCal support invoice remains unpaid after its ${dueDate} due date.` };
}

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

    const copy = reminderCopy(kind, invoice);
    try {
      const email = await resend.emails.send({
        from,
        to: invoice.customer_email,
        subject: copy.subject,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#173633"><h1>${copy.heading}</h1><p>${copy.body}</p><p><a href="${invoice.hosted_invoice_url}">Open secure Stripe invoice</a></p><p><a href="${portalUrl}">View billing history</a></p></div>`,
        text: `${copy.heading}\n\n${copy.body}\n\nPay securely: ${invoice.hosted_invoice_url}\nView billing history: ${portalUrl}`,
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
