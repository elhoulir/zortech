// InfiniteScrollLoopWrapper.tsx
// This component creates a seamless, bi-directional infinite scroll loop by rendering its children twice. When the user scrolls into the duplicate, it instantly resets scroll position to the original, creating an endless scroll illusion.
"use client";
import { useRef, useEffect } from "react";

export default function InfiniteScrollLoopWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Set initial scroll to the start of the original content
    container.scrollTop = content.offsetTop;

    const handleScroll = () => {
      if (!container || !content) return;
      const scrollTop = container.scrollTop;
      const contentHeight = content.offsetHeight;
      // If scrolled past the end of the first content (into duplicate)
      if (scrollTop >= contentHeight * 2) {
        container.scrollTop = scrollTop - contentHeight;
      }
      // If scrolled above the start of the first content (into duplicate at top)
      else if (scrollTop <= 0) {
        container.scrollTop = scrollTop + contentHeight;
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        position: "relative",
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
      {/* Duplicate content for seamless looping */}
      <div>
        {children}
      </div>
    </div>
  );
} 