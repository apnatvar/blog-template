import SmoothScrollProvider from "@/components/lenisScroll";
import React from "react";
import "./globals.css";

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
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
