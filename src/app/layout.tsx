import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shopping/CartDrawer';
import { WishlistDrawer } from '@/components/shopping/WishlistDrawer';
import { SampleBagDrawer } from '@/components/shopping/SampleBagDrawer';
import { SearchDialog } from '@/components/shopping/SearchDialog';
import { CheckoutModal } from '@/components/shopping/CheckoutModal';
import { ProductQuickView } from '@/components/product/ProductQuickView';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quick Floors | Online Flooring, Tile & Backsplash Showroom Canada',
  description:
    'Discover world-class luxury vinyl tile, grand format porcelain, marble, and wall tiles online. 5 free samples delivered across Canada with curbside freight service.',
  keywords: [
    'Quick Floors',
    'flooring canada',
    'luxury vinyl tile',
    'porcelain tiles toronto',
    'free flooring samples canada',
    'backsplash tiles online',
    'marble tiles canada',
  ],
  authors: [{ name: 'Quick Floors Canada' }],
  metadataBase: new URL('https://www.quickfloors.ca'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Quick Floors — Canada’s Digital Flooring Showroom',
    description:
      'We’ll bring the showroom to you. Order 5 free samples delivered direct to your door.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.quickfloors.ca',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#252522]">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <WishlistDrawer />
          <SampleBagDrawer />
          <SearchDialog />
          <CheckoutModal />
          <ProductQuickView />
        </StoreProvider>
      </body>
    </html>
  );
}
