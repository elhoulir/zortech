"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-2 bg-white z-[9999] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
} 