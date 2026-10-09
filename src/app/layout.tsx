import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { SITE_CONFIG, LOCAL_BUSINESS_JSON_LD, FAQ_SCHEMA } from '../data/seo-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Buy Chemicals in Lagos & Ojota Market | OjotaChem Direct Wholesale Depot',
    template: '%s | OjotaChem Chemical Depot Lagos',
  },
  description:
    'Lagos & Ojota’s #1 certified supplier of industrial chemicals, water treatment reagents, soap raw materials, cosmetics ingredients, and laboratory AR grade chemicals. Pay online or pay onsite at our Ojota Chemical Market depot. Same-day Lagos delivery.',
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: 'OjotaChem Industrial & Specialty Chemicals Ltd' }],
  creator: 'OjotaChem Lagos',
  publisher: 'OjotaChem Chemical Depot',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Buy Industrial & Laboratory Chemicals in Lagos | Ojota Depot',
    description:
      'Verified chemical suppliers at Ojota Chemical Market, Lagos. 100% pure industrial, water treatment, cosmetics, and lab chemicals. Pay online or onsite at depot. Fast Lagos dispatch.',
    url: SITE_CONFIG.url,
    siteName: 'OjotaChem Lagos',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Chemicals in Lagos & Ojota | OjotaChem Wholesale Depot',
    description:
      'Buy verified chemicals directly from Ojota Chemical Market, Lagos. Pay online or onsite at warehouse. Batch COA & MSDS included.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'NG-LA',
    'geo.placename': 'Ojota, Lagos',
    'geo.position': '6.5862;3.3768',
    'ICBM': '6.5862, 3.3768',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
        <ClerkProvider>
          <CartProvider>{children}</CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}