import { signInToOwnerGuide } from "./actions";
import { isOwnerGuideConfigured } from "./auth";
import styles from "./owner-guide.module.css";

type LoginViewProps = {
  hasError: boolean;
  destination?: "/owner-guide" | "/project-status";
};

export default function LoginView({
  hasError,
  destination = "/owner-guide",
}: LoginViewProps) {
  const configured = isOwnerGuideConfigured();
  const isProjectStatus = destination === "/project-status";
  const pageName = isProjectStatus ? "project status" : "owner guide";

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.loginBrand}>
          <span className={styles.brandMark} aria-hidden="true"><i /></span>
          <span>NurtureCal</span>
        </div>
        <p className={styles.loginEyebrow}>Private {pageName}</p>
        <h1>{isProjectStatus ? "Your private project status." : "Everything you need, in one calm place."}</h1>
        <p className={styles.loginIntro}>Enter the private password. This device will stay signed in for 30 days.</p>

        {configured ? (
          <form action={signInToOwnerGuide} className={styles.loginForm}>
            <input name="returnTo" type="hidden" value={destination} />
            <input
              aria-hidden="true"
              autoComplete="username"
              className={styles.usernameHelper}
              name="username"
              readOnly
              tabIndex={-1}
              type="text"
              value="NurtureCal owner"
            />
            <label htmlFor="owner-password">Password</label>
            <input
              aria-describedby={hasError ? "password-error" : undefined}
              autoComplete="current-password"
              autoFocus
              id="owner-password"
              name="password"
              placeholder="Enter your password"
              required
              type="password"
            />
            {hasError ? <p className={styles.formError} id="password-error">That password did not match. Please try again.</p> : null}
            <button type="submit">Open {isProjectStatus ? "project status" : "my owner guide"} <span aria-hidden="true">→</span></button>
          </form>
        ) : (
          <div className={styles.setupNotice}>
            <strong>The private page is not configured yet.</strong>
            <span>Add the private password and session secret to the hosting environment before sharing this page.</span>
          </div>
        )}
        <p className={styles.privacyNote}>No account password, customer information, or payment details are stored on this page.</p>
      </section>
      <div className={styles.loginDecoration} aria-hidden="true"><span /><span /></div>
    </main>
  );
}
