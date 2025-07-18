// src/app/about/page.tsx
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

export default function AboutPage() {
    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
                    <p className="text-lg text-muted-foreground mt-4">The story and mission behind our work.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-surface p-8 rounded-lg border border-border">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="leading-relaxed">
                            Founded in 2025, our agency was born from a passion for technology and a desire to help businesses thrive in the digital age. We focus on building strong, collaborative partnerships with clients, dedicating ourselves to crafting high-quality digital solutions that are not just functional, but also drive real, measurable results.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start">
                            <FiTarget className="text-5xl text-accent mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold">Our Mission</h3>
                                <p className="text-muted-foreground mt-1">
                                    To empower businesses by providing innovative and efficient digital tools that enhance processes, improve functionality, and extend their online reach.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FiEye className="text-5xl text-accent mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold">Our Vision</h3>
                                <p className="text-muted-foreground mt-1">
                                    To become a leading digital partner for businesses, known for our commitment to quality, innovation, and client success.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FiHeart className="text-5xl text-accent mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold">Our Values</h3>
                                <p className="text-muted-foreground mt-1">
                                    We value partnership, transparency, and a relentless pursuit of excellence in every project we undertake.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}