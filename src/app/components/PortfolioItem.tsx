// components/PortfolioItem.tsx
"use client"; // Required for Framer Motion components

import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion

interface PortfolioItemProps {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
}

export default function PortfolioItem({ title, description, imageUrl, tags }: PortfolioItemProps) {
    return (
        // Convert to motion.div and add hover animation
        <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-surface rounded-lg shadow-lg overflow-hidden border border-border"
      >
            <Image
                src={imageUrl}
                alt={title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}