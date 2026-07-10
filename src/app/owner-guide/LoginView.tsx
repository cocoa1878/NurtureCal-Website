import { signInToOwnerGuide } from "./actions";
import { isOwnerGuideConfigured } from "./auth";
import styles from "./owner-guide.module.css";

export default function LoginView({ hasError }: { hasError: boolean }) {
  const configured = isOwnerGuideConfigured();

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.loginBrand}>
          <span className={styles.brandMark} aria-hidden="true"><i /></span>
          <span>NurtureCal</span>
        </div>
        <p className={styles.loginEyebrow}>Private owner guide</p>
        <h1>Everything you need, in one calm place.</h1>
        <p className={styles.loginIntro}>Enter the private guide password. This device will stay signed in for 30 days.</p>

        {configured ? (
          <form action={signInToOwnerGuide} className={styles.loginForm}>
            <input
              aria-hidden="true"
              autoComplete="username"
              className={styles.usernameHelper}
              name="username"
              readOnly
              tabIndex={-1}
              type="text"
              value="Corinne"
            />
            <label htmlFor="owner-password">Guide password</label>
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
            <button type="submit">Open my owner guide <span aria-hidden="true">→</span></button>
          </form>
        ) : (
          <div className={styles.setupNotice}>
            <strong>The private guide is not configured yet.</strong>
            <span>Add the owner-guide password and session secret to the hosting environment before sharing this page.</span>
          </div>
        )}
        <p className={styles.privacyNote}>No account password, customer information, or payment details are stored on this page.</p>
      </section>
      <div className={styles.loginDecoration} aria-hidden="true"><span /><span /></div>
    </main>
  );
}
