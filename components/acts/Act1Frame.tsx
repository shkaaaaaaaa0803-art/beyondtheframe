"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AchievementBadge from "@/components/ui/AchievementBadge";

export default function Act1Frame() {
  const sectionRef = useRef<HTMLElement>(null);
  const [portraitAvailable, setPortraitAvailable] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: "power2.out" } });
      entrance
        .fromTo(
          ".act1-badge",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.13 },
        )
        .fromTo(
          ".act1-portrait",
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.9 },
          "<0.08",
        )
        .fromTo(
          ".act1-headline",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          ">-0.12",
        );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="act-1"
      aria-labelledby="act1-headline"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#0a0a09] px-5 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7"
    >
      <div className="act1-portrait absolute inset-0 z-0 overflow-hidden bg-[#171411]">
        <div aria-hidden="true" className="portrait-fallback absolute inset-0" />
        {portraitAvailable && (
          <Image
            src="/images/portrait.png"
            alt="A composed portrait of a student"
            fill
            priority
            sizes="100vw"
            className="z-[1] object-cover object-[50%_42%]"
            onError={() => setPortraitAvailable(false)}
          />
        )}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,9,8,0.56)_0%,rgba(10,9,8,0.15)_37%,rgba(10,9,8,0.34)_66%,rgba(10,9,8,0.78)_100%),linear-gradient(90deg,rgba(10,9,8,0.2),transparent_45%,rgba(10,9,8,0.2))]" />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[4%] z-[3] h-[56%] w-[32%]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M89 0 L84 10 L87 18 L77 27 L81 35 L72 44 L75 53 L65 62"
            fill="none"
            stroke="#e8ddd0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.32"
            opacity="0.34"
          />
          <path
            d="M84 10 L94 14 M77 27 L67 23 M75 53 L84 58"
            fill="none"
            stroke="#e8ddd0"
            strokeLinecap="round"
            strokeWidth="0.24"
            opacity="0.25"
          />
        </svg>
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-white/65 sm:text-[10px]">
        <span>Alankaar · BBD University</span>
        <span>Pressure Points / 01</span>
      </header>

      <div className="absolute inset-0 z-10">
        <div className="act1-headline absolute left-1/2 top-[14%] w-[min(96%,1120px)] -translate-x-1/2 text-center">
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#df9c6f] sm:text-[10px]">
            Act 01 <span className="px-1.5 text-white/40">/</span> The Frame
          </p>
          <h1
            id="act1-headline"
            className="whitespace-nowrap font-display text-base leading-[1.12] text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-xl md:text-2xl lg:text-3xl xl:text-[3.25rem]"
          >
            This is what student life looks like?
          </h1>
        </div>

        <AchievementBadge
          category="Academic Record"
          value="9.2 CGPA"
          detail="Top 5% of the cohort"
          edge="one"
          className="left-[5%] top-[31%] -rotate-[5deg] sm:left-[9%] max-md:left-[4%] max-md:right-auto max-md:top-[28svh]"
        />
        <AchievementBadge
          category="Recognition"
          value="Hackathon Winner"
          detail="National · 2025"
          edge="two"
          className="right-[4%] top-[40%] rotate-[4deg] sm:right-[9%] max-md:top-[44svh]"
        />
        <AchievementBadge
          category="Next Destination"
          value="Placed"
          detail="Software Engineer · 2025"
          edge="three"
          className="bottom-[4%] left-[5%] -rotate-[3deg] sm:left-[8%] max-md:top-auto max-md:left-[4%] max-md:w-[44vw]"
        />
        <AchievementBadge
          category="Campus Involvement"
          value="Student Council"
          detail="Event Lead"
          edge="four"
          className="bottom-[4%] right-[5%] rotate-[6deg] sm:right-[8%] max-md:top-auto max-md:right-[4%] max-md:w-[44vw]"
        />
      </div>

      <a
        href="#act-2"
        aria-label="Scroll to Act 2"
        className="group absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-rust sm:bottom-8 max-md:bottom-[24%]"
      >
        <span>Keep looking</span>
        <span aria-hidden="true" className="relative h-6 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 top-0 h-2/3 w-full animate-[scroll-cue_1.6s_ease-in-out_infinite] bg-rust" />
        </span>
      </a>
    </section>
  );
}