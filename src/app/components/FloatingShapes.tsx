"use client";
import { motion } from "framer-motion";

const shapes = [
  {
    id: 1,
    style: "top-10 left-10 w-32 h-32",
    color: "#50b4ff33",
    delay: 0,
    svg: (
      <circle cx="50%" cy="50%" r="50%" fill="#50b4ff33" />
    ),
  },
  {
    id: 2,
    style: "bottom-20 right-20 w-40 h-40",
    color: "#ffb45033",
    delay: 1,
    svg: (
      <rect width="100%" height="100%" rx="20" fill="#ffb45033" />
    ),
  },
  {
    id: 3,
    style: "top-1/2 left-1/3 w-24 h-24",
    color: "#b450ff33",
    delay: 2,
    svg: (
      <polygon points="50,0 100,100 0,100" fill="#b450ff33" />
    ),
  },
  {
    id: 4,
    style: "bottom-10 left-1/4 w-28 h-28",
    color: "#50ffb433",
    delay: 1.5,
    svg: (
      <ellipse cx="50%" cy="50%" rx="50%" ry="35%" fill="#50ffb433" />
    ),
  },
];

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.svg
          key={shape.id}
          className={`absolute ${shape.style}`}
          viewBox="0 0 100 100"
          style={{ filter: "blur(2px)" }}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 8 + shape.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.svg}
        </motion.svg>
      ))}
    </div>
  );
} 