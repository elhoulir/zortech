// // src/app/page.tsx
// "use client";

// import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Loader } from '@react-three/drei';
// import FluidExperience from './components/FluidExperience';

// export default function Home() {
//   return (
//     <>
//       <div className="w-full h-screen fixed top-0 left-0">
//         <Suspense fallback={null}>
//           <Canvas>
//             <FluidExperience />
//           </Canvas>
//         </Suspense>
//       </div>
//       <Loader />
//     </>
//   );
// }


// src/app/page.tsx
// src/app/page.tsx
// src/app/page.tsx
"use client";

import { useState } from 'react';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import PortfolioSlide from './components/PortfolioSlide'; // Import the new component
import ParallaxSection from './components/ParallaxSection'; // Import the new parallax component
import MagneticButton from './components/MagneticButton'; // Import the new magnetic component
import MagneticElement from './components/MagneticElement'; // Import the new magnetic element component
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useTilt from './components/useTilt';
import ThreeBackground from './components/ThreeBackground';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import SwiperCore from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
SwiperCore.use([EffectCoverflow]);
import { useRef } from 'react';

const servicesData = [
  { title: 'Web Design', description: 'Stunning, responsive websites built for optimal performance.', image: '/images/services/web-design.jpeg' },
  { title: 'Custom CRM', description: 'Tailored software to streamline your unique workflows.', image: '/images/services/crm.jpeg' },
  { title: 'POS Systems', description: 'Seamlessly integrated systems for retail and hospitality.', image: '/images/services/pos.jpeg' },
];

const portfolioData = [
  { title: "AIC Platform", description: "A comprehensive platform for the Australian Institute of Company Directors.", image: "/images/portfolio/aic.png" },
  { title: "Crowded House", description: "An immersive fan experience website for the iconic band.", image: "/images/portfolio/crowdedhouse.png" },
  { title: "Construction Management", description: "A project management tool for the construction industry.", image: "/images/portfolio/constructionplatform.png" },
  { title: "Home Direct", description: "Buy your home with AI.", image: "/images/portfolio/homedirect.png" },
  { title: "Human Appeal", description: "Donate today.", image: "/images/portfolio/humanappeal.png" },
  { title: "Ice Cream Pro", description: "A platform for wholesale ice cream distribution.", image: "/images/portfolio/icecreampro.png" },
];

function CrystalMotif({ y = 0, x = '50%', size = 80, opacity = 0.18 }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      style={{ left: x, top: y, width: size, height: size, transform: 'translate(-50%, 0)' }}
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <polygon points="40,5 75,30 62,75 18,75 5,30" fill="#50b4ff" opacity={opacity} />
        <polygon points="40,15 65,32 58,70 22,70 15,32" fill="#fff" opacity={opacity * 0.5} />
      </svg>
    </motion.div>
  );
}

function Crystal3DGraphic({ color = '#50b4ff', size = 180, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" style={style}>
      <polygon points="90,10 170,60 150,170 30,170 10,60" fill={color} opacity="0.18" />
      <polygon points="90,30 150,65 140,150 40,150 30,65" fill="#fff" opacity="0.10" />
      <polygon points="90,10 120,90 90,170 60,90" fill="#38b6ff" opacity="0.22" />
    </svg>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [modalProject, setModalProject] = useState<null | typeof portfolioData[0]>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  // Helper to get prev/next project
  const prevProject = portfolioData[(activeIndex - 1 + portfolioData.length) % portfolioData.length];
  const nextProject = portfolioData[(activeIndex + 1) % portfolioData.length];

  return (
    <>
      <ThreeBackground />
      <Header />
      <main>
        <IntroSection />

        {/* --- Enhanced Services Section with Parallax --- */}
        <ParallaxSection speed={0.3} backgroundSpeed={0.2}>
          <motion.section
            id="services"
            className="min-h-screen py-24 bg-surface flex items-center relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
          {/* Animated background for services */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'radial-gradient(circle at 20% 40%, #50b4ff22 0%, transparent 70%)',
              animation: 'bgMove1 12s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes bgMove1 {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Expertise</h2>
              <ul>
                {servicesData.map((service, idx) => (
                  <motion.li
                    key={service.title}
                    onMouseEnter={() => setActiveService(service)}
                    className={`text-2xl font-semibold p-4 cursor-pointer transition-all duration-300 border-l-4 ${activeService.title === service.title ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground'}`}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.6, type: 'spring' }}
                    whileHover={{ scale: 1.08, color: '#50b4ff', boxShadow: '0 4px 24px rgba(80,180,255,0.15)' }}
                  >
                    {service.title}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <div className="w-full h-96 bg-background rounded-lg border border-border mb-6 overflow-hidden flex items-center justify-center relative">
                <AnimatePresence>
                  <motion.div
                    key={activeService.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image src={activeService.image} alt={activeService.title} width={600} height={400} className="w-full h-full object-cover animate-fade-in" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.p
                key={activeService.description}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-muted-foreground"
              >
                {activeService.description}
              </motion.p>
            </div>
          </div>
        </motion.section>
        </ParallaxSection>
        {/* --- End Enhanced Services Section --- */}

        <ParallaxSection speed={0.4} backgroundSpeed={0.25}>
          <motion.section
            id="portfolio"
            className="relative bg-[#18181a] py-32 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Optional noise overlay for texture */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'url(/images/noise.png)', opacity: 0.08 }} />
            <div className="container mx-auto text-center mb-16 relative z-10">
              <h2 className="text-5xl font-bold text-white tracking-tight uppercase">Our Work</h2>
            </div>
            <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center mt-20" style={{ minHeight: 520 }}>
              {/* Prev Title */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[20vw] text-right text-4xl md:text-5xl font-light tracking-widest uppercase text-white/10 hover:text-white/40 px-8 py-2 z-20 transition-colors duration-200 select-none"
                style={{ pointerEvents: 'auto' }}
                onClick={() => swiperRef.current?.slideTo((activeIndex - 1 + portfolioData.length) % portfolioData.length)}
                aria-label="Previous project"
              >
                {prevProject.title}
              </button>
              {/* Swiper Slider */}
              <Swiper
                effect={undefined}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                onSwiper={swiper => (swiperRef.current = swiper)}
                onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
                className="w-full max-w-[1500px] mx-auto"
                style={{ zIndex: 10 }}
              >
                {portfolioData.map((project, idx) => (
                  <SwiperSlide key={project.title}>
                    <motion.div
                      className="relative flex flex-col items-center justify-center cursor-pointer"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: activeIndex === idx ? 1.14 : 0.96 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      onClick={() => setModalProject(project)}
                      style={{ zIndex: activeIndex === idx ? 20 : 1 }}
                    >
                      <div className="relative w-[90vw] max-w-[1500px] aspect-[16/7] overflow-hidden mx-auto" style={{ borderRadius: 0, boxShadow: 'none', background: 'none' }}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill={true}
                          style={{ objectFit: 'cover', borderRadius: 0, boxShadow: 'none', background: 'none' }}
                          className="transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30" style={{ borderRadius: 0 }} />
                        <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-6xl md:text-7xl font-light text-white tracking-widest uppercase" style={{ letterSpacing: '0.08em', fontFamily: 'Poppins, Inter, sans-serif' }}>
                          {project.title}
                        </h3>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Next Title */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[20vw] text-left text-4xl md:text-5xl font-light tracking-widest uppercase text-white/10 hover:text-white/40 px-8 py-2 z-20 transition-colors duration-200 select-none"
                style={{ pointerEvents: 'auto' }}
                onClick={() => swiperRef.current?.slideTo((activeIndex + 1) % portfolioData.length)}
                aria-label="Next project"
              >
                {nextProject.title}
              </button>
            </div>
            {/* Full-screen detail view/modal */}
            <PortfolioModal project={modalProject} onClose={() => setModalProject(null)} />
          </motion.section>
        </ParallaxSection>

        <ParallaxSection speed={0.5} backgroundSpeed={0.3} floatingElements={false}>
          <motion.section
            id="about"
            className="min-h-screen bg-surface relative overflow-hidden flex flex-col items-center justify-center py-24"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Subtle, dark, blurred background for depth */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at 60% 40%, #181c2a 0%, #0f2027 100%)',
              filter: 'blur(12px)',
              opacity: 0.85,
            }} />
            {/* Glassmorphism panel for main content with noise and light sweep overlays */}
            <motion.div
              className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-16 border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              {/* Soft noise overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light" style={{
                backgroundImage: 'url("/images/noise.png")',
                opacity: 0.13,
              }} />
              {/* Subtle light sweep */}
              <div className="pointer-events-none absolute inset-0 z-20" style={{
                background: 'linear-gradient(120deg, transparent 60%, #fff2 80%, transparent 100%)',
                animation: 'lightSweep 8s linear infinite',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 0%',
              }} />
              <style>{`
                @keyframes lightSweep {
                  0% { background-position: 0% 0%; }
                  100% { background-position: 100% 0%; }
                }
              `}</style>
              <motion.h2
                className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg relative z-30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                We Are Zortech
              </motion.h2>
              <motion.p
                className="text-2xl md:text-3xl font-semibold text-accent mb-8 relative z-30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Where Digital Experiences Become Art
              </motion.p>
              {/* Large stylized quote with animated underline */}
              <motion.blockquote
                className="text-2xl md:text-3xl italic text-muted-foreground mb-10 max-w-2xl mx-auto font-serif relative z-30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                viewport={{ once: true }}
              >
                <span className="block relative pb-4 group">
                  We don’t just build websites. We craft digital journeys that move people.
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-0.5 rounded-full bg-accent/40 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent/0 group-hover:w-full animate-underline" />
                </span>
                <style>{`
                  .animate-underline {
                    background-size: 200% 100%;
                  }
                  .group:hover .animate-underline {
                    background: linear-gradient(90deg, #50b4ff, #b450ff, #ffb450, #50b4ff);
                    background-size: 200% 100%;
                    animation: underlineSweep 1.2s cubic-bezier(.4,0,.2,1) 1;
                  }
                  @keyframes underlineSweep {
                    0% { width: 0; opacity: 0.2; }
                    40% { width: 60%; opacity: 1; }
                    100% { width: 100%; opacity: 1; }
                  }
                `}</style>
              </motion.blockquote>
              <motion.div
                className="mb-12 relative z-30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-base md:text-lg text-foreground max-w-2xl mx-auto">
                  Founded in 2025, Zortech was born from a passion for technology and a desire to help businesses thrive in the digital age. We focus on building strong, collaborative partnerships with clients, dedicating ourselves to crafting high-quality digital solutions that are not just functional, but also drive real, measurable results. Our philosophy: every project is a work of art.
                </p>
              </motion.div>
              {/* Value/USP pillars row with icon microinteractions */}
              <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-0 mb-8 w-full max-w-2xl mx-auto relative z-30">
                {[
                  { icon: '💡', label: 'Creative Vision', desc: 'We turn ideas into digital masterpieces with bold design and innovative thinking.', color: '#50b4ff' },
                  { icon: '⚡', label: 'Cutting-Edge Tech', desc: 'We use the latest technologies to build fast, scalable, and future-proof solutions.', color: '#b450ff' },
                  { icon: '🤝', label: 'Collaborative Spirit', desc: 'We believe the best work happens when we partner closely with our clients.', color: '#ffb450' },
                ].map((item, idx, arr) => (
                  <div key={item.label} className="flex-1 flex flex-col items-center px-4 md:px-8 text-center relative group">
                    <motion.span
                      className="text-4xl md:text-5xl mb-3"
                      style={{ color: item.color }}
                      whileHover={{ scale: 1.18, textShadow: `0 0 16px ${item.color}` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-lg md:text-xl font-bold mb-2 text-foreground">{item.label}</span>
                    <span className="text-base text-muted-foreground mb-2">{item.desc}</span>
                    {/* Vertical divider except after last */}
                    {idx < arr.length - 1 && (
                      <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
              {/* Magnetic, glowing CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <MagneticButton
                  className="inline-block px-10 py-4 rounded-full bg-accent text-white font-bold text-lg shadow-lg hover:bg-accent/90 transition-colors relative overflow-hidden"
                  strength={0.7}
                  style={{ boxShadow: '0 0 32px 0 #50b4ff55, 0 2px 8px #0008' }}
                >
                  <span className="relative z-10">Start Your Project With Us</span>
                  <span className="absolute inset-0 z-0 pointer-events-none animate-pulse"
                    style={{
                      background: 'radial-gradient(circle at 60% 40%, #50b4ff44 0%, transparent 80%)',
                      opacity: 0.3,
                    }}
                  />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.section>
        </ParallaxSection>

        <motion.section
          id="contact"
          className="h-screen relative overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Animated background for contact */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'radial-gradient(circle at 30% 80%, #50ffb422 0%, transparent 70%)',
              animation: 'bgMove4 18s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes bgMove4 {
              0% { background-position: 30% 80%; }
              50% { background-position: 70% 20%; }
              100% { background-position: 30% 80%; }
            }
          `}</style>
          <ContactForm />
        </motion.section>
      </main>
    </>
  );
}

// Add ContactForm component at the bottom of the file
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <motion.div
      className="bg-background/90 rounded-xl shadow-xl p-10 w-full max-w-lg z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {submitted ? (
        <motion.div
          className="flex flex-col items-center justify-center h-64"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl mb-4">🎉</span>
          <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
          <p className="text-muted-foreground">We'll be in touch soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <motion.h2
            className="text-3xl font-bold mb-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded border border-border bg-surface focus:outline-accent"
            required
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded border border-border bg-surface focus:outline-accent"
            required
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-3 rounded border border-border bg-surface focus:outline-accent min-h-[120px]"
            required
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <MagneticButton
            type="submit"
            className="mt-2 px-6 py-3 rounded-full bg-accent text-white font-bold text-lg shadow hover:bg-accent/90 transition-colors"
            strength={0.8}
          >
            Send Message
          </MagneticButton>
        </form>
      )}
    </motion.div>
  );
}

// At the bottom of the file, add the PortfolioModal component

function PortfolioModal({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background rounded-xl shadow-2xl p-8 max-w-2xl w-full relative flex flex-col items-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-accent transition-colors"
              aria-label="Close"
            >
              ×
            </button>
            <div className="w-full aspect-[16/9] relative mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-center">{project.title}</h3>
            <p className="text-lg text-muted-foreground text-center mb-4">{project.description}</p>
            {/* Add more project details/links here if desired */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}