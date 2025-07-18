"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  backgroundSpeed?: number;
  floatingElements?: boolean;
}

export default function ParallaxSection({ 
  children, 
  className = "", 
  speed = 0.5,
  backgroundSpeed = 0.3,
  floatingElements = true 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50 * backgroundSpeed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ opacity, scale }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #50b4ff22 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #ffb45022 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #b450ff22 0%, transparent 50%)
            `,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #50b4ff, #2c5364)',
              y: useTransform(scrollYProgress, [0, 1], [0, -30]),
              x: useTransform(scrollYProgress, [0, 1], [0, 20]),
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #ffb450, #ff6b35)',
              y: useTransform(scrollYProgress, [0, 1], [0, 40]),
              x: useTransform(scrollYProgress, [0, 1], [0, -15]),
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full opacity-10 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #b450ff, #6a1b9a)',
              y: useTransform(scrollYProgress, [0, 1], [0, -20]),
              x: useTransform(scrollYProgress, [0, 1], [0, 10]),
            }}
          />
        </>
      )}

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10"
        style={{ y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 