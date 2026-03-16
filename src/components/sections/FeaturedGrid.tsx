import Image from 'next/image'
import Link from 'next/link'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface FeaturedGridProps {
  articles: Article[]
}

export function FeaturedGrid({ articles }: FeaturedGridProps) {
  const [main, ...secondary] = articles.slice(0, 3)

  if (!main) return null

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
      <div className="flex items-center justify-between mb-10">
        <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Doporučujeme</span>
        <Link
          href="/category/featured"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Vše →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-8">
        {/* Hlavní artikel — 3/5 šířky */}
        <article className="md:col-span-3 group">
          <Link href={`/article/${main.slug}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)] mb-5">
              <Image
                src={main.heroImage.url}
                alt={main.heroImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                priority
              />
            </div>
            <div>
              <span className="text-xs tracking-widest uppercase text-[var(--color-accent-primary)] mb-3 block">
                {main.category.name}
              </span>
              <h3 className="font-display text-[clamp(22px,3vw,32px)] leading-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors mb-3">
                {main.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                {main.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
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
          </Link>
        </article>

        {/* Dva menší — 2/5 šířky */}
        <div className="md:col-span-2 flex flex-col gap-10">
          {secondary.map((article) => (
            <article key={article.id} className="group">
              <Link href={`/article/${article.slug}`} className="block">
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-bg-secondary)] mb-4">
                  <Image
                    src={article.heroImage.url}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                </div>
                <span className="text-xs tracking-widest uppercase text-[var(--color-accent-primary)] mb-2 block">
                  {article.category.name}
                </span>
                <h3 className="font-display text-lg leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span>{article.author.name}</span>
                  <span>·</span>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
