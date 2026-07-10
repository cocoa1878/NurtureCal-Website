import Link from "next/link";
import type { ReactNode } from "react";
import { signOutOfOwnerGuide } from "./actions";
import styles from "./owner-guide.module.css";

type GuideShellProps = {
  children: ReactNode;
  activeTopic?: "home" | "downloads" | "members" | "apple-ads";
};

const navigation = [
  { href: "/owner-guide", icon: "⌂", label: "Start here", topic: "home" },
  { href: "/owner-guide/downloads", icon: "↓", label: "Downloads", topic: "downloads" },
  { href: "/owner-guide/members", icon: "♥", label: "Members", topic: "members" },
  { href: "/owner-guide/apple-ads", icon: "↗", label: "Apple Ads", topic: "apple-ads" },
] as const;

export default function GuideShell({ children, activeTopic = "home" }: GuideShellProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} href="/owner-guide">
          <span className={styles.brandMark} aria-hidden="true"><i /></span>
          <span>NurtureCal</span>
        </Link>

        <nav className={styles.navigation} aria-label="Owner guide">
          {navigation.map((item) => (
            <Link
              className={`${styles.navLink} ${activeTopic === item.topic ? styles.navLinkActive : ""}`}
              href={item.href}
              key={item.href}
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarHelp}>
          <strong>Need a hand?</strong>
          <span>Each guide takes about one minute. This guide cannot change your app or charge your card.</span>
        </div>

        <form action={signOutOfOwnerGuide} className={styles.signOutForm}>
          <button className={styles.signOutButton} type="submit">Sign out</button>
        </form>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
