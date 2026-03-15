import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface FeaturedGridProps {
  articles: Article[]
}

// Server Component — magazínový editorial grid
// Layout: 1 velká karta (60% šířky) + 2 malé (40% šířky)
export function FeaturedGrid({ articles }: FeaturedGridProps) {
  const [main, ...secondary] = articles.slice(0, 3)

  if (!main) return null

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-overline text-[var(--color-text-muted)]">Doporučujeme</h2>
        <Link
          href="/category/featured"
          className="text-caption text-[var(--color-accent-primary)] hover:underline"
        >
          Vše →
        </Link>
      </div>

      {/* Asymetrický grid — magazínový layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
        {/* Hlavní featured článek — 60% šířky */}
        <article className="md:col-span-3 group">
          <Link href={`/article/${main.slug}`} className="block">
            <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src={main.heroImage.url}
                alt={main.heroImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                priority
              />
              <div className="hero-overlay absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge variant="warm" className="mb-3">
                  {main.category.name}
                </Badge>
                <h3 className="text-display-sm text-white font-display leading-tight line-clamp-2">
                  {main.title}
                </h3>
                <p className="mt-2 text-caption text-white/80 line-clamp-2">
                  {main.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-caption text-white/60">
                  <span>{main.author.name}</span>
                  <span>·</span>
                  <time dateTime={main.date}>{formatDate(main.date)}</time>
                  {main.readingTime && (
                    <>
                      <span>·</span>
                      <span>{main.readingTime} min čtení</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* 2 menší karty — 40% šířky */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {secondary.map((article) => (
            <article key={article.id} className="group flex-1">
              <Link href={`/article/${article.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                  <Image
                    src={article.heroImage.url}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                  <div className="hero-overlay absolute inset-0" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge variant="warm" className="mb-2">
                      {article.category.name}
                    </Badge>
                    <h3 className="text-display-sm text-white font-display leading-tight line-clamp-2 text-base">
                      {article.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-caption text-white/60">
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
