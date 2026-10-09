"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const shards = [
  {
    clipPath:
      "polygon(0 0, 23% 0, 29% 17%, 22% 34%, 29% 53%, 21% 72%, 26% 100%, 0 100%)",
    x: -18,
    y: -12,
    rotation: -6,
  },
  {
    clipPath:
      "polygon(23% 0, 44% 0, 40% 18%, 47% 35%, 39% 54%, 45% 73%, 40% 100%, 26% 100%, 21% 72%, 29% 53%, 22% 34%, 29% 17%)",
    x: -10,
    y: -24,
    rotation: 4,
  },
  {
    clipPath:
      "polygon(44% 0, 65% 0, 61% 18%, 68% 36%, 60% 54%, 66% 72%, 59% 100%, 40% 100%, 45% 73%, 39% 54%, 47% 35%, 40% 18%)",
    x: 12,
    y: -8,
    rotation: -8,
  },
  {
    clipPath:
      "polygon(65% 0, 83% 0, 79% 17%, 86% 34%, 78% 52%, 84% 71%, 79% 100%, 59% 100%, 66% 72%, 60% 54%, 68% 36%, 61% 18%)",
    x: 25,
    y: 14,
    rotation: 6,
  },
  {
    clipPath:
      "polygon(83% 0, 100% 0, 100% 100%, 79% 100%, 84% 71%, 78% 52%, 86% 34%, 79% 17%)",
    x: 36,
    y: -20,
    rotation: -4,
  },
];

const fractureLines = [
  "M58 74 L50 69 L44 72 L37 66 L31 68 L23 60 L15 64 L8 59",
  "M54 82 L60 86 L58 92 L64 97",
  "M52 54 L55 47 L51 41 L57 34 L54 28 L59 21 L55 15 L61 8",
  "M47 48 L41 44 L34 47 L29 42 L22 44 L17 37 L10 40",
  "M81 43 L89 38 L92 32 L98 29",
  "M43 88 L38 94 L31 92 L26 98",
];

export default function Act3Break() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [portraitAvailable, setPortraitAvailable] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "none" } });
      const crackPaths = gsap.utils.toArray<SVGPathElement>(
        ".act3-fracture-line",
        sectionRef.current,
      );
      const shardLayers = gsap.utils.toArray<HTMLElement>(
        ".act3-shard",
        sectionRef.current,
      );

      crackPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      shardLayers.forEach((shard) => gsap.set(shard, { autoAlpha: 0 }));

      timeline.fromTo(
        ".act3-base-image, .act3-base-fallback",
        { filter: "saturate(0.2) brightness(0.48)" },
        { filter: "saturate(0.12) brightness(0.16)", duration: 0.82 },
        0,
      );

      crackPaths.forEach((path, index) => {
        timeline.to(
          path,
          { strokeDashoffset: 0, duration: 0.105, ease: "power2.out" },
          0.015 + index * 0.025,
        );
      });

      timeline.to(".act3-amber-flash", { opacity: 0.62, duration: 0.055 }, 0.34);
      timeline.to(".act3-amber-flash", { opacity: 0, duration: 0.06 }, 0.395);

      shardLayers.forEach((shard, index) => {
        const target = shards[index];
        timeline.to(
          shard,
          {
            autoAlpha: 1,
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            duration: 0.34 + index * 0.018,
            ease: "power2.in",
          },
          0.34 + index * 0.018,
        );
      });

      timeline.to(".act3-blackout", { opacity: 0.96, duration: 0.11 }, 0.53);
      timeline.to(".act3-blackout", { opacity: 0.24, duration: 0.16 }, 0.64);
      timeline.fromTo(
        ".act3-impact-card",
        { autoAlpha: 0, y: -16, rotation: -6 },
        {
          autoAlpha: 1,
          y: 0,
          rotation: 0,
          duration: 0.12,
          ease: "back.out(1.8)",
        },
        0.73,
      );

      timeline.to(".act3-shard", { autoAlpha: 0, duration: 0.14, stagger: 0.012 }, 1.38);
      timeline.to(".act3-fracture-line", { opacity: 0, duration: 0.12 }, 1.4);
      timeline.to(".act3-impact-card", { autoAlpha: 0, duration: 0.1 }, 1.72);
      timeline.to(".act3-scene", { opacity: 0, duration: 0.12 }, 1.78);
      timeline.to(stageRef.current, { opacity: 0, duration: 0.05 }, 1.85);

      ScrollTrigger.create({
        animation: timeline,
        trigger: sectionRef.current,
        pin: stageRef.current,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="act-3"
      aria-label="Act 3: The Break"
      className="relative mt-[300svh] h-[150svh]"
    >
      <div ref={stageRef} className="relative z-20 h-[100svh] w-full overflow-hidden bg-[#050505]">
        <div className="act3-scene absolute inset-0">
          <div className="act3-base-layer absolute inset-0 z-0 overflow-hidden bg-[#0a0a09]">
            <div
              aria-hidden="true"
              className="act3-base-fallback portrait-fallback absolute inset-0"
            />
            {portraitAvailable && (
              <Image
                src="/images/portrait.png"
                alt=""
                fill
                sizes="100vw"
                className="act3-base-image z-[1] object-cover object-[50%_42%]"
                onError={() => setPortraitAvailable(false)}
              />
            )}
            <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,9,8,0.5)_0%,rgba(10,9,8,0.2)_38%,rgba(10,9,8,0.38)_68%,rgba(10,9,8,0.74)_100%),linear-gradient(90deg,rgba(10,9,8,0.22),transparent_46%,rgba(10,9,8,0.22))]" />
          </div>

          <div className="pointer-events-none absolute inset-0 z-[5]">
            {shards.map((shard, index) => (
              <div
                key={index}
                className="act3-shard absolute inset-0"
                style={{ clipPath: shard.clipPath }}
                aria-hidden="true"
              >
                {portraitAvailable ? (
                  <Image
                    src="/images/portrait.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[50%_42%]"
                    onError={() => setPortraitAvailable(false)}
                  />
                ) : (
                  <div className="portrait-fallback absolute inset-0" />
                )}
              </div>
            ))}
          </div>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="act3-crack-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="0.48" result="soft-glow" />
                <feMerge>
                  <feMergeNode in="soft-glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#act3-crack-glow)">
              <g transform="translate(64 4) scale(0.32 0.56)">
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
              <path
                d="M84.8 38.72 L81 43 L83 48 L72 53 L75 58 L63 64 L67 68 L58 74 L54 82 L43 88"
                fill="none"
                stroke="#f0d6b8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.16"
                opacity="0.9"
              />
              <path
                d="M75 58 L81 61 L84 67 L92 72"
                fill="none"
                stroke="#f0d6b8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.13"
                opacity="0.8"
              />
              <path
                d="M63 64 L59 58 L52 54 L47 48"
                fill="none"
                stroke="#f0d6b8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.13"
                opacity="0.78"
              />
              <path
                d="M67 68 L73 74 L72 80 L80 85"
                fill="none"
                stroke="#f0d6b8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.12"
                opacity="0.74"
              />
              {fractureLines.map((path) => (
                <path
                  key={path}
                  className="act3-fracture-line"
                  d={path}
                  fill="none"
                  stroke="#f0d6b8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.14"
                />
              ))}
            </g>
          </svg>

          <div className="act3-blackout pointer-events-none absolute inset-0 z-20 bg-[#030303] opacity-0" />
          <div className="act3-amber-flash pointer-events-none absolute inset-0 z-30 bg-rust opacity-0" />
          <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-5 sm:px-12">
            <p className="act3-impact-card pressure-note pressure-note-2 max-w-[850px] px-7 py-7 text-center font-display text-[clamp(1.65rem,4vw,3.8rem)] italic leading-[1.14] text-[#35271d] sm:px-12 sm:py-10">
              You don&apos;t have to hold the frame together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}