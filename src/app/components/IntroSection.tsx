// src/components/IntroSection.tsx
"use client";

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useRef } from 'react';

export default function IntroSection() {
    const headline = "A Vision, Crystallized.";
    const subheading = "Welcome to Zortech — Where Digital Experiences Become Art.";
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Animation variants for the container to stagger children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
    };

    // Animation variants for each letter
    const letterVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    // Animation for subheading
    const subheadingVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.7 } },
    };

    // Animation for button
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { delay: 1.8, duration: 0.5 } },
        hover: { scale: 1.05 },
    };

    // Smooth scroll to services section
    const handleScroll = () => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Magnetic button effect
    function handleButtonMouseMove(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) scale(1.04)`;
        btn.style.boxShadow = `0 0 32px 0 #50b4ff55`;
    }
    function handleButtonMouseLeave() {
        const btn = buttonRef.current;
        if (!btn) return;
        btn.style.transform = '';
        btn.style.boxShadow = '';
    }

    return (
        <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Animated Gradient Background - Restored Premium Version */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    background: 'linear-gradient(120deg, #101c2c 0%, #162447 40%, #23395d 70%, #38b6ff 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientFlow 16s ease-in-out infinite',
                }}
            />
            {/* Faint parallax glow layer */}
            <motion.div
                className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
                style={{
                    width: 520,
                    height: 320,
                    x: '-50%',
                    y: '-50%',
                    background: 'radial-gradient(circle, #50b4ff55 0%, transparent 80%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    x: ["-50%", "-40%", "-50%"],
                    y: ["-50%", "-60%", "-50%"],
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Subtle noise overlay for premium depth */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'url("/images/noise.png")',
                    opacity: 0.10,
                    mixBlendMode: 'soft-light',
                }}
            />
            <style>{`
                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    25% { background-position: 50% 100%; }
                    50% { background-position: 100% 50%; }
                    75% { background-position: 50% 0%; }
                    100% { background-position: 0% 50%; }
                }
                .crystal-shimmer {
                    position: relative;
                    display: inline-block;
                }
                .crystal-shimmer::after {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; right: 0; bottom: 0;
                    background: linear-gradient(120deg, transparent 0%, #fff8 40%, #50b4ff88 60%, transparent 100%);
                    opacity: 0.7;
                    mix-blend-mode: lighten;
                    pointer-events: none;
                    z-index: 2;
                    animation: shimmerMove 3.5s linear infinite;
                    background-size: 200% 100%;
                    background-position: -100% 0;
                }
                @keyframes shimmerMove {
                    0% { background-position: -100% 0; }
                    60% { background-position: 120% 0; }
                    100% { background-position: 120% 0; }
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-8 lg:px-16 xl:px-32 max-w-5xl mx-auto">
                <motion.h1
                    className="w-full text-4xl md:text-7xl font-extrabold text-center text-white drop-shadow-lg mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <span className="crystal-shimmer">
                        {headline.split("").map((letter, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block">
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>
                <motion.p
                    className="w-full text-lg md:text-2xl text-center text-white/80 mb-10 max-w-2xl mx-auto"
                    variants={subheadingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {subheading}
                </motion.p>
                <motion.button
                    ref={buttonRef}
                    className="px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg shadow-lg hover:bg-accent transition-colors"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={handleScroll}
                    onMouseMove={handleButtonMouseMove}
                    onMouseLeave={handleButtonMouseLeave}
                    whileTap={{ scale: 0.97 }}
                >
                    Begin the Journey
                </motion.button>
            </div>

            {/* Animated Arrow Cue */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <FiArrowDown className="text-3xl text-white/80" />
            </motion.div>
        </section>
    );
} 