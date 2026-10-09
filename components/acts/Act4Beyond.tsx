"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const voices = [
  {
    text: "Failed a paper sophomore year. Still here.",
    edge: "paper-edge-one",
    rotation: "-rotate-[3deg]",
    offset: "md:translate-y-3",
  },
  {
    text: "Took a gap semester. Don't regret it.",
    edge: "paper-edge-two",
    rotation: "rotate-[2deg]",
    offset: "md:translate-y-0",
  },
  {
    text: "Cried in the library bathroom more times than I can count.",
    edge: "paper-edge-three",
    rotation: "-rotate-[1.5deg]",
    offset: "md:translate-y-4",
  },
  {
    text: "Changed my major twice. Nobody tells you that's okay.",
    edge: "paper-edge-four",
    rotation: "rotate-[3deg]",
    offset: "md:translate-y-1",
  },
  {
    text: "Still figuring it out. Most of us are.",
    edge: "paper-edge-one",
    rotation: "-rotate-[2deg]",
    offset: "md:translate-y-4",
  },
  {
    text: "Asked for help. It didn't make me weaker.",
    edge: "paper-edge-two",
    rotation: "rotate-[1.5deg]",
    offset: "md:translate-y-0",
  },
];

export default function Act4Beyond() {
  const sectionRef = useRef<HTMLElement>(null);
  const voicesRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".act4-voice-card",
        voicesRef.current,
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { autoAlpha: 0, y: 18, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const grain = document.querySelector(".global-grain-overlay");
      if (grain) {
        gsap.to(grain, {
          opacity: 0.1,
          duration: 0.85,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="act-4"
      aria-labelledby="act4-title"
      className="relative overflow-hidden bg-[#1b1712] px-5 py-24 text-[#eee5d7] sm:px-8 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <p className="mb-4 font-display text-sm italic text-[#c79367]">Act 04 / Beyond the Frame</p>
          <h1
            id="act4-title"
            className="font-display text-4xl leading-tight sm:text-5xl"
          >
            You are not alone in this.
          </h1>
        </header>

        <div
          ref={voicesRef}
          className="mx-auto grid max-w-[960px] grid-cols-1 items-start justify-items-center gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Anonymous student voices"
        >
          {voices.map((voice) => (
            <div
              key={voice.text}
              className={`flex w-full max-w-[280px] justify-center ${voice.offset}`}
            >
              <article
                className={`act4-voice-card ${voice.edge} ${voice.rotation} flex h-[232px] w-full items-center justify-center p-7 text-center font-display text-[22px] italic leading-[1.25] text-[#392c20] sm:text-[23px]`}
                style={{ backgroundColor: "#eee2c8" }}
              >
                {voice.text}
              </article>
            </div>
          ))}
        </div>

        <div
          ref={closingRef}
          className="mx-auto mt-32 max-w-4xl py-10 text-center sm:mt-44 sm:py-16"
        >
          <p className="font-display text-4xl leading-[1.18] text-[#f0e8dc] sm:text-5xl lg:text-6xl">
            Come for the pressure. Leave with the power.
          </p>
        </div>
      </div>
    </section>
  );
}