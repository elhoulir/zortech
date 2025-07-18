// src/app/contact/page.tsx
"use client";

import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface ContactMethod {
    icon: any;
    title: string;
    value: string;
    link?: string;
    color: string;
}

const contactMethods: ContactMethod[] = [
    {
        icon: FiMail,
        title: "Email",
        value: "contact@youragency.com",
        link: "mailto:contact@youragency.com",
        color: "#50b4ff"
    },
    {
        icon: FiPhone,
        title: "Phone",
        value: "+1 (123) 456-7890",
        link: "tel:+11234567890",
        color: "#10b981"
    },
    {
        icon: FiMapPin,
        title: "Location",
        value: "Melbourne, VIC, Australia",
        color: "#f59e0b"
    }
];

function FloatingContactCard({ contact, index }: { contact: ContactMethod; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ y: 60, opacity: 0, rotateX: -15 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ 
                y: -20,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-surface/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-border transition-all duration-500 overflow-hidden cursor-pointer"
            style={{ perspective: "1000px" }}
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${contact.color}15 0%, transparent 100%)`,
                }}
            />
            
            {/* Floating icon */}
            <motion.div
                className="relative z-10 mb-6"
                animate={{ 
                    y: isHovered ? -5 : 0,
                    scale: isHovered ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                        background: `linear-gradient(135deg, ${contact.color}20 0%, ${contact.color}10 100%)`,
                        border: `1px solid ${contact.color}30`
                    }}
                >
                    <contact.icon 
                        className="text-3xl" 
                        style={{ color: contact.color }}
                    />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                    {contact.title}
                </h3>
                {contact.link ? (
                    <a 
                        href={contact.link}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                        {contact.value}
                    </a>
                ) : (
                    <p className="text-muted-foreground">
                        {contact.value}
                    </p>
                )}
            </div>

            {/* Glow effect */}
            <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `0 0 40px ${contact.color}20`,
                }}
            />
        </motion.div>
    );
}

function AnimatedForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    
    return (
        <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-surface/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 lg:p-12"
        >
            <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            
            <form action="https://formspree.io/f/your_unique_id" method="POST" className="space-y-6">
                {/* Name Field */}
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="relative">
                        <FiUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 ${
                            focusedField === 'name' ? 'text-blue-500' : 'text-muted-foreground'
                        }`} />
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            required 
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="relative">
                        <FiMail className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 ${
                            focusedField === 'email' ? 'text-blue-500' : 'text-muted-foreground'
                        }`} />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            required 
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        />
                    </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="relative">
                        <FiMessageSquare className={`absolute left-4 top-4 text-xl transition-colors duration-300 ${
                            focusedField === 'message' ? 'text-blue-500' : 'text-muted-foreground'
                        }`} />
                        <textarea 
                            name="message" 
                            placeholder="Your Message" 
                            rows={5} 
                            required 
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm resize-none"
                        />
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
                >
                    <span>Send Message</span>
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
            </form>
        </motion.div>
    );
}

function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
        </div>
    );
}

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
            {/* Immersive background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
                <motion.div 
                    className="absolute inset-0 opacity-30"
                    style={{ y }}
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </motion.div>
                <FloatingParticles />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-20"
                    style={{ opacity }}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                            Get in Touch
                        </h1>
                    </motion.div>
                    
                    <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Ready to bring your vision to life? Let's start a conversation about your next project.
                    </motion.p>
                </motion.div>

                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                    {contactMethods.map((contact, index) => (
                        <FloatingContactCard key={contact.title} contact={contact} index={index} />
                    ))}
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <AnimatedForm />
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="bg-surface/20 backdrop-blur-xl border border-border/30 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Response Time</h3>
                        <p className="text-muted-foreground">
                            We typically respond within 24 hours during business days. 
                            For urgent matters, please call us directly.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}