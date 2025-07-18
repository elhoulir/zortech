// src/components/CustomCursor.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore'; // Corrected import

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    // Get the correct state property: cursorVariant
    const { cursorVariant } = useAppStore();

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    const cursorVariants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: 'var(--accent)',
            border: '2px solid #fff',
        },
        link: {
            width: 64,
            height: 64,
            backgroundColor: '#fff',
            mixBlendMode: 'difference',
            border: '2px solid transparent',
        },
    };

    return (
        <motion.div
            className="fixed rounded-full pointer-events-none z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                x: '-50%',
                y: '-50%',
            }}
            variants={cursorVariants}
            // Animate using the correct state property: cursorVariant
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
}