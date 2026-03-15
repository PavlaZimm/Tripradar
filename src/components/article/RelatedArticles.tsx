import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface RelatedArticlesProps {
  articles: Article[]
}

// Server Component — 3 karty ze stejné kategorie
export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="my-12">
      <h2 className="text-overline text-[var(--color-text-muted)] mb-6">Mohlo by vás zajímat</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <article key={article.id} className="group">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-3">
                <Image
                  src={article.heroImage.url}
                  alt={article.heroImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
              </div>
              <Badge variant="secondary" className="mb-2">
                {article.category.name}
              </Badge>
              <h3 className="font-display text-display-sm group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2">
                {article.title}
              </h3>
              <time className="text-caption text-[var(--color-text-muted)] mt-1 block" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
