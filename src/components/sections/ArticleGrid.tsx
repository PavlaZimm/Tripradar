import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleGridProps {
  articles: Article[]
  title?: string
  showMore?: boolean
  moreHref?: string
}

// Server Component — responzivní grid článků
export function ArticleGrid({
  articles,
  title = 'Nejnovější články',
  showMore = false,
  moreHref = '/category/vse',
}: ArticleGridProps) {
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-overline text-[var(--color-text-muted)]">{title}</h2>
        {showMore && (
          <Link
            href={moreHref}
            className="text-caption text-[var(--color-accent-primary)] hover:underline"
          >
            Více článků →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCardMedium key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

// Střední karta článku — používá se v gridu
function ArticleCardMedium({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/article/${article.slug}`} className="block">
        {/* Obrázek */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-4">
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

        {/* Obsah */}
        <div className="flex flex-col flex-1">
          <Badge variant="secondary" className="self-start mb-2">
            {article.category.name}
          </Badge>
          <h3 className="font-display text-display-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-caption text-[var(--color-text-secondary)] line-clamp-2 flex-1">
            {article.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-caption text-[var(--color-text-muted)]">
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
        </div>
      </Link>
    </article>
  )
}
