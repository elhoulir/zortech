// components/LogoCloud.tsx
"use client";

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

// Add the logos you have in your /public/logos folder here
const logos = [
    { src: '/logos/nextjs.svg', alt: 'Next.js' },
    { src: '/logos/react.svg', alt: 'React' },
    { src: '/logos/figma.svg', alt: 'Figma' },
    { src: '/logos/javascript.svg', alt: 'Javascript' },
    { src: '/logos/aws.svg', alt: 'AWS' },
    { src: '/logos/stripe.svg', alt: 'Stripe' },
];

export default function LogoCloud() {
    return (
        <div className="py-12 bg-dark-bg">
            <div className="container mx-auto text-center">
                <h3 className="text-lg font-semibold text-light-text mb-8">
                    Powered by Cutting-Edge Technologies
                </h3>
                <Marquee
                    gradient={true}
                    gradientColor="#121212"
                    gradientWidth={100}
                    speed={40}
                    pauseOnHover={true}
                >
                    {logos.map((logo) => (
                        <div key={logo.alt} className="mx-8">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={100}
                                height={50}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}