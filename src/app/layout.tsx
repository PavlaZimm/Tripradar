import type { Metadata, Viewport } from 'next'
import { fraunces, plusJakartaSans } from './fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz'),
  title: {
    default: 'TripRadar — Český travel magazín',
    template: '%s | TripRadar',
  },
  description:
    'Česky psaný travel magazín pro všechny cestovatele. Průvodci po světových destinacích, tipy na výlety, mystery výlety a e-booky.',
  keywords: ['cestování', 'travel', 'průvodce', 'destinace', 'výlety', 'cestovní tipy'],
  authors: [{ name: 'TripRadar', url: 'https://tripradar.cz' }],
  creator: 'TripRadar',
  publisher: 'TripRadar',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://tripradar.cz',
    siteName: 'TripRadar',
    title: 'TripRadar — Český travel magazín',
    description:
      'Česky psaný travel magazín pro všechny cestovatele. Průvodci, tipy, mystery výlety.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TripRadar — Český travel magazín',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripRadar — Český travel magazín',
    description: 'Česky psaný travel magazín pro všechny cestovatele.',
    images: ['/og-image.jpg'],
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
  alternates: {
    canonical: 'https://tripradar.cz',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F0E8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Speculation Rules API — prefetch article pages pro near-instant navigaci */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: { href_matches: '/article/*' },
                  eagerness: 'moderate',
                },
              ],
              prefetch: [
                {
                  where: { href_matches: '/category/*' },
                  eagerness: 'conservative',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-[var(--color-accent-primary)] focus:px-4 focus:py-2 focus:text-white"
        >
          Přejít na obsah
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
