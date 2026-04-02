import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type WaitlistPayload = {
  fullName?: string;
  email?: string;
  website?: string;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderOwnerHtml(fullName: string, email: string, submittedAt: string) {
  return `
    <div style="background:#f4fbfa;padding:28px;font-family:Segoe UI,Trebuchet MS,sans-serif;color:#17353b;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d2e9e6;border-radius:20px;padding:28px;">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4e7578;font-weight:700;">New waitlist signup</p>
        <h1 style="margin:0 0 18px;font-size:28px;color:#17353b;">NurtureCal waitlist</h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;background:#ffffff;">
          <tbody>
            <tr>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;font-weight:700;width:32%;">Name</td>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;font-weight:700;">Email</td>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;font-weight:700;">Submitted</td>
              <td style="padding:10px 12px;border:1px solid #d2e9e6;">${escapeHtml(submittedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderOwnerText(fullName: string, email: string, submittedAt: string) {
  return `New NurtureCal waitlist signup

Name: ${fullName}
Email: ${email}
Submitted: ${submittedAt}`;
}

function renderConfirmationHtml(fullName: string) {
  return `
    <div style="background:#f4fbfa;padding:28px;font-family:Segoe UI,Trebuchet MS,sans-serif;color:#17353b;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d2e9e6;border-radius:20px;padding:28px;">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4e7578;font-weight:700;">NurtureCal waitlist</p>
        <h1 style="margin:0 0 16px;font-size:28px;color:#17353b;">You’re on the list</h1>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Thanks, ${escapeHtml(fullName)}. We’ll reach out when early access opens and when the app is ready for first users.</p>
        <p style="margin:0;font-size:15px;line-height:1.7;">NurtureCal is built around a simple structure: protein + carb + veggies, with realistic tracking and no extreme food rules.</p>
      </div>
    </div>
  `;
}

function renderConfirmationText(fullName: string) {
  return `Thanks, ${fullName}. You’re on the NurtureCal waitlist.

We’ll reach out when early access opens and when the app is ready for first users.`;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as WaitlistPayload;
  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable." },
      { status: 500 }
    );
  }

  if (fullName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.CHECKLIST_TO_EMAIL || "info@realnurturingfnp.com";
  const submittedAtIso = new Date().toISOString();
  const submittedAt = new Date(submittedAtIso).toLocaleString("en-US", {
    timeZone: "America/Chicago"
  });

  try {
    const resend = new Resend(resendApiKey);
    const supabase = getSupabaseAdmin();

    const { error: waitlistError } = await supabase.from("waitlist_signups").upsert(
      {
        full_name: fullName,
        email,
        source: "website",
        updated_at: submittedAtIso
      },
      {
        onConflict: "email"
      }
    );

    if (waitlistError) {
      throw new Error(`Failed to store waitlist signup: ${waitlistError.message}`);
    }

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "New NurtureCal waitlist signup",
      html: renderOwnerHtml(fullName, email, submittedAt),
      text: renderOwnerText(fullName, email, submittedAt)
    });

    await resend.emails.send({
      from,
      to: email,
      subject: "You’re on the NurtureCal waitlist",
      html: renderConfirmationHtml(fullName),
      text: renderConfirmationText(fullName)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save your waitlist request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
