import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, blurDataUrl } from '@/lib/utils'
import type { EBook } from '@/types'

interface EbookGridProps {
  ebooks: EBook[]
}

// Server Component — grid e-booků s cenami
export function EbookGrid({ ebooks }: EbookGridProps) {
  if (ebooks.length === 0) return null

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-overline text-[var(--color-text-muted)]">E-booky & průvodci</h2>
          <p className="mt-1 text-display-sm font-display text-[var(--color-text-primary)]">
            Průvodci ke stažení
          </p>
        </div>
        <Link
          href="/ebooks"
          className="text-caption text-[var(--color-accent-primary)] hover:underline"
        >
          Všechny e-booky →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ebooks.map((ebook) => (
          <article key={ebook.id} className="group flex flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden">
            {/* Cover */}
            <Link href={`/ebooks/${ebook.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ebook.coverImage.url}
                  alt={ebook.coverImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
                {ebook.featured && (
                  <Badge variant="warm" className="absolute top-3 left-3">
                    Doporučujeme
                  </Badge>
                )}
              </div>
            </Link>

            {/* Info */}
            <div className="flex flex-col flex-1 p-5">
              <Link href={`/ebooks/${ebook.slug}`}>
                <h3 className="font-display text-display-sm group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2 mb-2">
                  {ebook.title}
                </h3>
              </Link>
              <p className="text-caption text-[var(--color-text-secondary)] line-clamp-2 flex-1 mb-4">
                {ebook.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-display text-display-sm text-[var(--color-accent-primary)]">
                  {formatPrice(ebook.price, ebook.currency.toUpperCase())}
                </span>
                <Button asChild size="sm">
                  <Link href={`/ebooks/${ebook.slug}`}>Koupit</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
