"use client";

import { useEffect } from "react";

export default function MotionEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.body.classList.add("motionReady");
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("isVisible")),
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); document.body.classList.remove("motionReady"); };
  }, []);

  return null;
}
