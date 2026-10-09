"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fragments = [
  { label: "3:47 AM", text: "Still three chapters left." },
  { label: "The comparison", text: "Everyone else seems to have it figured out." },
  { label: "Keep it together", text: "Can't let them see you're struggling." },
  { label: "The quiet question", text: "What if this isn't enough?" },
  { label: "Morning, again", text: "Just smile. It's easier that way." },
];

const anchorClasses = [
  "left-[2%] top-[12%] max-md:left-1/2 max-md:right-auto max-md:top-[8%] max-md:-translate-x-1/2",
  "right-[2%] top-[16%] max-md:left-1/2 max-md:right-auto max-md:top-[18%] max-md:-translate-x-1/2",
  "left-[2%] top-[44%] max-md:left-1/2 max-md:right-auto max-md:top-[28%] max-md:-translate-x-1/2",
  "right-[2%] top-[48%] max-md:left-1/2 max-md:right-auto max-md:top-auto max-md:bottom-[18%] max-md:-translate-x-1/2",
  "bottom-[11%] left-1/2 -translate-x-1/2 max-md:bottom-[8%]",
];

export default function Act2Pressure() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [portraitAvailable, setPortraitAvailable] = useState(true);

  useEffect(() => {
    const act1Overlays = document.querySelectorAll<HTMLElement>(
      "#act-1 .act1-badge, #act-1 .act1-headline, #act-1 header, #act-1 > a",
    );

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
      });

      const progressiveCracks = gsap.utils.toArray<SVGPathElement>(
        ".act2-progressive-crack",
        sectionRef.current,
      );

      progressiveCracks.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      timeline.to(act1Overlays, { autoAlpha: 0, y: -10, duration: 0.25, stagger: 0.025 }, 0);
      timeline.fromTo(
        ".act2-portrait-image, .act2-portrait-fallback",
        { filter: "saturate(1) brightness(1.12)" },
        { filter: "saturate(0.2) brightness(0.48)", duration: 5 },
        0,
      );
      timeline.fromTo(".act2-shade", { opacity: 0.38 }, { opacity: 0.9, duration: 5 }, 0);

      const globalGrain = document.querySelector(".global-grain-overlay");
      if (globalGrain) {
        timeline.to(globalGrain, { opacity: 0.36, duration: 5 }, 0);
      }

      const crackRevealStarts = [0.25, 1.05, 2, 2.95];
      progressiveCracks.forEach((path, index) => {
        timeline.to(
          path,
          { strokeDashoffset: 0, duration: 1.05 },
          crackRevealStarts[index],
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>(
        ".act2-fragment-card",
        sectionRef.current,
      );

      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.14 },
          index,
        );
        timeline.to(card, { autoAlpha: 0, y: -5, duration: 0.14 }, index + 0.78);
      });

      ScrollTrigger.create({
        animation: timeline,
        trigger: sectionRef.current,
        pin: stageRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 4}`,
        scrub: 0.7,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="act-2"
      aria-label="Act 2: Mounting Pressure"
      className="relative h-[100svh] bg-ink"
    >
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a09]">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#171411]">
          <div
            aria-hidden="true"
            className="act2-portrait-fallback portrait-fallback absolute inset-0"
          />
          {portraitAvailable && (
            <Image
              src="/images/portrait.png"
              alt=""
              fill
              sizes="100vw"
              className="act2-portrait-image z-[1] object-cover object-[50%_42%]"
              onError={() => setPortraitAvailable(false)}
            />
          )}
          <div className="act2-shade absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,9,8,0.49)_0%,rgba(10,9,8,0.18)_38%,rgba(10,9,8,0.32)_68%,rgba(10,9,8,0.72)_100%),linear-gradient(90deg,rgba(10,9,8,0.2),transparent_46%,rgba(10,9,8,0.2))] opacity-70" />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="act2-crack-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="0.48" result="soft-glow" />
              <feMerge>
                <feMergeNode in="soft-glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(64 4) scale(0.32 0.56)" filter="url(#act2-crack-glow)">
            <path
              d="M89 0 L84 10 L87 18 L77 27 L81 35 L72 44 L75 53 L65 62"
              fill="none"
              stroke="#ead7c3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.32"
              opacity="0.55"
            />
            <path
              d="M84 10 L94 14 M77 27 L67 23 M75 53 L84 58"
              fill="none"
              stroke="#ead7c3"
              strokeLinecap="round"
              strokeWidth="0.24"
              opacity="0.38"
            />
          </g>
          <g filter="url(#act2-crack-glow)">
            <path
              className="act2-progressive-crack"
              d="M84.8 38.72 L81 43 L83 48 L72 53 L75 58 L63 64 L67 68 L58 74 L54 82 L43 88"
              fill="none"
              stroke="#f0d6b8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.16"
              opacity="0.9"
            />
            <path
              className="act2-progressive-crack"
              d="M75 58 L81 61 L84 67 L92 72"
              fill="none"
              stroke="#f0d6b8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.13"
              opacity="0.8"
            />
            <path
              className="act2-progressive-crack"
              d="M63 64 L59 58 L52 54 L47 48"
              fill="none"
              stroke="#f0d6b8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.13"
              opacity="0.78"
            />
            <path
              className="act2-progressive-crack"
              d="M67 68 L73 74 L72 80 L80 85"
              fill="none"
              stroke="#f0d6b8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.12"
              opacity="0.74"
            />
          </g>
        </svg>

        <p className="absolute left-1/2 top-6 z-30 -translate-x-1/2 whitespace-nowrap font-display text-xs italic text-[#e0b18d] [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] sm:text-sm">
          Act 02 <span className="px-1 text-white/45">/</span> Mounting Pressure
        </p>

        {fragments.map((fragment, index) => (
          <div
            key={fragment.text}
            className={`absolute z-20 w-[min(36vw,390px)] max-md:left-1/2 max-md:right-auto max-md:w-[min(330px,calc(100vw-32px))] ${anchorClasses[index]}`}
          >
            <article
              className={`act2-fragment-card pressure-note pressure-note-${index + 1} -rotate-[1.5deg] px-6 py-6 font-display text-[#35271d] sm:px-[30px] sm:py-6 ${index % 2 === 1 ? "rotate-[1.25deg]" : ""}`}
              aria-label={`${fragment.label}: ${fragment.text}`}
            >
              <p className="mb-3 font-display text-[20px] italic leading-none text-[#71563d]">
                {fragment.label}
              </p>
              <p className="font-display text-[26px] italic leading-[1.2] sm:text-[27px]">
                {fragment.text}
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}