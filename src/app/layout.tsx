import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // Corrected Path
import Footer from './components/Footer'; // Corrected Path
import CustomCursor from './components/CustomCursor'; // Import the new component
import PageTransition from './components/PageTransition'; // Import the new component
import ScrollProgressBar from './components/ScrollProgressBar';
import ThreeBackground from './components/ThreeBackground';
// import HeroContent from './components/HeroContent';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Your Digital Agency',
  description: 'Professional Web & Software Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} flex flex-col min-h-screen`}>
        <ScrollProgressBar />
        {/* <HeroContent /> */}
        <ThreeBackground />
        <CustomCursor /> {/* Add the cursor component here */}
        <Header />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}