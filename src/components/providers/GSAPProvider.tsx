"use client";

import { useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Refresh ScrollTrigger on mount and resize
    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Reduced motion support
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(0);
        ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
      } else {
        gsap.globalTimeline.timeScale(1);
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
      }
    };

    if (mediaQuery.matches) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <>{children}</>;
}

// GSAP utility functions for the Nocturne motion language
export const nocturneEase = {
  flutter: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  sigh: "cubic-bezier(0.16, 1, 0.3, 1)",
  ritual: "cubic-bezier(0.05, 0.61, 0.41, 0.9)",
  caress: "cubic-bezier(0.23, 1, 0.32, 1)",
};

export const nocturneDuration = {
  flutter: 0.18,
  sigh: 0.4,
  ritual: 0.8,
  caress: 0.6,
};

// Reusable animation presets
export const animations = {
  fadeIn: (element: Element | string, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: nocturneDuration.sigh, ease: nocturneEase.sigh, delay }
    ),

  slideUp: (element: Element | string, delay = 0, distance = 30) =>
    gsap.fromTo(
      element,
      { opacity: 0, y: distance },
      { opacity: 1, y: 0, duration: nocturneDuration.sigh, ease: nocturneEase.sigh, delay }
    ),

  scaleIn: (element: Element | string, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: nocturneDuration.flutter, ease: nocturneEase.flutter, delay }
    ),

  staggerChildren: (container: Element | string, stagger = 0.1) =>
    gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0 },
      {
        stagger,
        ease: nocturneEase.sigh,
        duration: nocturneDuration.sigh,
      }
    ),

  // Parallax helper
  parallax: (element: Element | string, speed = 0.5) =>
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }),

  // Text reveal (letter by letter)
  textReveal: (element: Element | string, delay = 0) => {
    const splitText = new SplitText(element, { type: "chars,words" });
    return gsap.fromTo(
      splitText.chars,
      { opacity: 0, y: 20, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: nocturneDuration.caress,
        ease: nocturneEase.caress,
        stagger: 0.03,
        delay,
      }
    );
  },

  // Wax seal animation
  waxSeal: (element: Element | string) =>
    gsap.timeline({ defaults: { ease: nocturneEase.ritual } })
      .fromTo(element, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.6 })
      .fromTo(element, { boxShadow: "0 0 0 rgba(192,57,43,0)" }, { boxShadow: "0 0 30px rgba(192,57,43,0.6)", duration: 0.4 }, "-=0.2")
      .to(element, { boxShadow: "0 0 10px rgba(192,57,43,0.3)", duration: 0.4 }),
};

// SplitText helper (minimal implementation)
class SplitText {
  chars: Element[];
  words: Element[];
  lines: Element[];

  constructor(element: Element | string, options: { type: string }) {
    const el = typeof element === "string" ? document.querySelector(element) : element;
    if (!el) throw new Error("Element not found");

    const text = el.textContent || "";
    const type = options.type;

    el.innerHTML = "";

    if (type.includes("chars")) {
      this.chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        el.appendChild(span);
        return span;
      });
    }

    if (type.includes("words")) {
      this.words = text.split(" ").map((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        el.appendChild(span);
        return span;
      });
    }

    if (type.includes("lines")) {
      this.lines = [el];
    }
  }
}