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
  description: "Terms of service for the NurtureCal website and app from Copeland Legacy LLC."
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
          <h1>NurtureCal terms of service.</h1>
          <p>
            Effective date: April 1, 2026. These terms govern use of the NurtureCal
            website, waitlist, and mobile app offered by Copeland Legacy LLC.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Acceptance and eligibility</h2>
          <p>
            By accessing or using NurtureCal, you agree to these terms. You must be
            at least 18 years old and able to form a binding agreement to use the service.
          </p>
          <ul>
            <li>NurtureCal is intended for consumer wellness support, not clinical treatment</li>
            <li>The app is not designed for emergencies, diagnosis, pregnancy support, or breastfeeding support</li>
            <li>If you do not agree to these terms, do not use the website or app</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Wellness only, not medical advice</h2>
          <p>
            NurtureCal provides general wellness, nutrition-logging, and habit-support
            tools. It does not provide medical diagnosis, treatment, individualized
            clinical care, emergency services, or legal or financial advice.
          </p>
          <p>
            Any calorie targets, macro targets, meal suggestions, and AI-generated
            outputs are estimates for general wellness use only. You remain responsible
            for your food choices, health decisions, and how you use the information provided.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Accounts and acceptable use</h2>
          <p>
            You agree to provide accurate information, keep your login credentials
            secure, and use NurtureCal only for lawful personal use.
          </p>
          <ul>
            <li>Do not impersonate another person or misstate your identity</li>
            <li>Do not attempt to disrupt, overload, probe, scrape, reverse engineer, or bypass security protections</li>
            <li>Do not upload content you do not have permission to use</li>
            <li>Do not use the service in a way that infringes rights or breaks the law</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>User content and AI features</h2>
          <p>
            You may provide food logs, custom-food entries, measurements, and meal
            photos so the service can operate. You keep ownership of content you provide,
            but you give us permission to host, process, and use it as needed to run
            the service for you.
          </p>
          <p>
            If you use AI-powered features, you understand that responses may be incomplete,
            inaccurate, or not suitable for your situation. Review AI outputs before relying on them.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Subscriptions, billing, cancellation, and refunds</h2>
          <p>
            Planned launch pricing is a 7-day free trial on the annual plan, $14.99
            monthly, and $59.99 annually. Pricing, trial availability, and product
            details may change before or after launch.
          </p>
          <p>
            If you subscribe through the Apple App Store or Google Play, billing,
            renewal, cancellation, and many refund requests are handled through that
            platform and are subject to its rules and applicable law. Apple currently
            directs users to request refunds through Apple Support, and Google Play
            currently allows some refund requests directly through Google or the developer
            depending on timing and circumstances.
          </p>
          <p>
            If you need support with a purchase that is not available through the
            store’s standard refund flow, contact{" "}
            <a href="mailto:info@realnurturingfnp.com">info@realnurturingfnp.com</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Intellectual property</h2>
          <p>
            NurtureCal, its branding, the website, app content, text, graphics,
            and software are owned by Copeland Legacy LLC or its licensors and are
            protected by applicable intellectual-property laws. These terms do not
            transfer ownership of the service or its content to you.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Suspension, termination, and availability</h2>
          <p>
            We may suspend or terminate access if you violate these terms, misuse
            the service, create risk for other users, or if we need to protect the
            platform, comply with law, or discontinue part of the service.
          </p>
          <p>
            We may update, modify, or remove features from time to time. We do not
            guarantee uninterrupted or error-free availability.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Disclaimers and limits of liability</h2>
          <p>
            To the fullest extent permitted by law, NurtureCal is provided “as is”
            and “as available” without warranties of any kind. We disclaim implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
          <p>
            To the fullest extent permitted by law, Copeland Legacy LLC and its service
            providers will not be liable for indirect, incidental, special, consequential,
            or punitive damages, or for lost profits, revenues, data, or goodwill arising
            from your use of the service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Governing law and contact</h2>
          <p>
            NurtureCal is being launched by Copeland Legacy LLC, 17920 Huffmeister Rd.,
            Suite 220, Cypress, TX 77429.
          </p>
          <p>
            To the extent permitted by law, these terms are governed by the laws of
            the State of Texas, without regard to conflict-of-law rules. Questions
            about these terms can be sent to{" "}
            <a href="mailto:info@realnurturingfnp.com">info@realnurturingfnp.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
