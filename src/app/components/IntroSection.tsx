// src/components/IntroSection.tsx
"use client";

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

export default function IntroSection() {
    const headline = "A Vision, Crystallized.";
    const subheading = "Welcome to Zortech — Where Digital Experiences Become Art.";

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

    return (
        <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    background: 'linear-gradient(120deg, #0f2027 0%, #1a2636 50%, #2c5364 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientMove 8s ease-in-out infinite',
                }}
            />
            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.h1
                    className="text-4xl md:text-7xl font-extrabold text-center text-white drop-shadow-lg mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {headline.split("").map((letter, index) => (
                        <motion.span key={index} variants={letterVariants} className="inline-block">
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-center text-white/80 mb-10 max-w-2xl"
                    variants={subheadingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {subheading}
                </motion.p>
                <motion.button
                    className="px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg shadow-lg hover:bg-accent transition-colors"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={handleScroll}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.08, backgroundColor: '#50b4ff', color: '#fff' }}
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