import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Manrope, Sora } from "next/font/google";
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
  title: {
    absolute: "NurtureCal | Balanced Nutrition Food Tracker"
  },
  description:
    "NurtureCal is a balanced nutrition food tracker for adults: set calorie and macro targets, log meals from food search or a photo, save meal ideas, and see your progress.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "NurtureCal | Balanced Nutrition Food Tracker",
    description:
      "Set calorie and macro targets, log meals from food search or a photo, save meal ideas, and see your progress with a balanced approach to nutrition.",
    url: "/",
    images: [
      {
        url: "/websitedemo/homepage-hero-v2.jpg",
        width: 2048,
        height: 1152,
        alt: "Woman preparing vegetables in a bright kitchen"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NurtureCal | Balanced Nutrition Food Tracker",
    description:
      "A balanced food tracker with personalized targets, flexible meal logging, and progress tracking.",
    images: ["/websitedemo/homepage-hero-v2.jpg"]
  },
  icons: {
    icon: "/websitedemo/icon.png"
  }
};

type FeatureIconKey = "balanced_plate" | "meal_structure" | "progress";
type BenefitIconKey = "target" | "carb_balance" | "clarity" | "progress";

const stats = [
  {
    value: "Protein + carb + veggies",
    label: "Every meal follows one clear structure that makes balanced eating easier to repeat."
  },
  {
    value: "3 ways to log",
    label: "Search food results, save custom foods, or review a meal photo before logging."
  },
  {
    value: "Personalized targets",
    label: "Guided onboarding turns your details into daily calorie and macro targets."
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
    title: "Log meals your way",
    copy:
      "Search food results, save your own custom foods, or review a meal photo before it goes into your log."
  },
  {
    icon: "progress",
    title: "Keep progress in view",
    copy:
      "See your daily targets alongside food logs, weight, and body measurements without adding more clutter."
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
      "You can log meals through food search, custom foods, and meal photo review. The app also keeps weight and basic body measurements visible over time."
  },
  {
    question: "Is NurtureCal medical care?",
    answer:
      "No. NurtureCal is a consumer wellness app for general nutrition support. It does not provide medical diagnosis, treatment, or individualized clinical care."
  },
  {
    question: "Who is NurtureCal designed for?",
    answer:
      "It is designed for adults who want a simpler, more sustainable approach to nutrition. It is not meant for pregnancy or breastfeeding support."
  }
];

const storeLinks = {
  apple: "https://apps.apple.com/us/app/nurturecal-food-tracker/id6767274219",
  google: "https://play.google.com/store/apps/details?id=com.nurturecal.app",
} as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "NurtureCal",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      url: "https://www.nurturecal.com/",
      image: "https://www.nurturecal.com/websitedemo/icon.png",
      description:
        "A balanced nutrition food tracker for adults with personalized calorie and macro targets, flexible meal logging, meal ideas, and progress tracking.",
      featureList: [
        "Personalized calorie and macro targets",
        "Food search and custom foods",
        "Meal photo review before logging",
        "Meal ideas",
        "Weight and body measurement tracking"
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ]
};

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
      <span className={styles.storeBadgeAssistive}>Download NurtureCal on {platform}</span>
    </a>
  );
}

export default function WebsiteDemoPage() {
  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
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

                <a className={styles.headerButton} href="#download">
                  Download App
                </a>
              </header>

              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Balanced nutrition for real life</p>
                <h1>A balanced food tracker for real life.</h1>
                <p className={styles.heroLead}>
                  Set a realistic calorie and macro target, then log meals with food
                  search, custom foods, or a photo you review before saving. Build
                  more balanced meals with protein, carbs, and vegetables - without
                  cutting foods you enjoy out of the picture.
                </p>

                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#download">
                    Download App
                  </a>
                  <a className={styles.secondaryButton} href="#features">
                    Explore Features
                  </a>
                </div>

                <p className={styles.heroNote}>
                  Available now for iPhone and Android.
                </p>

                <div className={styles.storeBadgeGroup} id="download">
                  <p className={styles.storeBadgeLabel}>Available now</p>
                  <div className={styles.storeBadgeRow}>
                    <StoreBadge
                      href={storeLinks.apple}
                      imageAlt="Download on the App Store"
                      imageHeight={320}
                      imageSrc="/websitedemo/app-store-badge.png"
                      imageWidth={640}
                      platform="App Store"
                    />
                    <StoreBadge
                      href={storeLinks.google}
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
              <li>Log meals with food search, custom foods, or photo review</li>
              <li>Use the protein + carb + veggies method to build balanced plates</li>
              <li>Save meal ideas and track weight and measurements over time</li>
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
            <h2>Keep the essentials in one simple routine.</h2>
            <p className={styles.supportIntro}>
              NurtureCal brings daily targets, flexible food logging, meal ideas, and
              progress tracking together for general wellness support. It is not a
              substitute for medical care or individualized clinical advice.
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

        <footer className={styles.footer} id="support">
          <div className={styles.footerBrand}>
            <Image alt="NurtureCal icon" height={42} src="/websitedemo/icon.png" width={42} />
            <span>NurtureCal</span>
          </div>

          <div className={styles.footerLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#download">Download</a>
            <a href="mailto:info@realnurturingfnp.com">Support</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <a className={styles.poweredBy} href="https://mesquared.ai" rel="noreferrer" target="_blank">
            <span>Email Marketing Powered by</span>
            <Image alt="MeSquared" height={27} src="/mesquared-logo.svg" width={152} />
          </a>

          <div className={styles.footerBadges}>
            <p className={styles.storeBadgeLabel}>Available now</p>
            <div className={styles.storeBadgeRow}>
              <StoreBadge
                href={storeLinks.apple}
                imageAlt="Download on the App Store"
                imageHeight={320}
                imageSrc="/websitedemo/app-store-badge.png"
                imageWidth={640}
                platform="App Store"
              />
              <StoreBadge
                href={storeLinks.google}
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
