"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/app/(payload)/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

gsap.registerPlugin(SplitText);

export default function RenderBlogPage({
  title,
  subtitle,
  body,
  createdAt,
}: Blog) {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (typeof window === "undefined") return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const titleEl = titleRef.current;
      const subtitleEl = subtitleRef.current;
      const bodyEl = bodyRef.current;

      if (!titleEl || !subtitleEl || !bodyEl) return;

      const t = new SplitText(titleEl, {
        type: "words",
        wordsClass: "split-word",
      });
      const s = new SplitText(subtitleEl, {
        type: "words",
        wordsClass: "split-word",
      });

      const b = new SplitText(bodyEl, {
        type: "lines",
        linesClass: "split-line",
      });

      gsap.set(".split-line", { display: "block", overflow: "hidden" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [...t.words, ...s.words],
        { autoAlpha: 0, x: -16 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.02,
          clearProps: "transform",
        },
      ).fromTo(
        b.lines,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.035,
          clearProps: "transform",
        },
        "-=0.15",
      );

      return () => {
        t.revert();
        s.revert();
        b.revert();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="w-full bg-background text-foreground">
      <article className="mx-auto w-full max-w-5xl px-5 py-10 md:py-14">
        <div className="mx-auto w-full max-w-3xl">
          <header className="flex justify-between items-center">
            <div>
              {title && (
                <h1
                  ref={titleRef}
                  className="text-balance text-5xl font-semibold leading-tight tracking-tight md:text-7xl"
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <p
                  ref={subtitleRef}
                  className="text-pretty text-2xl leading-relaxed text-muted-foreground md:text-3xl"
                >
                  {subtitle}
                </p>
              )}
            </div>
            <div>
              {createdAt && (
                <p className="text-sm text-center md:text-lg text-accent">
                  Published <br />
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </header>
          <Separator className="mt-5" />
          {body && (
            <div className="px-10 md:px-20">
              <div ref={bodyRef} className="prose text-lg">
                <RichText data={body} className="" />
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
