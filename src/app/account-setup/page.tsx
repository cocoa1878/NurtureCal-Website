import Link from "next/link";

type AccountGuide = {
  id: string;
  title: string;
  urgency: "Do This First" | "Do This Soon" | "Do This Later";
  signupUrl: string;
  helpUrl: string;
  why: string;
  steps: string[];
  access: string;
  note?: string;
};

const guides: AccountGuide[] = [
  {
    id: "github",
    title: "1. GitHub",
    urgency: "Do This First",
    signupUrl: "https://github.com/signup",
    helpUrl: "https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github",
    why: "This is where the code will live. It should be in your account, not mine.",
    steps: [
      "Go to GitHub and create a free account.",
      "Verify your email and turn on two-factor authentication if GitHub asks.",
      "Create one private repository for the project. A simple name like copeland-app is fine.",
      "Open the repository, go to Settings, then Collaborators, then Add people.",
      "Invite richard@m2ai.tech."
    ],
    access: "Please add Richard as a collaborator on the private repository.",
    note: "If you get stuck after creating the GitHub account, stop there and send Richard your GitHub username."
  },
  {
    id: "vercel",
    title: "2. Vercel",
    urgency: "Do This First",
    signupUrl: "https://vercel.com/signup",
    helpUrl: "https://vercel.com/docs/getting-started-with-vercel",
    why: "This will host the website and can also hold your domain.",
    steps: [
      "Go to Vercel and choose Sign up with GitHub.",
      "Approve the GitHub connection.",
      "Finish the account setup.",
      "Do not worry if you do not see the right project yet. Richard can help with that.",
      "When your app name is final, we can register your domain in Vercel."
    ],
    access: "If you start a Vercel Pro team, invite richard@m2ai.tech as a member.",
    note: "Vercel's current docs say shared access for private projects is tied to team collaboration, so GitHub access is the most important first step."
  },
  {
    id: "apple",
    title: "3. Apple Developer",
    urgency: "Do This Soon",
    signupUrl: "https://developer.apple.com/programs/enroll/",
    helpUrl: "https://developer.apple.com/programs/enroll/",
    why: "This is required to launch the iPhone app.",
    steps: [
      "Use an Apple Account you control.",
      "If you want the app to show your business name in the App Store, enroll as an organization.",
      "If you enroll as an organization, Apple will ask for a legal business and D-U-N-S number.",
      "Complete the enrollment and membership payment.",
      "When Apple approves the account, open App Store Connect."
    ],
    access: "In App Store Connect, go to Users and Access and invite richard@m2ai.tech.",
    note: "Apple setup can take time, so it is smart to start early."
  },
  {
    id: "google-play",
    title: "4. Google Play Console",
    urgency: "Do This Soon",
    signupUrl: "https://play.google.com/console/signup",
    helpUrl: "https://support.google.com/googleplay/android-developer/answer/6112435?hl=en",
    why: "This is required to launch the Android app.",
    steps: [
      "Sign in with the Google account you want to own the app.",
      "Choose the correct account type for your business.",
      "Finish the registration and any identity checks Google asks for.",
      "Complete the payments profile if Google asks for it.",
      "Open Play Console after the account is ready."
    ],
    access: "In Play Console, go to Users and permissions and invite richard@m2ai.tech.",
    note: "Google is increasing developer verification, so it is best to set this up early too."
  },
  {
    id: "supabase",
    title: "5. Supabase",
    urgency: "Do This Later",
    signupUrl: "https://supabase.com/dashboard/sign-up",
    helpUrl: "https://supabase.com/docs/guides/getting-started",
    why: "This will hold the app database, login system, and app data.",
    steps: [
      "Create a Supabase account.",
      "Create one new project.",
      "Pick a project name that matches the app.",
      "Save the database password in a safe place.",
      "Leave the rest of the setup simple. Richard can handle the project wiring."
    ],
    access: "Invite richard@m2ai.tech to the Supabase organization or project team.",
    note: "You do not need to configure tables or backend settings yourself."
  },
  {
    id: "openai",
    title: "6. OpenAI",
    urgency: "Do This Later",
    signupUrl: "https://platform.openai.com/signup",
    helpUrl: "https://platform.openai.com/docs/guides/production-best-practices",
    why: "This powers AI food photo analysis and AI meal suggestions.",
    steps: [
      "Create an OpenAI platform account.",
      "Add billing when you are ready.",
      "Do not email API keys or passwords.",
      "Once the account is ready, Richard can help create the project and API setup."
    ],
    access: "Invite richard@m2ai.tech from the Team page when the account is ready.",
    note: "The safest setup is to keep the account in your name and add Richard as a member."
  },
  {
    id: "revenuecat",
    title: "7. RevenueCat",
    urgency: "Do This Later",
    signupUrl: "https://app.revenuecat.com/",
    helpUrl: "https://www.revenuecat.com/docs/",
    why: "This handles app subscriptions and free trials.",
    steps: [
      "Create a RevenueCat account.",
      "Create one project for the app.",
      "Do not worry about products or entitlements yet.",
      "Richard can connect Apple and Google subscriptions later."
    ],
    access: "Invite richard@m2ai.tech as a project teammate when the project exists.",
    note: "This account can wait until we are closer to subscription setup."
  }
];

const urgencyOrder: AccountGuide["urgency"][] = ["Do This First", "Do This Soon", "Do This Later"];

export default function AccountSetupPage() {
  return (
    <main className="guide-wrap">
      <section className="guide-hero">
        <div className="eyebrow">Simple setup guide</div>
        <h1>Account Setup for Dr. Corinne Copeland</h1>
        <p className="guide-intro">
          Set these up in this order. Keep each account in your name or business name. Add
          Richard at <strong>richard@m2ai.tech</strong> when the step says to do it.
        </p>
        <div className="guide-actions">
          <Link className="secondary-button" href="/questionaire">
            Back to checklist
          </Link>
        </div>
      </section>

      <section className="guide-summary">
        <div className="summary-card">
          <h2>Best order</h2>
          <ol>
            <li>GitHub</li>
            <li>Vercel</li>
            <li>Apple Developer</li>
            <li>Google Play Console</li>
            <li>Supabase</li>
            <li>OpenAI</li>
            <li>RevenueCat</li>
          </ol>
        </div>
        <div className="summary-card">
          <h2>Please remember</h2>
          <ul>
            <li>Use one email you check often.</li>
            <li>Turn on two-factor authentication when asked.</li>
            <li>Do not text or email passwords or API keys.</li>
            <li>If a screen feels confusing, stop and ask Richard.</li>
          </ul>
        </div>
      </section>

      {urgencyOrder.map((urgency) => {
        const items = guides.filter((guide) => guide.urgency === urgency);
        return (
          <section key={urgency} className="guide-group">
            <div className="group-label">{urgency}</div>
            <div className="guide-grid">
              {items.map((guide) => (
                <article key={guide.id} className="guide-card">
                  <h2>{guide.title}</h2>
                  <p className="guide-why">{guide.why}</p>

                  <div className="guide-links">
                    <a className="mini-link" href={guide.signupUrl} target="_blank" rel="noreferrer">
                      Open signup
                    </a>
                    <a className="mini-link" href={guide.helpUrl} target="_blank" rel="noreferrer">
                      Official help
                    </a>
                  </div>

                  <h3>What to do</h3>
                  <ol className="guide-list">
                    {guide.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  <div className="access-note">
                    <strong>Add Richard:</strong> {guide.access}
                  </div>

                  {guide.note ? <p className="guide-note">{guide.note}</p> : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="guide-footer-card">
        <h2>Quick final note</h2>
        <p>
          GitHub is the most important first step. Vercel is next because you want to keep the
          website and domain there. Apple and Google should be started early so they do not slow
          down launch later.
        </p>
      </section>
    </main>
  );
}
