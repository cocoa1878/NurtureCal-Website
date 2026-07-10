import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import GuideShell from "../GuideShell";
import { isOwnerAuthenticated } from "../auth";
import { formatBillingAmount, getOwnerBillingClient } from "@/lib/owner-billing";
import styles from "../owner-guide.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Billing | NurtureCal Owner Guide",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "America/Chicago" }).format(new Date(value))
    : "—";
}

export default async function OwnerBillingPage() {
  if (!(await isOwnerAuthenticated())) redirect("/owner-guide");

  const billing = getOwnerBillingClient();
  const { data: invoices, error } = billing
    ? await billing.from("owner_billing_invoices").select("*").order("created_at", { ascending: false })
    : { data: null, error: null };

  return (
    <GuideShell activeTopic="billing">
      <div className={styles.guideTopbar}>
        <Link href="/owner-guide">← Back to start</Link>
        <span>Private billing</span>
      </div>
      <article className={styles.guideArticle}>
        <header className={styles.guideHeader}>
          <p className={styles.eyebrow}>Billing history</p>
          <h1>Invoices and payments</h1>
          <p>Every invoice comes directly from Stripe. A paid status appears here only after Stripe confirms the payment.</p>
        </header>
        {!billing ? <aside className={styles.answerCard}><span>Connecting</span><p>Billing is being connected securely. Please check back shortly.</p></aside> : null}
        {error ? <aside className={styles.answerCard}><span>Unavailable</span><p>We could not load billing history right now. Your Stripe invoices remain available through their secure links.</p></aside> : null}
        {billing && !error && !invoices?.length ? <aside className={styles.answerCard}><span>No invoices yet</span><p>Your support invoice will appear here as soon as Stripe issues it.</p></aside> : null}
        <div className={styles.guideSections}>
          {invoices?.map((invoice) => (
            <section className={styles.guideSection} key={invoice.id}>
              <div className={styles.sectionCopy}>
                <p className={styles.sectionLabel}>{invoice.status === "paid" ? "Paid" : invoice.status === "open" ? "Payment due" : invoice.status}</p>
                <h2>{invoice.invoice_number || "NurtureCal support invoice"}</h2>
                <p className={styles.sectionIntro}>{formatBillingAmount(invoice.amount_due_cents, invoice.currency)} · Due {formatDate(invoice.due_at)}</p>
                <ol>
                  <li><b>1</b><span>Service period: {formatDate(invoice.service_period_start)} – {formatDate(invoice.service_period_end)}</span></li>
                  <li><b>2</b><span>Paid: {invoice.paid_at ? formatDate(invoice.paid_at) : "Not yet"}</span></li>
                </ol>
                {invoice.hosted_invoice_url ? <a className={styles.destinationButton} href={invoice.hosted_invoice_url} rel="noreferrer" target="_blank">Open secure Stripe invoice ↗</a> : null}
              </div>
            </section>
          ))}
        </div>
      </article>
    </GuideShell>
  );
}
