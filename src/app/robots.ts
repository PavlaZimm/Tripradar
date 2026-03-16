import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/account',
          '/account/',
          '/login',
          '/register',
          '/mystery/confirm',
          '/_next/',
        ],
      },
      // Blokuj AI scrapery — chráníme obsah pro SEO i autorská práva
      {
        userAgent: [
          'GPTBot',
          'Google-Extended',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Bytespider',
          'Diffbot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
