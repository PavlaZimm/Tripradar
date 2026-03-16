import Image from 'next/image'
import Link from 'next/link'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleGridProps {
  articles: Article[]
  title?: string
  showMore?: boolean
  moreHref?: string
}

export function ArticleGrid({
  articles,
  title = 'Nejnovější',
  showMore = false,
  moreHref = '/category/vse',
}: ArticleGridProps) {
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
      <div className="flex items-center justify-between mb-10 border-b border-[var(--color-border)] pb-4">
        <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">{title}</span>
        {showMore && (
          <Link
            href={moreHref}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Více článků →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-bg-secondary)] mb-5">
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-103"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </div>
        <span className="text-xs tracking-widest uppercase text-[var(--color-accent-primary)] mb-2 block">
          {article.category.name}
        </span>
        <h3 className="font-display text-xl leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors mb-3">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
          {article.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>{article.author.name}</span>
          <span>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span>·</span>
              <span>{article.readingTime} min</span>
            </>
          )}
        </div>
      </Link>
    </article>
  )
}
