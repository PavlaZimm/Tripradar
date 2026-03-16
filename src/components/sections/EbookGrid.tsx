import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, blurDataUrl } from '@/lib/utils'
import type { EBook } from '@/types'

interface EbookGridProps {
  ebooks: EBook[]
}

export function EbookGrid({ ebooks }: EbookGridProps) {
  if (ebooks.length === 0) return null

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
      <div className="flex items-center justify-between mb-10 border-b border-[var(--color-border)] pb-4">
        <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Průvodci ke stažení</span>
        <Link
          href="/ebooks"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Všechny e-booky →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {ebooks.map((ebook) => (
          <article key={ebook.id} className="group">
            {/* Obálka */}
            <Link href={`/ebooks/${ebook.slug}`} className="block mb-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-secondary)]">
                <Image
                  src={ebook.coverImage.url}
                  alt={ebook.coverImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
                {ebook.featured && (
                  <span className="absolute top-3 left-3 text-xs tracking-widest uppercase bg-[var(--color-accent-primary)] text-white px-2.5 py-1">
                    Doporučujeme
                  </span>
                )}
              </div>
            </Link>

            {/* Text */}
            <Link href={`/ebooks/${ebook.slug}`}>
              <h3 className="font-display text-xl leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors mb-2">
                {ebook.title}
              </h3>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
              {ebook.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-[var(--color-text-primary)]">
                {formatPrice(ebook.price, ebook.currency.toUpperCase())}
              </span>
              <Link
                href={`/ebooks/${ebook.slug}`}
                className="text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
              >
                Koupit →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
