import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'The Magic Spice | Luxury Multi Cuisine Restaurant — Hyderabad',
    template: '%s | The Magic Spice',
  },
  description: 'Experience culinary excellence at The Magic Spice — Hyderabad\'s finest multi-cuisine restaurant serving Hyderabadi, Mughlai, Chinese, Continental, Arabian Mandi and more. Dine in Nagarkurnool, Wanaparthi & Bangalore.',
  keywords: [
    'luxury restaurant Hyderabad',
    'fine dining Hyderabad',
    'multi cuisine restaurant Hyderabad',
    'best restaurant Hyderabad',
    'Hyderabadi biryani restaurant',
    'The Magic Spice Nagarkurnool',
    'Mughlai restaurant Hyderabad',
    'Arabian Mandi Hyderabad',
    'restaurant Nagarkurnool',
    'The Magic Spice restaurant',
    'TMS restaurant',
    'catering Hyderabad',
  ],
  authors: [{ name: 'The Magic Spice' }],
  creator: 'The Magic Spice',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://themagicspice.in',
    siteName: 'The Magic Spice',
    title: 'The Magic Spice | Luxury Multi Cuisine Restaurant',
    description: 'Where Luxury Meets Flavor — Multi-cuisine restaurant serving Hyderabadi, Mughlai, Arabian Mandi, Chinese & more.',
    images: [{ url: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1200&q=80', width: 1200, height: 630, alt: 'The Magic Spice Restaurant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Magic Spice | Luxury Multi Cuisine Restaurant',
    description: 'Where Luxury Meets Flavor',
    images: ['https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://themagicspice.in' },
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'The Magic Spice',
  alternateName: 'TMS',
  description: 'Luxury Multi-Cuisine Restaurant in Hyderabad serving Hyderabadi, Mughlai, Arabian Mandi, Chinese, Continental & more.',
  url: 'https://themagicspice.in',
  telephone: '+919849122963',
  email: 'info@themagicspice.in',
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagarkurnool',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 16.4954018, longitude: 78.296533 },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '11:00',
    closes: '23:00',
  }],
  servesCuisine: ['Indian', 'Hyderabadi', 'Mughlai', 'Chinese', 'Continental', 'Arabian'],
  priceRange: '₹₹',
  hasMap: 'https://www.google.com/maps/place/THE+MAGIC+SPICE/@16.4954018,78.296533,17z',
  image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1200&q=80',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="bg-obsidian text-white overflow-x-hidden">
        {/* Noise grain texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Desktop Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile bottom navigation */}
        <MobileNav />

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1C1C1E',
              color: '#F5F5F5',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            },
          }}
        />
      </body>
    </html>
  );
}
