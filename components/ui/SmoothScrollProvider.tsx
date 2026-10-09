"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const animateScroll = (time: number) => lenis.raf(time * 1000);
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(animateScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(animateScroll);
      lenis.destroy();
    };
  }, []);

  return children;
}