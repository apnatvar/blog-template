"use client";

import gsap from "gsap";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Tool = {
  label: string;
  version: string;
};

const TEMPLATE_NAME = "Blog Starter Template";
const INSPIRATION_URL = "https://apnatva.vercel.app/visual";

const TEMPLATE_PRIMARY_CTA = {
  label: "Template",
  href: "https://github.com/apnatvar/blog-template",
};

const TEMPLATE_SECONDARY_CTA = {
  label: "Dev",
  href: INSPIRATION_URL,
};

const TOOLS: Tool[] = [
  { label: "Next.js", version: "16.1.6" },
  { label: "React", version: "19.2.3" },
  { label: "PayloadCMS", version: "3.75.0" },
  { label: "Tailwind CSS", version: "4.x" },
  { label: "Shadcn", version: "3.8.4" },
  { label: "GSAP", version: "3.14.2" },
  { label: "Lenis", version: "1.3.17" },
  { label: "TypeScript", version: "5.x" },
];

const DATABASES = ["Postgres", "MongoDB", "SQLite"] as const;

const INFRA = ["Docker", "Nginx Config", "Admin Panel"] as const;

export default function TemplateLandingPage() {
  const heroRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { opacity: 0, y: 14 });
      gsap.to("[data-hero]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.05,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden px-6 py-4 sm:py-8 lg:px-10 bg-background text-foreground"
      aria-label={`${TEMPLATE_NAME} landing hero`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.03))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.22))]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <div data-hero className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              Portfolio + Blogs + Admin Panel
            </Badge>
            <Badge variant="outline" className="rounded-full">
              Next.js App Router • PayloadCMS • Docker
            </Badge>
          </div>

          <h1
            data-hero
            className={cn(
              "mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl",
              "leading-[1.05]",
            )}
          >
            {TEMPLATE_NAME}
            <br />
            <span className="text-muted-foreground">
              Ship a portfolio site with blogs, fast.
            </span>
          </h1>

          <p
            data-hero
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A ready-to-use starter template for building a professional
            portfolio website with a blog. Configured with Next.js (App Router),
            Tailwind, Shadcn UI, GSAP, and PayloadCMS to help you start building
            immediately instead of wiring the stack from scratch.
          </p>

          <div
            data-hero
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link
                href={TEMPLATE_PRIMARY_CTA.href}
                target="_blank"
                rel="noreferrer"
              >
                {TEMPLATE_PRIMARY_CTA.label}
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link
                href={TEMPLATE_SECONDARY_CTA.href}
                target="_blank"
                rel="noreferrer"
              >
                {TEMPLATE_SECONDARY_CTA.label}
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div
            data-hero
            className="rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/40"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium">What’s included</h2>
              <Badge variant="secondary" className="rounded-full">
                Out-of-the-box
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Databases
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {DATABASES.map((item) => (
                    <li
                      key={item}
                      className="items-start gap-2 list-disc list-item list-inside"
                    >
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Infra
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {INFRA.map((item) => (
                    <li
                      key={item}
                      className="items-start gap-2 list-disc list-item list-inside"
                    >
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Main tools and versions
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <span
                    key={`${t.label}-${t.version}`}
                    className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-foreground/90"
                  >
                    <span className="font-medium">{t.label}</span>
                    <span className="text-muted-foreground">{t.version}</span>
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Note: the template’s file structure is intentionally organized
                for speed and clarity, so it may differ from a “fresh”
                from-scratch setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
