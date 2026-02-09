import SmoothScrollProvider from "@/components/lenisScroll";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ap-blog-template.vercel.app"),
  title: {
    default: "Blog Template — Portfolio + Blog Starter",
    template: "%s | AP Blog Template",
  },
  description:
    "A production-ready portfolio and blog starter built with Next.js App Router, PayloadCMS, Tailwind, Shadcn UI, GSAP, and Docker. Supports SQLite, MongoDB, and PostgreSQL out of the box.",
  keywords: [
    "Next.js portfolio template",
    "PayloadCMS starter",
    "Next.js blog starter",
    "Docker Next.js setup",
    "Portfolio website template",
    "Fullstack blog template",
  ],
  authors: [{ name: "Apnatva Singh Rawat" }],
  creator: "Apnatva Singh Rawat",
  openGraph: {
    type: "website",
    url: "https://ap-blog-template.vercel.app",
    title: "Blog Template — Portfolio + Blog Starter",
    description:
      "Next.js + PayloadCMS portfolio starter with database flexibility and Docker support.",
    siteName: "Blog Template by Apnatva",
    images: [
      {
        url: "/ap-icon.svg",
        width: 1200,
        height: 630,
        alt: "Blog Template Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Template — Portfolio + Blog Starter",
    description:
      "Next.js App Router + PayloadCMS starter with SQLite, MongoDB, PostgreSQL, and Docker support.",
    images: ["/ap-icon.svg"],
  },
  icons: {
    icon: "/ap-icon.svg",
    shortcut: "/ap-icon.svg",
    apple: "/ap-icon.svg",
  },
  category: "technology",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <main className="max-w-dvw overflow-hidden">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
