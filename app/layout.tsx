import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChairFill | Patient Revenue Recovery",
  description:
    "ChairFill helps dental offices and med spas recover missed calls, leads, reviews, reactivations, and no-show revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
