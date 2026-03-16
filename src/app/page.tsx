import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
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
  { name: 'Itálie', icon: '🍕', href: '/category/italie' },
  { name: 'Francie', icon: '🥐', href: '/category/francie' },
  { name: 'Španělsko', icon: '🌞', href: '/category/spanelsko' },
  { name: 'Balkán', icon: '⛵', href: '/category/balkan' },
  { name: 'Skandinávie', icon: '🌲', href: '/category/skandinavie' },
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
      {/* 1. HERO — Editorial, čistý */}
      <section className="border-b border-[var(--color-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {/* Horní linka */}
          <div className="flex items-center justify-between py-4 border-b border-[var(--color-border)]">
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Český travel magazín</span>
            <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
              {new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Hlavní hero */}
          <div className="py-16 md:py-24 lg:py-32 text-center">
            <h1 className="font-display text-[clamp(56px,10vw,120px)] leading-[0.95] tracking-tight text-[var(--color-text-primary)] mb-8">
              Svět čeká.
              <br />
              <em className="text-[var(--color-accent-primary)]">Kam vyrazíš?</em>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto mb-10 leading-relaxed">
              Průvodci, tipy a mystery výlety pro každého cestovatele.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/mystery"
                className="text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors underline underline-offset-4"
              >
                Objev Mystery výlety →
              </Link>
              <Link
                href="/category/pruvodci"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Prohlédnout průvodce
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-16 pt-10 border-t border-[var(--color-border)] grid grid-cols-3 gap-8 max-w-sm mx-auto sm:max-w-md">
              <div className="text-center">
                <span className="block font-display text-4xl text-[var(--color-text-primary)] leading-none">50+</span>
                <span className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mt-2">průvodců</span>
              </div>
              <div className="text-center border-x border-[var(--color-border)]">
                <span className="block font-display text-4xl text-[var(--color-text-primary)] leading-none">15</span>
                <span className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mt-2">zemí</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-4xl text-[var(--color-text-primary)] leading-none">12k+</span>
                <span className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mt-2">čtenářů</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED GRID */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-[var(--color-bg-primary)]" />}>
        {featuredArticles.length > 0 && <FeaturedGrid articles={featuredArticles} />}
      </Suspense>

      {/* 3. CATEGORY BAR */}
      <section className="border-b border-[var(--color-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="whitespace-nowrap text-xs tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0 py-1"
              >
                {cat.name}
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

      {/* JSON-LD: WebSite schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://tripradar.cz/#website',
            name: 'TripRadar',
            url: 'https://tripradar.cz',
            description: 'Česky psaný travel magazín pro všechny cestovatele.',
            inLanguage: 'cs',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tripradar.cz/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      {/* JSON-LD: Organization schema — důležité pro Google Knowledge Panel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://tripradar.cz/#organization',
            name: 'TripRadar',
            url: 'https://tripradar.cz',
            logo: {
              '@type': 'ImageObject',
              '@id': 'https://tripradar.cz/#logo',
              url: 'https://tripradar.cz/logo.png',
              width: 512,
              height: 512,
              caption: 'TripRadar',
            },
            sameAs: [
              'https://www.instagram.com/tripradar.cz',
              'https://www.facebook.com/tripradar.cz',
              'https://www.pinterest.com/tripradarcz',
            ],
            foundingDate: '2024',
            description: 'Česky psaný travel magazín pro všechny cestovatele.',
          }),
        }}
      />
    </>
  )
}
