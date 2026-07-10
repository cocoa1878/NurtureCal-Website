import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export type OwnerBillingInvoice = {
  id: string;
  stripe_invoice_id: string;
  invoice_number: string | null;
  customer_email: string | null;
  status: "draft" | "open" | "paid" | "uncollectible" | "void";
  collection_method: string;
  currency: string;
  amount_due_cents: number;
  amount_paid_cents: number;
  service_period_start: string | null;
  service_period_end: string | null;
  due_at: string | null;
  paid_at: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf_url: string | null;
  description: string | null;
  created_at: string;
};

type BillingDatabase = {
  public: {
    Tables: {
      owner_billing_invoices: {
        Row: OwnerBillingInvoice;
        Insert: Partial<OwnerBillingInvoice> & {
          stripe_invoice_id: string;
          status: OwnerBillingInvoice["status"];
          collection_method: string;
        };
        Update: Partial<OwnerBillingInvoice>;
        Relationships: [];
      };
      owner_billing_webhook_events: {
        Row: { stripe_event_id: string; event_type: string; processed_at: string | null };
        Insert: { stripe_event_id: string; event_type: string; event_created_at?: string | null; payload: Record<string, unknown> };
        Update: { processed_at?: string | null; processing_error?: string | null };
        Relationships: [];
      };
      owner_billing_reminder_log: {
        Row: { id: string; invoice_id: string; reminder_kind: string; status: "sent" | "failed" };
        Insert: { invoice_id: string; reminder_kind: string; recipient_email: string; status?: "sent" | "failed"; resend_email_id?: string | null; error_message?: string | null };
        Update: { status?: "sent" | "failed"; resend_email_id?: string | null; error_message?: string | null; sent_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let billingClient: ReturnType<typeof createClient<BillingDatabase>> | null = null;

function firstConfigured(...names: string[]) {
  return names.map((name) => process.env[name]).find(Boolean) ?? null;
}

export function getOwnerBillingClient() {
  if (billingClient) return billingClient;

  const url = firstConfigured("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  billingClient = createClient<BillingDatabase>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return billingClient;
}

function isoDate(timestamp: number | null | undefined) {
  return timestamp ? new Date(timestamp * 1000).toISOString() : null;
}

function idOf(value: string | { id: string } | null) {
  return typeof value === "string" ? value : value?.id ?? null;
}

const monthNumbers: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function dateOnlyIso(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 12)).toISOString();
}

function parseServicePeriodText(text: string | null | undefined) {
  if (!text) return null;

  const monthPattern = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t|tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
  const match = text.match(new RegExp(`${monthPattern}\\.?\\s+(\\d{1,2})\\s*[-–—]\\s*(?:${monthPattern}\\.?\\s+)?(\\d{1,2}),?\\s+(\\d{4})`, "i"));
  if (!match) return null;

  const startMonth = monthNumbers[match[1].toLowerCase()];
  const endMonth = monthNumbers[(match[3] || match[1]).toLowerCase()];
  const startDay = Number(match[2]);
  const endDay = Number(match[4]);
  const year = Number(match[5]);

  if (!startMonth || !endMonth || !startDay || !endDay || !year) return null;
  return {
    start: dateOnlyIso(year, startMonth, startDay),
    end: dateOnlyIso(year, endMonth, endDay),
  };
}

function servicePeriod(invoice: Stripe.Invoice) {
  if (invoice.period_start && invoice.period_end && invoice.period_start !== invoice.period_end) {
    return { start: isoDate(invoice.period_start), end: isoDate(invoice.period_end) };
  }

  const lineWithPeriod = invoice.lines?.data.find((line) => line.period?.start && line.period?.end && line.period.start !== line.period.end);
  if (lineWithPeriod?.period) {
    return { start: isoDate(lineWithPeriod.period.start), end: isoDate(lineWithPeriod.period.end) };
  }

  const textPeriod =
    parseServicePeriodText(invoice.description) ??
    invoice.lines?.data.map((line) => parseServicePeriodText(line.description)).find((period): period is { start: string; end: string } => Boolean(period));

  if (textPeriod) return textPeriod;
  return { start: isoDate(invoice.period_start), end: isoDate(invoice.period_end) };
}

export async function syncStripeInvoice(invoice: Stripe.Invoice) {
  const client = getOwnerBillingClient();
  if (!client) throw new Error("Owner billing Supabase credentials are not configured.");

  const parent = invoice.parent as { subscription_details?: { subscription?: string | { id: string } } } | null;
  const period = servicePeriod(invoice);
  const { error } = await client.from("owner_billing_invoices").upsert(
    {
      stripe_invoice_id: invoice.id,
      stripe_customer_id: idOf(invoice.customer),
      stripe_subscription_id: idOf(parent?.subscription_details?.subscription ?? null),
      invoice_number: invoice.number,
      customer_email: invoice.customer_email,
      status: invoice.status ?? "draft",
      collection_method: invoice.collection_method,
      currency: invoice.currency,
      amount_due_cents: invoice.amount_due,
      amount_paid_cents: invoice.amount_paid,
      service_period_start: period.start,
      service_period_end: period.end,
      due_at: isoDate(invoice.due_date),
      paid_at: isoDate(invoice.status_transitions.paid_at),
      hosted_invoice_url: invoice.hosted_invoice_url ?? null,
      invoice_pdf_url: invoice.invoice_pdf ?? null,
      description: invoice.description,
      raw_invoice: invoice as unknown as Record<string, unknown>,
    },
    { onConflict: "stripe_invoice_id" },
  );

  if (error) throw new Error(`Unable to sync Stripe invoice: ${error.message}`);
}

export function formatBillingAmount(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
