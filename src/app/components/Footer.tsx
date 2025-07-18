// components/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-dark-surface text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {currentYear} Your Agency. All Rights Reserved.</p>
            </div>
        </footer>
    );
  }