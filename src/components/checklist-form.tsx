"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  checklistSections,
  createInitialValues,
  type ChecklistValues,
  type FieldDefinition
} from "@/lib/checklist";

const STORAGE_KEY = "copeland-tier2-checklist-draft";

type SubmitState = "idle" | "submitting" | "success" | "error";

function Field({
  field,
  value,
  onChange
}: {
  field: FieldDefinition;
  value: string | boolean;
  onChange: (fieldId: string, nextValue: string | boolean) => void;
}) {
  const commonProps = {
    id: field.id,
    name: field.id
  };

  if (field.type === "textarea") {
    return (
      <textarea
        {...commonProps}
        rows={field.rows ?? 4}
        className="form-textarea"
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(event) => onChange(field.id, event.target.value)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="checkbox-row" htmlFor={field.id}>
        <input
          {...commonProps}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.id, event.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <select
        {...commonProps}
        className="form-input"
        value={String(value ?? "")}
        onChange={(event) => onChange(field.id, event.target.value)}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...commonProps}
      type={field.type}
      className="form-input"
      placeholder={field.placeholder}
      value={String(value ?? "")}
      onChange={(event) => onChange(field.id, event.target.value)}
    />
  );
}

export function ChecklistForm() {
  const [values, setValues] = useState<ChecklistValues>(createInitialValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as ChecklistValues;
      setValues((current) => ({ ...current, ...parsed }));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  const completedCount = useMemo(() => {
    const total = Object.keys(values).length;
    const completed = Object.values(values).filter((value) => {
      if (typeof value === "boolean") {
        return value;
      }

      return value.trim().length > 0;
    }).length;

    return { completed, total };
  }, [values]);

  function handleChange(fieldId: string, nextValue: string | boolean) {
    setValues((current) => ({
      ...current,
      [fieldId]: nextValue
    }));
  }

  function handleResetDraft() {
    const nextValues = createInitialValues();
    setValues(nextValues);
    window.localStorage.removeItem(STORAGE_KEY);
    setSubmitState("idle");
    setSubmitError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/submit-checklist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            submittedAt: new Date().toISOString(),
            values
          })
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(payload?.error ?? "Something went wrong while sending the form.");
        }

        setSubmitState("success");
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        setSubmitState("error");
        setSubmitError(
          error instanceof Error ? error.message : "Something went wrong while sending the form."
        );
      }
    });
  }

  return (
    <form className="checklist-shell" onSubmit={handleSubmit}>
      <section className="hero-card">
        <div className="eyebrow">Project intake form</div>
        <h1>Dr. Copeland Tier 2 checklist</h1>
        <p className="hero-copy">
          This page follows the exact checklist Richard prepared for the project. Fill in what you
          know now. If you are unsure about an item, you can leave a note and it can be finalized
          during kickoff.
        </p>
      </section>

      <section className="status-bar">
        <div>
          <strong>Draft progress:</strong> {completedCount.completed} of {completedCount.total} items
          filled
        </div>
        <button className="ghost-button" type="button" onClick={handleResetDraft}>
          Clear saved draft
        </button>
      </section>

      {checklistSections.map((section) => (
        <section key={section.id} id={section.id} className="section-card">
          <div className="section-header">
            <h2>{section.title}</h2>
            {section.note ? <p>{section.note}</p> : null}
          </div>

          <div className="field-grid">
            {section.fields.map((field) => (
              <div
                key={field.id}
                className={field.type === "textarea" ? "field wide" : "field"}
              >
                {field.type !== "checkbox" ? (
                  <label className="field-label" htmlFor={field.id}>
                    {field.label}
                  </label>
                ) : null}

                <Field
                  field={field}
                  value={values[field.id]}
                  onChange={handleChange}
                />

                {field.helper ? <p className="field-helper">{field.helper}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="submit-card">
        <h2>Next step</h2>
        <p>
          When you submit this form, the answers will be emailed to Richard so the project kickoff
          can move forward.
        </p>

        {submitState === "success" ? (
          <div className="notice success">
            Your answers were sent successfully. Richard now has your checklist responses.
          </div>
        ) : null}

        {submitState === "error" ? (
          <div className="notice error">{submitError}</div>
        ) : null}

        <div className="submit-row">
          <button
            className="primary-button"
            type="submit"
            disabled={submitState === "submitting" || isPending}
          >
            {submitState === "submitting" || isPending ? "Sending..." : "Send checklist"}
          </button>
          <span className="submit-note">
            Your draft is also saved in this browser while you work.
          </span>
        </div>
      </section>
    </form>
  );
}
