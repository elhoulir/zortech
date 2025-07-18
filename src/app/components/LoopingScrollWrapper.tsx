// LoopingScrollWrapper.tsx
// This component creates a looping scroll effect: scrolling past the bottom brings you to the top, and scrolling above the top brings you to the bottom. For immersive, premium single-page experiences.
"use client";
import { useEffect } from "react";

export default function LoopingScrollWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      // If at the very top, jump to bottom
      if (scrollTop <= 0) {
        window.scrollTo({ top: docHeight - windowHeight - 1, behavior: "auto" });
      }
      // If at the very bottom, jump to top
      else if (scrollTop + windowHeight >= docHeight) {
        window.scrollTo({ top: 1, behavior: "auto" });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <>{children}</>;
} 