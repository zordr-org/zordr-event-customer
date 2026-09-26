import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zordr – Events. Experiences. Together.",
  description:
    "Discover events, manage your tickets, and stay connected with Zordr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-background)]">
        {children}
      </body>
    </html>
  );
}
