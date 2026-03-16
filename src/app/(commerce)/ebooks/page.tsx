import type { Metadata } from 'next'
import { getEbooks } from '@/lib/payload'
import { EbookGrid } from '@/components/sections/EbookGrid'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'E-booky a průvodci',
  description:
    'Stáhni si cestovní průvodce ve formátu PDF. Detailní itineráře, tipy na ubytování, restaurace a skrytá místa.',
  alternates: { canonical: 'https://tripradar.cz/ebooks' },
}

export default async function EbooksPage() {
  const ebooks = await getEbooks({ limit: 20 }).catch(() => [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-bg-dark)] py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="text-overline text-[var(--color-accent-primary)] mb-4 block">
            E-booky & průvodci
          </span>
          <h1 className="text-display-lg text-[var(--color-bg-primary)] font-display mb-4">
            Průvodci ke stažení
          </h1>
          <p className="text-body-lg text-[var(--color-bg-primary)]/70 max-w-2xl mx-auto">
            Detailní PDF průvodci s itineráři, tipy na ubytování, restaurace a místa mimo turistické trasy.
          </p>
        </div>
      </section>

      {/* E-book grid */}
      <EbookGrid ebooks={ebooks} />
    </div>
  )
}
