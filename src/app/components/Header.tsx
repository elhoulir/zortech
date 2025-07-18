// src/components/Header.tsx
"use client";

import { Link as ScrollLink } from 'react-scroll';
import { motion, useScroll } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Header() {
    const { scrollYProgress } = useScroll();

    // "Contact" link is now correctly in this array
    const navLinks = [
        { to: 'services', label: 'Services' },
        { to: 'portfolio', label: 'Portfolio' },
        { to: 'about', label: 'About' },
        { to: 'contact', label: 'Contact' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <motion.div
                className="h-1 bg-accent origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <nav className="container mx-auto flex justify-between items-center p-4 text-foreground bg-surface/50 backdrop-blur-lg">
                <ScrollLink
                    to="home"
                    smooth={true}
                    duration={500}
                    className="text-2xl font-bold cursor-pointer"
                >
                    Your Agency
                </ScrollLink>

                <ul className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <motion.div
                                whileHover={{ scale: 1.08, color: '#50b4ff' }}
                                whileTap={{ scale: 0.96 }}
                                style={{ display: 'inline-block' }}
                            >
                                <ScrollLink
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    offset={-50}
                                    activeClass="!text-accent"
                                    className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </ScrollLink>
                            </motion.div>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:block">
                    <MagneticButton
                        strength={0.6}
                        className="bg-accent text-black py-2 px-4 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                            const el = document.getElementById('contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Book a Meeting
                    </MagneticButton>
                </div>
            </nav>
        </header>
    );
}