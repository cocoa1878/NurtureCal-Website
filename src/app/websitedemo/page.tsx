import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Manrope, Sora } from "next/font/google";
import { WaitlistForm } from "@/components/waitlist-form";
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
  title: "NurtureCal | Balanced nutrition for real life",
  description:
    "NurtureCal is a balanced nutrition app built around protein, carbs, and vegetables, with realistic tracking and a simple structure that works in real life.",
  icons: {
    icon: "/websitedemo/icon.png"
  }
};

const stats = [
  {
    value: "Protein + carb + veggies",
    label: "Every meal follows one clear structure that makes balanced eating easier to repeat."
  },
  {
    value: "3 ways to log",
    label: "Search USDA foods, save custom foods, or review a meal photo before logging."
  },
  {
    value: "Clinician-informed",
    label: "The method is shaped by a healthcare professional and built for real-life follow-through."
  }
];

const features = [
  {
    icon: "BC",
    title: "Balanced eating with carbs",
    copy:
      "Rice, potatoes, fruit, and bread stay on the table. The focus is balance, portions, and pairing carbs with protein."
  },
  {
    icon: "SM",
    title: "Simple meal structure",
    copy:
      "Every meal is built around protein, carbohydrates, and vegetables so healthy eating feels clear, not complicated."
  },
  {
    icon: "HP",
    title: "Healthcare-professional design",
    copy:
      "NurtureCal is grounded in the practical guidance a licensed healthcare professional uses with real patients."
  }
];

const benefitCards = [
  {
    badge: "AM",
    title: "Start with a realistic target",
    copy:
      "Guided onboarding turns the basics into a daily calorie and macro target that feels usable in real life."
  },
  {
    badge: "LN",
    title: "Keep carbs in the plan",
    copy:
      "The method does not ask you to cut carbs out. It helps you pair them better so meals stay satisfying and structured."
  },
  {
    badge: "PM",
    title: "Reduce decision fatigue",
    copy:
      "A repeatable plate structure makes it easier to know what to eat without starting from zero every time."
  },
  {
    badge: "WK",
    title: "Track progress without obsession",
    copy:
      "Calories still matter, but the app keeps progress visible without making every day revolve around numbers."
  }
];

const faqs = [
  {
    question: "Do I have to cut carbs to use NurtureCal?",
    answer:
      "No. NurtureCal is built around balanced meals, not carb cutting. The method focuses on pairing carbs with protein and vegetables so meals stay structured and satisfying."
  },
  {
    question: "What can I log in the app?",
    answer:
      "You can log meals through USDA food search, custom foods, and meal photo review. The app also keeps weight and basic body measurements visible over time."
  },
  {
    question: "Will there be a free trial?",
    answer:
      "Yes. The launch plan includes a 7-day free trial on the annual plan, with monthly and annual subscription options."
  },
  {
    question: "Who is NurtureCal designed for?",
    answer:
      "It is designed for adults who want a simpler, more sustainable approach to nutrition. It is not meant for pregnancy or breastfeeding support."
  }
];

function AppStoreIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M15.5 3.4c.9-1.1 1.4-2.5 1.3-3.4-1.3.1-2.7.9-3.6 2-.8.9-1.5 2.3-1.3 3.6 1.4.1 2.7-.7 3.6-2.2Zm4.1 14.8c-.5 1.1-.8 1.6-1.4 2.6-.8 1.3-1.9 2.9-3.3 2.9-1.2 0-1.5-.8-3.2-.8s-2.1.8-3.3.8c-1.4 0-2.4-1.4-3.2-2.7C3 18.2 1.6 13.8 3.4 10.8c.9-1.5 2.4-2.4 3.9-2.4 1.3 0 2.4.8 3.6.8 1.2 0 2-.8 3.6-.8 1.4 0 2.9.8 3.8 2.2-3.4 1.8-2.9 6.6 1.3 7.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 2.8 13.9 12 3 21.2Z" fill="#00d07a" />
      <path d="M13.9 12 17.2 8.7 21.1 10.9c1.2.7 1.2 1.6 0 2.2l-3.9 2.2Z" fill="#ffd24a" />
      <path d="M3 2.8 17.2 8.7 13.9 12Z" fill="#3aa0ff" />
      <path d="M3 21.2 13.9 12 17.2 15.3Z" fill="#ff6d5a" />
    </svg>
  );
}

function StoreBadge({
  href,
  icon,
  platform
}: {
  href: string;
  icon: ReactNode;
  platform: string;
}) {
  return (
    <a className={styles.storeBadge} href={href}>
      <span className={styles.storeBadgeIcon}>{icon}</span>
      <span className={styles.storeBadgeCopy}>
        <span>Coming soon</span>
        <strong>{platform}</strong>
      </span>
    </a>
  );
}

export default function WebsiteDemoPage() {
  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <div className={styles.shell}>
        <section className={styles.heroSection}>
          <div className={styles.heroStage}>
            <Image
              alt="Woman preparing vegetables in a bright kitchen"
              className={styles.heroBackdrop}
              height={1152}
              priority
              sizes="100vw"
              src="/websitedemo/homepage-hero-v2.jpg"
              width={2048}
            />
            <div className={styles.heroWash} />
            <div className={styles.heroOverlay}>
              <header className={`${styles.header} ${styles.heroHeader}`}>
                <Link className={styles.brand} href="/">
                  <Image
                    alt="NurtureCal icon"
                    className={styles.brandIcon}
                    height={44}
                    priority
                    src="/websitedemo/icon.png"
                    width={44}
                  />
                  <span>NurtureCal</span>
                </Link>

                <nav className={styles.nav}>
                  <a href="#features">Features</a>
                  <a href="#how-it-works">How It Works</a>
                  <a href="#faq">FAQ</a>
                  <Link href="/privacy">Privacy</Link>
                </nav>

                <a className={styles.headerButton} href="#waitlist">
                  Join Waitlist
                </a>
              </header>

              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Balanced nutrition for real life</p>
                <h1>A simple, balanced way to eat - no carb cutting, just real structure that works.</h1>
                <p className={styles.heroLead}>
                  NurtureCal uses a simple, sustainable approach to nutrition:
                  every meal is built with protein, carbohydrates, and vegetables.
                  The focus is balance, portion control, and consistency so weight
                  loss feels more doable long term.
                </p>

                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#waitlist">
                    Join Waitlist
                  </a>
                  <a className={styles.secondaryButton} href="#features">
                    Explore Features
                  </a>
                </div>

                <p className={styles.heroNote}>
                  Balanced eating with carbs, a simple daily structure, and support
                  designed by a healthcare professional.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statsBand}>
            {stats.map((stat) => (
              <article key={stat.value} className={styles.statCard}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="features">
          <div className={styles.sectionHeading}>
            <h2>Why people choose NurtureCal</h2>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.showcaseSection}`} id="how-it-works">
          <div className={styles.showcaseMedia}>
            <div className={styles.showcaseGlow} />
            <div className={styles.laptopMock}>
              <Image
                alt="NurtureCal dashboard mockup on a laptop"
                className={styles.showcaseLaptopImage}
                height={1013}
                sizes="(max-width: 760px) 92vw, (max-width: 1200px) 54vw, 720px"
                src="/websitedemo/laptop-mock.png"
                width={1705}
              />
            </div>
          </div>

          <div className={styles.showcaseCopy}>
            <p className={styles.showcaseKicker}>How it works</p>
            <h2>Build balanced meals, log them fast, and keep moving through the day.</h2>
            <p>
              NurtureCal turns one simple method into a calmer app flow. You set a
              realistic target once, log meals the way that feels easiest, and keep
              progress visible without turning healthy eating into a full-time task.
            </p>

            <ul className={styles.showcaseList}>
              <li>Start with guided calorie and macro targets from onboarding</li>
              <li>Log meals with USDA search, custom foods, or photo review</li>
              <li>Use the protein + carb + veggies method to build balanced plates</li>
              <li>Track weight and measurements without clutter or overwhelm</li>
            </ul>

            <div className={styles.showcasePhone}>
              <div className={styles.showcasePhoneGlow} />
              <div className={styles.showcasePhoneMock}>
                <Image
                  alt="NurtureCal mobile mockup on a phone"
                  className={styles.showcasePhoneImage}
                  height={1079}
                  sizes="(max-width: 760px) 48vw, 220px"
                  src="/websitedemo/phone-mock.png"
                  width={563}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.supportHeading}>
            <p className={styles.supportKicker}>Built for follow-through</p>
            <h2>The routine is designed for real life, not perfect days.</h2>
            <p className={styles.supportIntro}>
              Some users following the method consistently reported losing an average
              of 10-15 lbs within 8-12 weeks. Individual results vary.
            </p>
          </div>

          <div className={styles.benefitGrid}>
            {benefitCards.map((card) => (
              <article key={card.title} className={styles.benefitCard}>
                <div className={styles.benefitTopRow}>
                  <div className={styles.benefitBadge}>{card.badge}</div>
                  <div className={styles.benefitStars}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <p className={styles.benefitCopy}>{card.copy}</p>
                <strong>{card.title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.sectionHeading}>
            <h2>Questions people usually ask first</h2>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <article key={faq.question} className={styles.faqCard}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.waitlistSection}`} id="waitlist">
          <div className={styles.waitlistPanel}>
            <div className={styles.waitlistCopy}>
              <p className={styles.supportKicker}>Join the waitlist</p>
              <h2>Start building interest before the app officially launches.</h2>
              <p>
                Join the NurtureCal waitlist for launch updates, early access news,
                and the first invitation when the app opens.
              </p>

              <ul className={styles.waitlistList}>
                <li>Be first to hear when early access opens</li>
                <li>See launch updates as the app gets closer</li>
                <li>Stay connected without committing to anything yet</li>
              </ul>

              <p className={styles.waitlistSupport}>
                Support questions can be sent to{" "}
                <a href="mailto:info@realnurturingfnp.com">info@realnurturingfnp.com</a>.
              </p>
            </div>

            <WaitlistForm />
          </div>
        </section>

        <footer className={styles.footer} id="support">
          <div className={styles.footerBrand}>
            <Image alt="NurtureCal icon" height={42} src="/websitedemo/icon.png" width={42} />
            <span>NurtureCal</span>
          </div>

          <div className={styles.footerLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#waitlist">Waitlist</a>
            <Link href="/project-status">Build Status</Link>
            <Link href="/screen-previews">Screen Previews</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <div className={styles.footerBadges}>
            <StoreBadge href="#waitlist" icon={<AppStoreIcon />} platform="App Store" />
            <StoreBadge href="#waitlist" icon={<GooglePlayIcon />} platform="Google Play" />
          </div>
        </footer>
      </div>
    </main>
  );
}
