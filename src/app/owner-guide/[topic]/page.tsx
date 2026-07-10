import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import GuideShell from "../GuideShell";
import { isOwnerAuthenticated } from "../auth";
import { guides, isGuideTopic } from "../guide-content";
import styles from "../owner-guide.module.css";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const guide = isGuideTopic(topic) ? guides[topic] : null;

  return {
    title: guide ? `${guide.title} | NurtureCal Owner Guide` : "NurtureCal Owner Guide",
    robots: { index: false, follow: false },
  };
}

export default async function OwnerGuideTopicPage({ params }: TopicPageProps) {
  if (!(await isOwnerAuthenticated())) {
    redirect("/owner-guide");
  }

  const { topic } = await params;
  if (!isGuideTopic(topic)) {
    notFound();
  }

  const guide = guides[topic];

  return (
    <GuideShell activeTopic={guide.topic}>
      <div className={styles.guideTopbar}>
        <Link href="/owner-guide">← Back to start</Link>
        <span>Private owner guide</span>
      </div>

      <article className={styles.guideArticle}>
        <header className={styles.guideHeader}>
          <p className={styles.eyebrow}>{guide.eyebrow}</p>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
        </header>

        <aside className={styles.answerCard}>
          <span>The short answer</span>
          <p>{guide.answer}</p>
        </aside>

        <div className={styles.guideSections}>
          {guide.sections.map((section) => (
            <section className={styles.guideSection} key={section.label}>
              <div className={styles.sectionCopy}>
                <p className={styles.sectionLabel}>{section.label}</p>
                <h2>{section.title}</h2>
                <p className={styles.sectionIntro}>{section.intro}</p>
                <ol>
                  {section.steps.map((step, index) => (
                    <li key={step}><b>{index + 1}</b><span>{step}</span></li>
                  ))}
                </ol>
                <a className={styles.destinationButton} href={section.destinationUrl} rel="noreferrer" target="_blank">
                  {section.destinationLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className={styles.screenExample} aria-label={`Example showing ${section.lookFor}`}>
                <div className={styles.browserChrome}><i /><i /><i /><span>Secure account dashboard</span></div>
                <div className={styles.browserContent}>
                  <div className={styles.browserHeading}><span>Overview</span><small>Last Month⌄</small></div>
                  <div className={styles.mockChart} aria-hidden="true">
                    <i style={{ height: "34%" }} /><i style={{ height: "52%" }} /><i style={{ height: "45%" }} /><i style={{ height: "72%" }} /><i style={{ height: "61%" }} /><i style={{ height: "88%" }} />
                  </div>
                  <div className={styles.lookHere}><b>LOOK HERE</b><span><strong>{section.lookFor}</strong><small>Your real number will appear in your account.</small></span></div>
                </div>
                {section.note ? <p className={styles.sectionNote}><b>Good to know:</b> {section.note}</p> : null}
              </div>
            </section>
          ))}
        </div>

        <footer className={styles.guideFooter}>
          <span>Finished?</span>
          <h2>That’s all you need for this check.</h2>
          <Link href="/owner-guide">Return to the owner guide</Link>
        </footer>
      </article>
    </GuideShell>
  );
}
