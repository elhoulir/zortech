// src/app/portfolio/page.tsx
import PortfolioItem from '../components/PortfolioItem'; // Corrected Path

const projects = [
    {
        title: 'E-commerce Platform for Retailer',
        description: 'A full-featured online store with custom inventory management and a secure payment gateway, leading to a 40% increase in online sales.',
        imageUrl: '/images/project1.jpg', // Using local images
        tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
    },
    {
        title: 'Custom CRM for a Consulting Firm',
        description: 'Developed a bespoke Customer Relationship Management tool to automate client tracking and reporting, saving 15+ hours of manual work per week.',
        imageUrl: '/images/project2.jpg',
        tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    {
        title: 'Mobile POS System for Cafes',
        description: 'An intuitive Point-of-Sale mobile app that integrates with existing hardware and provides real-time sales analytics.',
        imageUrl: '/images/project3.jpg',
        tags: ['React Native', 'Firebase', 'Systems Integration'],
    },
];

export default function PortfolioPage() {
    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold">Our Work</h1>
                    <p className="text-lg text-muted-foreground mt-4">A selection of projects that showcase our expertise.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <PortfolioItem
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            imageUrl={project.imageUrl}
                            tags={project.tags}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}