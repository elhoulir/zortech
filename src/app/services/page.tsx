// src/app/services/page.tsx
"use client";

import { FiCode, FiLayers, FiSmartphone, FiDatabase, FiCloud, FiGitMerge, FiArrowRight } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Service {
    icon: IconType;
    title: string;
    description: string;
    features: string[];
    color: string;
}

// Enhanced services with more detail
const services: Service[] = [
    {
        icon: FiLayers,
        title: 'Professional Web Design',
        description: 'We create visually stunning, user-friendly websites that are optimized for performance and engagement across all devices.',
        features: ['Responsive Design', 'UI/UX Excellence', 'Performance Optimization', 'SEO Integration'],
        color: '#50b4ff'
    },
    {
        icon: FiCode,
        title: 'Custom Web Development',
        description: 'From complex web applications to custom features, we build robust solutions tailored to your specific business needs.',
        features: ['Full-Stack Development', 'Custom Features', 'Scalable Architecture', 'API Development'],
        color: '#6366f1'
    },
    {
        icon: FiDatabase,
        title: 'Custom CRM Solutions',
        description: 'Streamline your customer management with a bespoke CRM system designed to fit your unique workflow and processes.',
        features: ['Workflow Automation', 'Data Analytics', 'Integration Ready', 'Custom Reporting'],
        color: '#8b5cf6'
    },
    {
        icon: FiSmartphone,
        title: 'Point-of-Sale (POS) Systems',
        description: 'Modern POS solutions that are easy to use, feature-rich, and seamlessly integrate with your inventory and sales data.',
        features: ['Inventory Management', 'Payment Processing', 'Sales Analytics', 'Multi-location Support'],
        color: '#06b6d4'
    },
    {
        icon: FiGitMerge,
        title: 'Software & API Integrations',
        description: 'We connect your disparate software systems, enabling them to communicate and share data for improved efficiency.',
        features: ['Third-party APIs', 'Data Synchronization', 'Real-time Updates', 'Error Handling'],
        color: '#10b981'
    },
    {
        icon: FiCloud,
        title: 'Cloud & DevOps Solutions',
        description: 'Leverage the power of the cloud with our expert setup, deployment, and management services to ensure scalability and reliability.',
        features: ['Cloud Migration', 'CI/CD Pipelines', 'Monitoring & Logging', 'Security & Compliance'],
        color: '#f59e0b'
    },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    return (
        <motion.div
            ref={cardRef}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="group relative bg-surface/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-border transition-all duration-500 overflow-hidden"
        >
            {/* Gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                }}
            />
            
            {/* Animated icon */}
            <motion.div
                className="relative z-10 mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                        background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                        border: `1px solid ${service.color}30`
                    }}
                >
                    <service.icon 
                        className="text-3xl" 
                        style={{ color: service.color }}
                    />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-white transition-colors duration-300">
                    {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                </p>
                
                {/* Features list */}
                <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                        <motion.div
                            key={feature}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="flex items-center text-sm text-muted-foreground"
                        >
                            <div 
                                className="w-1.5 h-1.5 rounded-full mr-3"
                                style={{ backgroundColor: service.color }}
                            />
                            {feature}
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-sm font-medium group/btn"
                    style={{ color: service.color }}
                >
                    Learn More
                    <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
            </div>

            {/* Subtle glow effect */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `0 0 40px ${service.color}20`,
                }}
            />
        </motion.div>
    );
}

export default function ServicesPage() {
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
                            Our Services
                        </h1>
                    </motion.div>
                    
                    <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Transforming ideas into digital excellence with cutting-edge solutions that drive your business forward
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-20"
                >
                    <div className="bg-surface/30 backdrop-blur-xl border border-border/50 rounded-2xl p-12 max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss how our services can elevate your digital presence and streamline your operations.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        >
                            Start Your Project
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}