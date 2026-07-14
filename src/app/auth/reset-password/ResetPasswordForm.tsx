"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const RESET_ENDPOINT =
  "https://tdzwvwfyetafkqjypaft.supabase.co/functions/v1/password-reset-redirect";

type ResetPasswordFormProps = {
  completed: boolean;
  tokenHash: string;
};

type ResetResponse = {
  error?: string;
  success?: boolean;
};

export default function ResetPasswordForm({
  completed,
  tokenHash
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(RESET_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tokenHash, password }),
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer"
      });
      const result = (await response.json().catch(() => ({}))) as ResetResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Your password could not be updated. Please try again."
        );
      }

      setPassword("");
      setConfirmPassword("");
      window.location.replace("/auth/reset-password?completed=1");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Your password could not be updated. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (completed) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.eyebrow}>NurtureCal password reset</p>
          <h1 className={styles.title}>Password updated</h1>
          <p className={styles.copy}>
            Your new password is ready. Open NurtureCal and sign in with it.
          </p>
          <a
            className={styles.button}
            href="nurturecal://auth/sign-in"
            rel="noreferrer"
          >
            Open NurtureCal
          </a>
        </section>
      </main>
    );
  }

  if (!tokenHash) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.eyebrow}>NurtureCal password reset</p>
          <h1 className={styles.title}>Request a new reset link</h1>
          <p className={styles.copy}>
            This password reset link is incomplete or has expired. Return to
            NurtureCal and request a new email.
          </p>
          <p className={styles.help}>
            Need help? Email{" "}
            <a className={styles.link} href="mailto:info@realnurturingfnp.com">
              info@realnurturingfnp.com
            </a>
            .
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>NurtureCal password reset</p>
        <h1 className={styles.title}>Create a new password</h1>
        <p className={styles.copy}>
          Enter your new password here. You will return to NurtureCal only after
          it has been saved.
        </p>

        <form className={styles.form} onSubmit={submit}>
          <label className={styles.label} htmlFor="new-password">
            New password
          </label>
          <input
            autoComplete="new-password"
            className={styles.input}
            disabled={submitting}
            id="new-password"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            required
            type="password"
            value={password}
          />

          <label className={styles.label} htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            autoComplete="new-password"
            className={styles.input}
            disabled={submitting}
            id="confirm-password"
            minLength={8}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat your new password"
            required
            type="password"
            value={confirmPassword}
          />

          {error ? (
            <p aria-live="polite" className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button className={styles.button} disabled={submitting} type="submit">
            {submitting ? "Saving password…" : "Save new password"}
          </button>
        </form>

        <p className={styles.help}>
          The reset link is used only when you tap Save new password.
        </p>
      </section>
    </main>
  );
}
