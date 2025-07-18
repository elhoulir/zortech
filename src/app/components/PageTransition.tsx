// src/components/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: "relative" }}
      >
        {/* Overlay for cinematic transition */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: "none",
            background:
              "linear-gradient(120deg, #1a2233 0%, #2c3e50 40%, #6a1b9a 70%, #ff4081 100%)",
            boxShadow: "0 0 120px 40px #1a2233 inset",
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}