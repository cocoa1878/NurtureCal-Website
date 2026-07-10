import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Sora } from "next/font/google";
import {
  checklistGroups,
  invoiceMilestones,
  screenApprovalGroups,
  type ChecklistStatus,
  type InvoiceMilestone,
  type ScreenApprovalItem,
  type ScreenApprovalStatus,
  type ScreenBuildStatus,
  type ScreenMockupStatus
} from "@/lib/project-status";
import LoginView from "../owner-guide/LoginView";
import { isOwnerAuthenticated } from "../owner-guide/auth";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const displayFont = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "NurtureCal Project Status",
  description:
    "Client-facing delivery, payment, and launch checklist for the NurtureCal app and website.",
  icons: {
    icon: "/websitedemo/icon.png"
  },
  robots: { index: false, follow: false }
};

type ProjectStatusPageProps = {
  searchParams: Promise<{ error?: string }>;
};

function getChecklistClassName(status: ChecklistStatus) {
  switch (status) {
    case "done":
      return styles.done;
    case "in_progress":
      return styles.inProgress;
    case "blocked":
      return styles.blocked;
    default:
      return styles.pending;
  }
}

function formatChecklistStatus(status: ChecklistStatus) {
  switch (status) {
    case "done":
      return "Done";
    case "in_progress":
      return "In progress";
    case "blocked":
      return "Blocked";
    default:
      return "Pending";
  }
}

function getBuildClassName(status: ScreenBuildStatus) {
  switch (status) {
    case "built":
      return `${styles.screenBuild}`;
    case "polish":
      return `${styles.screenBuild} ${styles.polish}`;
    case "blocked":
      return `${styles.screenBuild} ${styles.blocked}`;
    default:
      return `${styles.screenBuild} ${styles.pending}`;
  }
}

function formatBuildStatus(status: ScreenBuildStatus) {
  switch (status) {
    case "built":
      return "Built";
    case "polish":
      return "Polish";
    case "blocked":
      return "Blocked";
    default:
      return "Pending";
  }
}

function getApprovalClassName(status: ScreenApprovalStatus) {
  switch (status) {
    case "wireframe_ready":
      return `${styles.screenApproval}`;
    case "ready_for_review":
      return `${styles.screenApproval} ${styles.readyForReview}`;
    case "approved":
      return `${styles.screenApproval} ${styles.approved}`;
    default:
      return `${styles.screenApproval} ${styles.mockupPending}`;
  }
}

function formatApprovalStatus(status: ScreenApprovalStatus) {
  switch (status) {
    case "wireframe_ready":
      return "Wireframe ready";
    case "ready_for_review":
      return "Ready for review";
    case "approved":
      return "Approved";
    default:
      return "Mockup pending";
  }
}

function getMockupClassName(status: ScreenMockupStatus) {
  return status === "ready" ? `${styles.mockupStatus} ${styles.ready}` : `${styles.mockupStatus} ${styles.pending}`;
}

function formatMockupStatus(status: ScreenMockupStatus) {
  return status === "ready" ? "Mockup ready" : "Mockup pending";
}

function renderPreview(screen: ScreenApprovalItem) {
  return (
    <div className={styles.previewPhone}>
      <div className={styles.previewNotch} />
      <div
        className={
          screen.mockupImageUrl
            ? `${styles.previewCanvas} ${styles.previewCanvasImageShell}`
            : styles.previewCanvas
        }
      >
        {screen.mockupImageUrl ? (
          <img
            alt={`${screen.title} mockup`}
            className={styles.previewImage}
            decoding="async"
            loading="lazy"
            src={screen.mockupImageUrl}
          />
        ) : (
          <>
            <span className={styles.previewEyebrow}>{screen.preview.eyebrow}</span>
            <h4>{screen.preview.title}</h4>
            <p>{screen.preview.body}</p>

            {screen.preview.chips?.length ? (
              <div className={styles.previewChips}>
                {screen.preview.chips.map((chip) => (
                  <span className={styles.previewChip} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.previewRows}>
              <span />
              <span />
              <span />
            </div>

            <div className={styles.previewButton}>{screen.preview.cta}</div>
          </>
        )}
      </div>
    </div>
  );
}

function renderInvoiceCard(invoice: InvoiceMilestone) {
  const paymentStatusClassName =
    invoice.paymentStatus === "paid"
      ? `${styles.invoiceStatus} ${styles.done}`
      : invoice.paymentStatus === "due"
        ? `${styles.invoiceStatus} ${styles.inProgress}`
        : `${styles.invoiceStatus} ${styles.pending}`;

  const paymentStatusLabel =
    invoice.paymentStatus === "paid"
      ? "Paid"
      : invoice.paymentStatus === "due"
        ? "Due"
        : "Upcoming";

  return (
    <article className={styles.invoiceCard} key={invoice.id}>
      <div className={styles.invoiceTop}>
        <div>
          <span className={styles.invoiceEyebrow}>Project fee milestone</span>
          <h3>{invoice.title}</h3>
        </div>
        <div className={styles.invoiceTopRight}>
          <span className={styles.invoicePercent}>{invoice.percentLabel}</span>
          <span className={paymentStatusClassName}>{paymentStatusLabel}</span>
        </div>
      </div>

      <div className={styles.invoiceAmount}>{invoice.amount}</div>

      <dl className={styles.invoiceMeta}>
        <div>
          <dt>Trigger</dt>
          <dd>{invoice.trigger}</dd>
        </div>
        <div>
          <dt>Due rule</dt>
          <dd>{invoice.dueRule}</dd>
        </div>
      </dl>

      <p className={styles.invoiceNote}>{invoice.note}</p>

      {invoice.paymentLinks?.length ? (
        <div className={styles.invoiceButtons}>
          {invoice.paymentLinks.map((paymentLink) => (
            <a
              className={styles.invoiceButton}
              href={paymentLink.href}
              key={paymentLink.href}
              rel="noreferrer"
              target="_blank"
            >
              {paymentLink.label}
            </a>
          ))}
        </div>
      ) : invoice.paymentLink ? (
        <div className={styles.invoiceButtons}>
          <a
            className={styles.invoiceButton}
            href={invoice.paymentLink}
            rel="noreferrer"
            target="_blank"
          >
            Pay with Stripe
          </a>
        </div>
      ) : null}
    </article>
  );
}

export default async function ProjectStatusPage({ searchParams }: ProjectStatusPageProps) {
  const authenticated = await isOwnerAuthenticated();
  const query = await searchParams;

  if (!authenticated) {
    return <LoginView destination="/project-status" hasError={query.error === "incorrect-password"} />;
  }

  const checklistItems = checklistGroups.flatMap((group) => group.items);
  const totalChecklistItems = checklistItems.length;
  const doneItems = checklistItems.filter((item) => item.status === "done").length;
  const blockedItems = checklistItems.filter((item) => item.status === "blocked").length;
  const totalScreens = screenApprovalGroups.flatMap((group) => group.items).length;
  const readyMockups = screenApprovalGroups
    .flatMap((group) => group.items)
    .filter((item) => item.mockupStatus === "ready").length;

  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.eyebrow}>Client build tracker</span>
              <h1>NurtureCal project status</h1>
            </div>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/">
                Website
              </Link>
              <Link className={styles.secondaryButton} href="/screen-previews">
                Screen previews
              </Link>
              <Link className={styles.secondaryButton} href="/questionaire">
                Questionnaire
              </Link>
            </div>
          </div>

          <p className={styles.heroIntro}>
            This page tracks final delivery status, payment milestones, and the completed
            launch checklist for the NurtureCal app and website.
          </p>

          <div className={styles.heroMeta}>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Checklist</span>
              <strong className={styles.metaValue}>{doneItems}/{totalChecklistItems}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Blocked</span>
              <strong className={styles.metaValue}>{blockedItems}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Screens</span>
              <strong className={styles.metaValue}>{totalScreens}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Real mockups</span>
              <strong className={styles.metaValue}>{readyMockups}</strong>
            </article>
          </div>

          <p className={styles.heroNote}>
            Development work and launch submission support are complete from the build side.
            App Store and Google Play review timing is controlled by Apple and Google.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>Invoice reference</h2>
            <p>
              Agreement-based payment milestones for the $11,500 project fee. These are
              internal reference cards for invoicing and follow the signed payment structure.
              The final remaining balance is $3,450.
            </p>
          </div>

          <div className={styles.invoiceGrid}>{invoiceMilestones.map(renderInvoiceCard)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>Completion checklist</h2>
            <p>Compact view of the completed delivery and launch-support items.</p>
          </div>

          <div className={styles.accordionStack}>
            {checklistGroups.map((group, index) => {
              const groupDone = group.items.filter((item) => item.status === "done").length;

              return (
                <details className={styles.accordion} key={group.id} open={index === 0}>
                  <summary className={styles.accordionSummary}>
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.summary}</p>
                    </div>
                    <span className={styles.groupCount}>
                      {groupDone}/{group.items.length} done
                    </span>
                  </summary>

                  <ul className={styles.itemList}>
                    {group.items.map((item) => (
                      <li className={styles.itemRow} key={item.label}>
                        <input
                          checked={item.status === "done"}
                          className={styles.checkbox}
                          readOnly
                          type="checkbox"
                        />
                        <div>
                          <div className={styles.itemLabel}>{item.label}</div>
                          {item.note ? <p className={styles.itemNote}>{item.note}</p> : null}
                        </div>
                        <span className={`${styles.statusPill} ${getChecklistClassName(item.status)}`}>
                          {formatChecklistStatus(item.status)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2>Delivered screen inventory</h2>
            <p>
              The launch app surfaces are listed here with stored review mockups tied to the
              delivered app inventory.
            </p>
          </div>

          <div className={styles.accordionStack}>
            {screenApprovalGroups.map((group, index) => (
              <details className={styles.accordion} key={group.id} open={index === 0}>
                <summary className={styles.accordionSummary}>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                  </div>
                  <span className={styles.groupCount}>{group.items.length} screens</span>
                </summary>

                <div className={styles.screenList}>
                  {group.items.map((screen) => (
                    <article className={styles.screenRow} key={screen.id}>
                      <div className={styles.screenThumb}>{renderPreview(screen)}</div>

                      <div className={styles.screenBody}>
                        <div className={styles.screenTop}>
                          <span className={styles.screenRoute}>{screen.route}</span>
                          <span className={getBuildClassName(screen.buildStatus)}>
                            {formatBuildStatus(screen.buildStatus)}
                          </span>
                          <span className={getApprovalClassName(screen.approvalStatus)}>
                            {formatApprovalStatus(screen.approvalStatus)}
                          </span>
                          <span className={getMockupClassName(screen.mockupStatus)}>
                            {formatMockupStatus(screen.mockupStatus)}
                          </span>
                        </div>

                        <h3>{screen.title}</h3>
                        <p className={styles.screenPurpose}>{screen.purpose}</p>
                        <p className={styles.screenNote}>{screen.note}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
