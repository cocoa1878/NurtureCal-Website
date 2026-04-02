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
  description: "Privacy policy overview for NurtureCal, operated by Copeland Legacy LLC."
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
          <h1>A clearer privacy overview for NurtureCal.</h1>
          <p>
            NurtureCal is operated by Copeland Legacy LLC, 17920 Huffmeister Rd.,
            Suite 220, Cypress, TX 77429. This page explains the current privacy
            approach for the website, waitlist, and app support experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What information the app may use</h2>
          <p>
            NurtureCal is designed around account setup, nutrition tracking, progress
            history, reminders, and app support. A full production privacy policy would
            describe how those details are collected, stored, and supported.
          </p>
          <ul>
            <li>Account data such as email and profile details</li>
            <li>Food logs, progress entries, and reminder preferences</li>
            <li>Analytics, crash reporting, and infrastructure providers used by the app</li>
            <li>Support requests and account-help communication</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How that information supports the app</h2>
          <p>
            The app uses this information to create nutrition targets, save meal and
            progress history, send reminders, improve reliability, and help users get
            support when needed. Questions about this policy can be sent to
            {" "}
            <a href="mailto:Realnurturingfnp@gmail.com">Realnurturingfnp@gmail.com</a>.
          </p>
          <p>
            As the app moves toward launch, this policy may expand on service providers,
            analytics, data retention, and user rights.
          </p>
        </section>
      </div>
    </main>
  );
}
