// src/components/PortfolioCard.tsx
"use client";

import Image from 'next/image';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface PortfolioCardProps {
    project: {
        title: string;
        description: string;
        image: string;
    };
    i: number; // Add this line
    progress: MotionValue<number>;
}

export default function PortfolioCard({ project, i, progress }: PortfolioCardProps) {
    const container = useRef<HTMLDivElement>(null);

    const scale = useTransform(progress, [i * 0.1, (i + 1) * 0.1], [0.8, 1]);

    return (
        <motion.div
            ref={container}
            style={{ scale }}
            className="relative w-[80vw] h-[80vh] md:w-[60vw] md:h-[70vh] flex-shrink-0"
        >
            <div className="w-full h-full bg-surface p-4 rounded-lg border border-border">
                <div className="relative w-full h-full">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill={true}
                        style={{ objectFit: 'contain' }}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </motion.div>
    );
}