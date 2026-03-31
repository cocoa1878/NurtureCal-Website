import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Sora } from "next/font/google";
import {
  screenApprovalGroups,
  type ScreenApprovalItem,
  type ScreenApprovalStatus,
  type ScreenBuildStatus,
  type ScreenMockupStatus
} from "@/lib/project-status";
import styles from "./page.module.css";

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
  title: "NurtureCal Screen Previews",
  description:
    "Approval gallery for the NurtureCal app screens, using structured preview mockups tied to the real route inventory.",
  icons: {
    icon: "/websitedemo/icon.png"
  }
};

function getBuildClassName(status: ScreenBuildStatus) {
  switch (status) {
    case "built":
      return `${styles.statusPill} ${styles.built}`;
    case "polish":
      return `${styles.statusPill} ${styles.wireframeReady}`;
    case "blocked":
      return `${styles.statusPill} ${styles.mockupPending}`;
    default:
      return `${styles.statusPill} ${styles.mockupPending}`;
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
      return `${styles.statusPill} ${styles.wireframeReady}`;
    case "ready_for_review":
      return `${styles.statusPill} ${styles.readyForReview}`;
    case "approved":
      return `${styles.statusPill} ${styles.approved}`;
    default:
      return `${styles.statusPill} ${styles.mockupPending}`;
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
  return status === "ready"
    ? `${styles.statusPill} ${styles.approved}`
    : `${styles.statusPill} ${styles.mockupPending}`;
}

function formatMockupStatus(status: ScreenMockupStatus) {
  return status === "ready" ? "Mockup ready" : "Mockup pending";
}

function getWidgetVariant(screen: ScreenApprovalItem) {
  const onboardingId = /^step-\d+$/.test(screen.id);

  if (screen.id === "paywall") {
    return "paywall";
  }

  if (screen.id === "dashboard") {
    return "dashboard";
  }

  if (screen.id === "progress" || screen.id === "weight-entry" || screen.id === "measurement-entry") {
    return "progress";
  }

  if (
    screen.id === "meal-photo-capture" ||
    screen.id === "meal-photo-review"
  ) {
    return "photo";
  }

  if (
    screen.id === "food-search" ||
    screen.id === "food-review" ||
    screen.id === "custom-food-editor" ||
    screen.id === "meal-suggestion-detail"
  ) {
    return "food";
  }

  if (screen.id === "profile" || screen.id === "settings") {
    return "profile";
  }

  if (screen.id === "auth" || screen.id === "step-14") {
    return "form";
  }

  if (
    onboardingId &&
    ["step-3", "step-4", "step-9", "step-10", "step-12"].includes(screen.id)
  ) {
    return "choices";
  }

  if (
    onboardingId &&
    ["step-5", "step-6", "step-7", "step-8", "step-11"].includes(screen.id)
  ) {
    return "form";
  }

  if (onboardingId && ["step-13", "step-15"].includes(screen.id)) {
    return "summary";
  }

  return "intro";
}

function renderWidgetStack(screen: ScreenApprovalItem) {
  const variant = getWidgetVariant(screen);

  if (variant === "paywall") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetPrice} />
        <div className={styles.widgetPrice} />
        <div className={styles.widgetLarge} />
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetLarge} />
        <div className={styles.widgetChart} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "progress") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetChart} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "photo") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetPhoto} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "food") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetLarge} />
        <div className={styles.widget} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetLarge} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widget} />
        <div className={styles.widget} />
        <div className={styles.widget} />
      </div>
    );
  }

  if (variant === "choices") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetChoice} />
        <div className={styles.widgetChoice} />
        <div className={styles.widgetChoice} />
      </div>
    );
  }

  if (variant === "summary") {
    return (
      <div className={styles.widgetStack}>
        <div className={styles.widgetLarge} />
        <div className={styles.widgetLarge} />
      </div>
    );
  }

  return (
    <div className={styles.widgetStack}>
      <div className={styles.widgetLarge} />
      <div className={styles.widget} />
      <div className={styles.widget} />
    </div>
  );
}

function renderTabs(screen: ScreenApprovalItem) {
  if (!["dashboard", "progress", "profile"].includes(screen.id)) {
    return null;
  }

  return (
    <div className={styles.bottomTabs}>
      <span />
      <span />
      <span />
    </div>
  );
}

function renderMockup(screen: ScreenApprovalItem) {
  return (
    <div className={styles.phoneFrame}>
      <div className={styles.phoneNotch} />
      <div className={styles.phoneCanvas}>
        <span className={styles.mockupEyebrow}>{screen.preview.eyebrow}</span>
        <h4>{screen.preview.title}</h4>
        <p className={styles.mockupCopy}>{screen.preview.body}</p>

        {screen.preview.chips?.length ? (
          <div className={styles.chipRow}>
            {screen.preview.chips.map((chip) => (
              <span className={styles.chip} key={chip}>
                {chip}
              </span>
            ))}
          </div>
        ) : null}

        {renderWidgetStack(screen)}
        <div className={styles.mockupButton}>{screen.preview.cta}</div>
        {renderTabs(screen)}
      </div>
    </div>
  );
}

export default function ScreenPreviewsPage() {
  const totalScreens = screenApprovalGroups.flatMap((group) => group.items).length;
  const builtScreens = screenApprovalGroups
    .flatMap((group) => group.items)
    .filter((item) => item.buildStatus === "built").length;
  const readyForReviewScreens = screenApprovalGroups
    .flatMap((group) => group.items)
    .filter((item) => item.approvalStatus === "ready_for_review" || item.approvalStatus === "approved").length;
  const realMockupScreens = screenApprovalGroups
    .flatMap((group) => group.items)
    .filter((item) => item.mockupStatus === "ready").length;

  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.eyebrow}>Approval gallery</span>
              <h1>NurtureCal screen previews</h1>
            </div>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/project-status">
                Project status
              </Link>
              <Link className={styles.secondaryButton} href="/">
                Website
              </Link>
            </div>
          </div>

          <p className={styles.heroIntro}>
            This gallery shows all current approval surfaces for the app. These are
            structured preview mockups tied to the real screen inventory, not literal
            simulator screenshots yet.
          </p>

          <div className={styles.heroMeta}>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Total screens</span>
              <strong className={styles.metaValue}>{totalScreens}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Built in app</span>
              <strong className={styles.metaValue}>{builtScreens}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Ready for approval</span>
              <strong className={styles.metaValue}>{readyForReviewScreens}</strong>
            </article>
            <article className={styles.metaCard}>
              <span className={styles.metaLabel}>Real mockups</span>
              <strong className={styles.metaValue}>{realMockupScreens}</strong>
            </article>
          </div>

          <p className={styles.heroNote}>
            Honest note: the screens exist in the mobile app code today. What we still do
            not have is an exported set of real captured screenshots. This gallery is the
            review system until we can capture the app directly.
          </p>

          <nav className={styles.sectionNav}>
            {screenApprovalGroups.map((group) => (
              <a className={styles.navChip} href={`#${group.id}`} key={group.id}>
                {group.title}
              </a>
            ))}
          </nav>
        </section>

        {screenApprovalGroups.map((group) => (
          <section className={styles.section} id={group.id} key={group.id}>
            <div className={styles.groupSection}>
              <div className={styles.groupHeader}>
                <h2>{group.title}</h2>
                <p>{group.summary}</p>
              </div>

              <div className={styles.screenGrid}>
                {group.items.map((screen) => (
                  <article className={styles.screenCard} key={screen.id}>
                    <div className={styles.screenMockup}>{renderMockup(screen)}</div>

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
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
