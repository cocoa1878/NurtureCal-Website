import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copeland Checklist",
  description: "Tier 2 project intake form for Dr. Corinne Copeland."
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
