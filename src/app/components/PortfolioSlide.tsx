// src/components/PortfolioSlide.tsx
"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioSlideProps {
    project: {
        title: string;
        description: string;
        image: string;
    };
    onClick: () => void;
}

function useTilt(maxTilt = 15) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setTilt({ x: y * maxTilt, y: x * maxTilt });
    }
    function handleMouseLeave() {
        setTilt({ x: 0, y: 0 });
    }
    return {
        ref,
        tilt,
        handleMouseMove,
        handleMouseLeave,
    };
}

export default function PortfolioSlide({ project, onClick }: PortfolioSlideProps) {
    const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(15);
    return (
        <motion.div
            onClick={onClick}
            ref={ref}
            className="bg-background rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 32px rgba(80,180,255,0.15)' }}
            style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                willChange: 'transform',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full aspect-[16/9]">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                />
                {/* Subtle overlay on hover */}
                <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.12 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: 'linear-gradient(120deg, #50b4ff 0%, #2c5364 100%)' }}
                />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {project.title}
                </h3>
                <p className="text-base text-muted-foreground">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
}