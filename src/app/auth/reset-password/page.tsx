import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: {
    index: false,
    follow: false
  }
};

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ResetPasswordPage({
  searchParams
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const tokenHash = firstValue(params.token_hash)?.trim() ?? "";
  const type = firstValue(params.type)?.trim() ?? "";
  const hasRecoveryToken = Boolean(tokenHash) && type === "recovery";
  const appUrl = new URL("nurturecal://auth/reset-password");

  if (hasRecoveryToken) {
    appUrl.searchParams.set("token_hash", tokenHash);
    appUrl.searchParams.set("type", "recovery");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>NurtureCal password reset</p>
        <h1 className={styles.title}>
          {hasRecoveryToken ? "Continue in NurtureCal" : "Request a new reset link"}
        </h1>
        <p className={styles.copy}>
          {hasRecoveryToken
            ? "For your security, your new password is created inside the NurtureCal app."
            : "This password reset link is incomplete or has expired. Return to NurtureCal and request a new email."}
        </p>

        {hasRecoveryToken ? (
          <>
            <a className={styles.button} href={appUrl.toString()} rel="noreferrer">
              Open NurtureCal
            </a>
            <p className={styles.help}>
              If the app does not open from your email browser, open this page in Safari and
              tap the button again.
            </p>
          </>
        ) : (
          <p className={styles.help}>
            Need help? Email{" "}
            <a className={styles.link} href="mailto:info@realnurturingfnp.com">
              info@realnurturingfnp.com
            </a>
            .
          </p>
        )}
      </section>
    </main>
  );
}
