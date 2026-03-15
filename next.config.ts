import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

// Security headers — nastaveny přímo v next.config, ne v middleware
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://api2.ecomailapp.cz",
      "frame-src https://js.stripe.com https://app.stay22.com",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // Security headers na všechny routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Image optimalizace — AVIF 20% menší než WebP
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'payload.tripradar.cz',
      },
      // Lokální development — Payload admin uploads
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // TypeScript strict
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint v buildu
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Experimentální: partial prerendering pro budoucí Next.js verze
  experimental: {
    reactCompiler: false,
  },
}

// withPayload obalí konfiguraci — přidá Payload CMS integraci
export default withPayload(nextConfig)
