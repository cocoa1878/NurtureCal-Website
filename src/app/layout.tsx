import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nurturecal.com"),
  title: {
    default: "NurtureCal | Balanced Nutrition Food Tracker",
    template: "%s | NurtureCal"
  },
  description:
    "A balanced nutrition food tracker for adults who want personalized calorie and macro targets, flexible meal logging, and steady progress.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NurtureCal"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
