import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FeaturedGrid } from '@/components/sections/FeaturedGrid'
import { ArticleGrid } from '@/components/sections/ArticleGrid'
import { MysteryTeaser } from '@/components/sections/MysteryTeaser'
import { EbookGrid } from '@/components/sections/EbookGrid'
import { FAQ } from '@/components/sections/FAQ'
import { getArticles, getEbooks } from '@/lib/payload'
import type { FAQItem } from '@/types'

// ISR — revalidace každé 2 minuty + on-demand z Payload webhook
export const revalidate = 120

const homepageFAQ: FAQItem[] = [
  {
    question: 'Co je TripRadar?',
    answer:
      'TripRadar je česky psaný travel magazín pro všechny cestovatele. Najdete zde průvodce po světových destinacích, tipy na výlety, mystery výletní předplatné a e-booky ke stažení.',
  },
  {
    question: 'Co jsou Mystery výlety?',
    answer:
      'Mystery výlety jsou měsíční předplatné, kde každý měsíc dostanete tip na výjimečný výlet — cíl nevíte dopředu. Dostanete kompletní průvodce, doporučení ubytování a itinerář. Vyzkoušejte 7 dní zdarma.',
  },
  {
    question: 'Jsou vaše affiliate odkazy důvěryhodné?',
    answer:
      'Ano. Doporučujeme pouze služby a produkty, které sami používáme nebo pečlivě prověřujeme. Affiliate provize nám pomáhá provozovat magazín — na ceně pro vás to nic nemění.',
  },
  {
    question: 'Jak mohu stáhnout zakoupený e-book?',
    answer:
      'Po úspěšném nákupu dostanete e-mail se stažením. E-book si také kdykoliv stáhnete ve svém účtu na tripradar.cz/account.',
  },
]

const categories = [
  { name: 'Evropa', icon: '🏛️', href: '/category/evropa' },
  { name: 'Asie', icon: '🏯', href: '/category/asie' },
  { name: 'Amerika', icon: '🗽', href: '/category/amerika' },
  { name: 'Afrika', icon: '🦁', href: '/category/afrika' },
  { name: 'Tipy', icon: '💡', href: '/category/tipy' },
  { name: 'Průvodci', icon: '🗺️', href: '/category/pruvodci' },
  { name: 'Mystery', icon: '🔮', href: '/mystery' },
  { name: 'E-booky', icon: '📖', href: '/ebooks' },
]

export const metadata: Metadata = {
  title: 'TripRadar — Český travel magazín',
  description:
    'Česky psaný travel magazín pro všechny cestovatele. Průvodci po světových destinacích, tipy na výlety, mystery výlety a e-booky.',
  openGraph: {
    title: 'TripRadar — Český travel magazín',
    description:
      'Česky psaný travel magazín pro všechny cestovatele. Průvodci, tipy, mystery výlety.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default async function HomePage() {
  // Paralelní data fetching — fallback na prázdná data při buildu bez DB
  const [featuredResult, latestResult, featuredEbooks] = await Promise.all([
    getArticles({ limit: 3 }).catch(() => ({ docs: [] })),
    getArticles({ limit: 6 }).catch(() => ({ docs: [] })),
    getEbooks({ featured: true, limit: 3 }).catch(() => []),
  ])

  const featuredArticles = featuredResult.docs
  const latestArticles = latestResult.docs

  return (
    <>
      {/* 1. HERO — Full-screen */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Placeholder hero — v produkci z Payload CMS */}
        <div className="absolute inset-0 bg-[var(--color-bg-dark)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #1A1714 0%, #2E2B26 50%, #1C768F22 100%)',
            }}
          />
        </div>
        <div className="hero-overlay absolute inset-0" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <Badge variant="secondary" className="mb-6 text-overline">
            Travel magazín
          </Badge>
          <h1 className="text-display-xl text-[var(--color-bg-primary)] font-display max-w-4xl">
            Svět čeká.
            <br />
            <em className="text-[var(--color-accent-warm)]">Kam vyrazíš?</em>
          </h1>
          <p className="mt-6 text-body-lg text-[var(--color-bg-primary)]/70 max-w-xl">
            Průvodci, tipy a mystery výlety pro každého cestovatele.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg">
              <Link href="/mystery">Objev mystery výlety</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/category/pruvodci">Prohlédnout průvodce</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-overline">Scroll</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* 2. FEATURED GRID */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-[var(--color-bg-primary)]" />}>
        {featuredArticles.length > 0 && <FeaturedGrid articles={featuredArticles} />}
      </Suspense>

      {/* 3. CATEGORY BAR — horizontální scroll */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-2 whitespace-nowrap rounded-sm px-4 py-2 text-overline text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LATEST ARTICLES */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-[var(--color-bg-primary)]" />}>
        {latestArticles.length > 0 && (
          <ArticleGrid articles={latestArticles} title="Nejnovější" showMore moreHref="/category/vse" />
        )}
      </Suspense>

      {/* 5. MYSTERY TEASER — dark sekce */}
      <MysteryTeaser />

      {/* 6. EBOOK GRID */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-[var(--color-bg-primary)]" />}>
        {featuredEbooks.length > 0 && <EbookGrid ebooks={featuredEbooks} />}
      </Suspense>

      {/* 7. NEWSLETTER — vložen přes NewsletterForm.tsx (Client Component) */}
      {/* Newsletter je v KROK 14 */}

      {/* 8. FAQ */}
      <div className="bg-[var(--color-bg-secondary)]">
        <FAQ items={homepageFAQ} title="Nejčastější dotazy" />
      </div>

      {/* JSON-LD WebSite schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'TripRadar',
            url: 'https://tripradar.cz',
            description: 'Česky psaný travel magazín pro všechny cestovatele.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tripradar.cz/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TripRadar',
              url: 'https://tripradar.cz',
              logo: {
                '@type': 'ImageObject',
                url: 'https://tripradar.cz/logo.png',
              },
            },
          }),
        }}
      />
    </>
  )
}
