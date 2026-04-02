import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

type FeatureIconKey = "balanced_plate" | "meal_structure" | "clinical_support";
type BenefitIconKey = "target" | "carb_balance" | "clarity" | "progress";

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

const features: Array<{
  icon: FeatureIconKey;
  title: string;
  copy: string;
}> = [
  {
    icon: "balanced_plate",
    title: "Balanced eating with carbs",
    copy:
      "Rice, potatoes, fruit, and bread stay on the table. The focus is balance, portions, and pairing carbs with protein."
  },
  {
    icon: "meal_structure",
    title: "Simple meal structure",
    copy:
      "Every meal is built around protein, carbohydrates, and vegetables so healthy eating feels clear, not complicated."
  },
  {
    icon: "clinical_support",
    title: "Healthcare-professional design",
    copy:
      "NurtureCal is grounded in the practical guidance a licensed healthcare professional uses with real patients."
  }
];

const benefitCards: Array<{
  icon: BenefitIconKey;
  title: string;
  copy: string;
}> = [
  {
    icon: "target",
    title: "Start with a realistic target",
    copy:
      "Guided onboarding turns the basics into a daily calorie and macro target that feels usable in real life."
  },
  {
    icon: "carb_balance",
    title: "Keep carbs in the plan",
    copy:
      "The method does not ask you to cut carbs out. It helps you pair them better so meals stay satisfying and structured."
  },
  {
    icon: "clarity",
    title: "Reduce decision fatigue",
    copy:
      "A repeatable plate structure makes it easier to know what to eat without starting from zero every time."
  },
  {
    icon: "progress",
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

function renderIcon(icon: FeatureIconKey | BenefitIconKey) {
  switch (icon) {
    case "balanced_plate":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 3.75v16.5M5.75 12h12.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M12 12c0-2.35 1.9-4.25 4.25-4.25" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "meal_structure":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect x="5" y="4.5" width="14" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M9 8.75h6M9 12h6M9 15.25h3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="m6.9 8.7.9.9 1.6-1.8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "clinical_support":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 4.25 6.5 6.4v4.9c0 3.45 2.15 6.6 5.5 8.45 3.35-1.85 5.5-5 5.5-8.45V6.4Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M12 8.35v5.1M9.45 10.9h5.1" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "target":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="0.85" fill="currentColor" />
        </svg>
      );
    case "carb_balance":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5.5 13.75h13a5 5 0 0 1-13 0Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M8.1 10.2c.55-.95 1.55-1.7 2.8-1.7 1.2 0 1.75.55 2.55.55 1 0 1.55-.85 2.55-.85.85 0 1.6.4 2.15 1.1" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M9 6.25c.3.95.2 1.9-.25 2.65M13.25 5.75c.2.95.05 1.85-.4 2.55" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "clarity":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m7 6.5 4.75 4.75M11.75 11.25 7 16M17 6.5h-2.5M17 12h-4.25M17 17.5h-6.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "progress":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5.5 17.5V6.5M5.5 17.5h13M8.5 14l3-3 2.5 2.5 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function StoreBadge({
  href,
  imageAlt,
  imageHeight,
  imageSrc,
  imageWidth,
  platform
}: {
  href: string;
  imageAlt: string;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  platform: string;
}) {
  return (
    <a className={styles.storeBadge} href={href}>
      <Image
        alt={imageAlt}
        className={styles.storeBadgeImage}
        height={imageHeight}
        sizes="(max-width: 560px) 170px, 184px"
        src={imageSrc}
        width={imageWidth}
      />
      <span className={styles.storeBadgeAssistive}>Coming soon on {platform}</span>
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

                <div className={styles.storeBadgeGroup}>
                  <p className={styles.storeBadgeLabel}>Coming Soon</p>
                  <div className={styles.storeBadgeRow}>
                    <StoreBadge
                      href="#waitlist"
                      imageAlt="Download on the App Store"
                      imageHeight={320}
                      imageSrc="/websitedemo/app-store-badge.png"
                      imageWidth={640}
                      platform="App Store"
                    />
                    <StoreBadge
                      href="#waitlist"
                      imageAlt="Get it on Google Play"
                      imageHeight={670}
                      imageSrc="/websitedemo/google-play-badge.png"
                      imageWidth={1920}
                      platform="Google Play"
                    />
                  </div>
                </div>
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
                <div className={styles.featureIcon}>{renderIcon(feature.icon)}</div>
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
                  <div className={styles.benefitBadge}>{renderIcon(card.icon)}</div>
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
                <a href="mailto:Realnurturingfnp@gmail.com">Realnurturingfnp@gmail.com</a>.
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
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <div className={styles.footerBadges}>
            <p className={styles.storeBadgeLabel}>Coming Soon</p>
            <div className={styles.storeBadgeRow}>
              <StoreBadge
                href="#waitlist"
                imageAlt="Download on the App Store"
                imageHeight={320}
                imageSrc="/websitedemo/app-store-badge.png"
                imageWidth={640}
                platform="App Store"
              />
              <StoreBadge
                href="#waitlist"
                imageAlt="Get it on Google Play"
                imageHeight={670}
                imageSrc="/websitedemo/google-play-badge.png"
                imageWidth={1920}
                platform="Google Play"
              />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
