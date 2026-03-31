"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/websitedemo/page.module.css";

type FormValues = {
  fullName: string;
  email: string;
  website: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  website: ""
};

export function WaitlistForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const payload = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to save your waitlist request.");
      }

      setStatus("success");
      setMessage("You’re on the waitlist. We’ll reach out when early access opens.");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while joining the waitlist."
      );
    }
  }

  return (
    <form className={styles.waitlistForm} onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label htmlFor="fullName">Full name</label>
        <input
          autoComplete="name"
          id="fullName"
          name="fullName"
          onChange={(event) =>
            setValues((current) => ({ ...current, fullName: event.target.value }))
          }
          placeholder="Enter your name"
          required
          type="text"
          value={values.fullName}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="email">Email address</label>
        <input
          autoComplete="email"
          id="email"
          name="email"
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
          placeholder="you@example.com"
          required
          type="email"
          value={values.email}
        />
      </div>

      <div aria-hidden="true" className={styles.honeypotField}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          onChange={(event) =>
            setValues((current) => ({ ...current, website: event.target.value }))
          }
          tabIndex={-1}
          type="text"
          value={values.website}
        />
      </div>

      <button className={styles.formButton} disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Joining..." : "Join Waitlist"}
      </button>

      <p className={styles.formFinePrint}>
        We’ll only use this to share launch updates and early access for NurtureCal.
      </p>

      {message ? (
        <p
          className={
            status === "success" ? styles.formSuccessMessage : styles.formErrorMessage
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
