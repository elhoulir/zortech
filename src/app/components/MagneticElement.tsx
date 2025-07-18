"use client";

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

export default function MagneticElement({ 
  children, 
  className = "", 
  strength = 0.2,
  as = "div",
  ...props 
}: MagneticElementProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [strength * 20, -strength * 20]);
  const rotateY = useTransform(x, [-100, 100], [-strength * 20, strength * 20]);
  const translateX = useTransform(x, [-100, 100], [-strength * 15, strength * 15]);
  const translateY = useTransform(y, [-100, 100], [-strength * 15, strength * 15]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        x: isHovered ? translateX : 0,
        y: isHovered ? translateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
} 