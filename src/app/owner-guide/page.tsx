import type { Metadata } from "next";
import Link from "next/link";
import GuideShell from "./GuideShell";
import LoginView from "./LoginView";
import { isOwnerAuthenticated } from "./auth";
import styles from "./owner-guide.module.css";

export const metadata: Metadata = {
  title: "NurtureCal Owner Guide",
  description: "Corinne's private guide to NurtureCal downloads, members, and Apple Ads.",
  robots: { index: false, follow: false },
};

type OwnerGuidePageProps = {
  searchParams: Promise<{ error?: string }>;
};

const cards = [
  {
    href: "/owner-guide/downloads",
    icon: "↓",
    title: "How many downloaded?",
    copy: "See new Apple and Android downloads.",
    tone: "teal",
  },
  {
    href: "/owner-guide/members",
    icon: "♥",
    title: "How many are paying?",
    copy: "See trials, members, and subscription revenue.",
    tone: "orange",
  },
  {
    href: "/owner-guide/apple-ads",
    icon: "↗",
    title: "How are my ads doing?",
    copy: "See spend, installs, and cost per install.",
    tone: "gold",
  },
] as const;

export default async function OwnerGuidePage({ searchParams }: OwnerGuidePageProps) {
  const authenticated = await isOwnerAuthenticated();
  const query = await searchParams;

  if (!authenticated) {
    return <LoginView hasError={query.error === "incorrect-password"} />;
  }

  return (
    <GuideShell>
      <header className={styles.topbar}>
        <span>Guide updated July 9, 2026</span>
        <span className={styles.avatar} aria-label="Corinne">C</span>
      </header>

      <section className={styles.homeHero}>
        <p className={styles.eyebrow}>Your NurtureCal owner guide</p>
        <h1>Hi Corinne, what would you like to check?</h1>
        <p className={styles.heroIntro}>Choose the question that sounds most like yours. We’ll take you directly to the right place and show you exactly what to look for.</p>

        <div className={styles.questionGrid}>
          {cards.map((card) => (
            <Link className={styles.questionCard} data-tone={card.tone} href={card.href} key={card.href}>
              <span className={styles.questionIcon} aria-hidden="true">{card.icon}</span>
              <strong>{card.title}</strong>
              <span>{card.copy}</span>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>

        <p className={styles.returnNote}><i /> You’ll always return to this page when you sign in.</p>
      </section>
    </GuideShell>
  );
}
