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
  title: "NurtureCal Terms of Service",
  description: "Terms of service overview for NurtureCal, a consumer wellness app from Copeland Legacy LLC."
};

export default function WebsiteDemoTermsPage() {
  return (
    <main className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
      <div className={styles.shell}>
        <div className={styles.topBar}>
          <Link className={styles.backLink} href="/">
            Back to NurtureCal
          </Link>
          <span>Terms of service</span>
        </div>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Terms of service</p>
          <h1>Simple launch terms for a consumer wellness app.</h1>
          <p>
            These terms reflect the current NurtureCal launch scope and provide the
            public-facing service overview for the app and website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Using NurtureCal</h2>
          <p>
            By using NurtureCal, users agree to use the app responsibly and not misuse
            or attempt to disrupt the service. NurtureCal provides wellness tools and
            features intended to support the user experience, but it does not provide
            medical, legal, or financial advice.
          </p>
          <ul>
            <li>Accounts that violate the terms may be suspended or terminated</li>
            <li>Continued use constitutes acceptance of future updates to the terms</li>
            <li>The app is intended for consumer wellness support, not clinical treatment</li>
            <li>Support questions can be sent to info@realnurturingfnp.com</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Subscriptions and refunds</h2>
          <p>
            Current launch pricing is planned as a 7-day free trial, $14.99 monthly,
            or $59.99 annually. Users may cancel a subscription at any time.
          </p>
          <p>
            If a user cancels within 14 days of the initial purchase, they are eligible
            for a full refund. After 14 days, refunds are not provided for the current
            billing cycle.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Business details</h2>
          <p>
            NurtureCal is being launched by Copeland Legacy LLC, 17920 Huffmeister Rd.,
            Suite 220, Cypress, TX 77429.
          </p>
          <p>
            Final store language and legal review may refine the wording before public launch.
          </p>
        </section>
      </div>
    </main>
  );
}
