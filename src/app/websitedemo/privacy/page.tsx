import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import styles from "../legal.module.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "NurtureCal Privacy Policy",
  description: "Privacy policy for the NurtureCal website, waitlist, and app experience operated by Copeland Legacy LLC."
};

export default function WebsiteDemoPrivacyPage() {
  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <div className={styles.shell}>
        <div className={styles.topBar}>
          <Link className={styles.backLink} href="/">
            Back to NurtureCal
          </Link>
          <span>Privacy policy</span>
        </div>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Privacy policy</p>
          <h1>NurtureCal privacy policy.</h1>
          <p>
            Effective date: April 1, 2026. NurtureCal is operated by Copeland
            Legacy LLC, 17920 Huffmeister Rd., Suite 220, Cypress, TX 77429.
            This policy applies to the NurtureCal website, waitlist, mobile app,
            and support experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What information we collect</h2>
          <p>
            We collect information you provide directly, information created while
            using the app, and limited technical information needed to operate the
            service.
          </p>
          <ul>
            <li>Waitlist and support details such as your name, email address, and messages you send us</li>
            <li>Account and profile details such as email, age, sex, height, current weight, goal weight, training mode, reminder preference, and selected wellness settings</li>
            <li>Nutrition and progress data such as calorie targets, macro targets, food logs, custom foods, meal photos you choose to upload, meal suggestions, weight entries, and body measurements</li>
            <li>Subscription and entitlement records needed to manage paid access, such as plan status and store transaction references</li>
            <li>Technical and operational information such as device, browser, IP, server logs, and request metadata used for reliability, fraud prevention, and security</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How we use that information</h2>
          <p>
            We use personal information to operate NurtureCal, respond to support
            requests, and improve the reliability of the service. That includes:
          </p>
          <ul>
            <li>Creating and securing your account</li>
            <li>Calculating nutrition targets and presenting your in-app dashboard</li>
            <li>Saving your food logs, progress history, reminder settings, and waitlist signup</li>
            <li>Processing meal-photo analysis and meal suggestions when you choose to use those features</li>
            <li>Sending waitlist, support, or transactional emails</li>
            <li>Monitoring performance, preventing abuse, troubleshooting issues, and complying with legal obligations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How we share information</h2>
          <p>
            We do not sell your personal information. We share information only
            with service providers and partners that help us operate NurtureCal
            or when required by law.
          </p>
          <ul>
            <li>Vercel for website hosting and delivery</li>
            <li>Supabase for authentication, database storage, and backend functions</li>
            <li>Resend for waitlist and transactional email delivery</li>
            <li>OpenAI for optional AI-powered meal photo analysis and meal suggestions</li>
            <li>USDA FoodData Central for food-search data</li>
            <li>Apple, Google, and RevenueCat for platform billing, subscription management, and app distribution when those services are used</li>
            <li>Professional advisers, regulators, or law enforcement when required to protect rights, safety, or legal compliance</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Retention and deletion</h2>
          <p>
            We retain waitlist submissions, account information, food logs, progress
            history, and support records for as long as reasonably needed to operate
            the service, maintain backups, prevent fraud, resolve disputes, and comply
            with legal obligations.
          </p>
          <p>
            If you want us to delete your waitlist or account data, email{" "}
            <a href="mailto:Realnurturingfnp@gmail.com">Realnurturingfnp@gmail.com</a>.
            We may keep limited records when necessary for security, billing, tax,
            or legal compliance. Apple’s App Review Guidelines currently require a
            privacy policy to explain retention and deletion practices and how users
            can request deletion.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your choices</h2>
          <ul>
            <li>You can ask to access, correct, or delete information we hold about you</li>
            <li>You can unsubscribe from marketing-style email updates at any time</li>
            <li>You can manage push-notification permissions in your device settings</li>
            <li>You can stop using the app at any time, though some records may remain during the retention periods described above</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Children and sensitive situations</h2>
          <p>
            NurtureCal is intended for adults and is not directed to children under
            18. It is a consumer wellness product, not a medical device, and it is
            not intended for pregnancy or breastfeeding support, emergencies, or
            urgent care decisions. Please avoid uploading highly sensitive medical
            records or information that is not needed for the app to function.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security, changes, and contact</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards,
            but no online service can guarantee absolute security. If our privacy
            practices change, we will update this page and revise the effective date.
          </p>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:Realnurturingfnp@gmail.com">Realnurturingfnp@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
