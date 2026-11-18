"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  duration: 1.05,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);

    const scrollToHash = (): void => {
      const hash = window.location.hash;
      if (!hash || hash === "#") return;

      const element = document.querySelector(hash);
      if (!element) return;

      requestAnimationFrame(() => {
        lenis.scrollTo(element as HTMLElement, {
          offset: -100,
          duration: 1.15,
        });
      });
    };

    let rafId = 0;

    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      if (!hash || hash === "#") return;

      const element = document.querySelector(hash);
      if (!element) return;

      e.preventDefault();
      window.history.pushState({}, "", href);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      lenis.scrollTo(element as HTMLElement, {
        offset: -100,
        duration: 1.15,
      });
    }

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", scrollToHash);
    scrollToHash();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", scrollToHash);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
