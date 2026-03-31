import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checklistSections, humanizeValue, type ChecklistValues } from "@/lib/checklist";

type SubmissionPayload = {
  submittedAt?: string;
  values?: ChecklistValues;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmailHtml(values: ChecklistValues, submittedAt: string) {
  const sectionsHtml = checklistSections
    .map((section) => {
      const rows = section.fields
        .map((field) => {
          const rawValue = values[field.id];
          const renderedValue = escapeHtml(humanizeValue(rawValue));
          return `
            <tr>
              <td style="padding:10px 12px;border:1px solid #d6e1de;vertical-align:top;font-weight:700;width:32%;">${escapeHtml(field.label)}</td>
              <td style="padding:10px 12px;border:1px solid #d6e1de;white-space:pre-wrap;">${renderedValue}</td>
            </tr>
          `;
        })
        .join("");

      return `
        <section style="margin-top:28px;">
          <h2 style="font-size:18px;color:#224f49;margin:0 0 12px;">${escapeHtml(section.title)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;background:#ffffff;">
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");

  return `
    <div style="background:#f2f7f6;padding:28px;font-family:Segoe UI,Trebuchet MS,sans-serif;color:#203639;">
      <div style="max-width:860px;margin:0 auto;background:#ffffff;border:1px solid #d6e1de;border-radius:20px;padding:28px;">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5d7171;font-weight:700;">New client checklist submission</p>
        <h1 style="margin:0 0 10px;font-size:30px;font-family:Georgia,Palatino Linotype,serif;color:#224f49;">Dr. Copeland Tier 2 checklist</h1>
        <p style="margin:0 0 18px;font-size:14px;color:#546a69;">Submitted at: ${escapeHtml(submittedAt)}</p>
        ${sectionsHtml}
      </div>
    </div>
  `;
}

function renderEmailText(values: ChecklistValues, submittedAt: string) {
  const sectionsText = checklistSections
    .map((section) => {
      const rows = section.fields
        .map((field) => `${field.label}\n${humanizeValue(values[field.id])}`)
        .join("\n\n");

      return `${section.title}\n\n${rows}`;
    })
    .join("\n\n----------------------------------------\n\n");

  return `Dr. Copeland Tier 2 checklist\nSubmitted at: ${submittedAt}\n\n${sectionsText}`;
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as SubmissionPayload;
  const values = payload.values ?? {};
  const submittedAt =
    payload.submittedAt ?? new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

  const resend = new Resend(resendApiKey);
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.CHECKLIST_TO_EMAIL || "richard@m2ai.tech";
  const replyTo =
    typeof values.bestEmailForCommunication === "string"
      ? values.bestEmailForCommunication
      : undefined;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo,
      subject: "Copeland Tier 2 checklist submission",
      html: renderEmailHtml(values, submittedAt),
      text: renderEmailText(values, submittedAt)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send the checklist email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
