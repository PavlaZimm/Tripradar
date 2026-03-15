import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

// 3 varianty karty článku
type CardSize = 'sm' | 'md' | 'lg'

interface ArticleCardProps {
  article: Article
  size?: CardSize
}

export function ArticleCard({ article, size = 'md' }: ArticleCardProps) {
  if (size === 'lg') return <ArticleCardLarge article={article} />
  if (size === 'sm') return <ArticleCardSmall article={article} />
  return <ArticleCardMedium article={article} />
}

// Velká karta — hero s text overlay
function ArticleCardLarge({ article }: { article: Article }) {
  return (
    <article className="group relative">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge variant="warm" className="mb-3">{article.category.name}</Badge>
            <h3 className="font-display text-display-md text-white leading-tight line-clamp-2">
              {article.title}
            </h3>
            <div className="mt-3 flex items-center gap-2 text-caption text-white/60">
              <span>{article.author.name}</span>
              <span>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Střední karta — obrázek + text pod ním
function ArticleCardMedium({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/article/${article.slug}`} className="block">
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
        <Badge variant="secondary" className="mb-2">{article.category.name}</Badge>
        <h3 className="font-display text-display-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-caption text-[var(--color-text-secondary)] line-clamp-2">
          {article.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-caption text-[var(--color-text-muted)]">
          <span>{article.author.name}</span>
          <span>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.readingTime && <><span>·</span><span>{article.readingTime} min</span></>}
        </div>
      </Link>
    </article>
  )
}

// Malá karta — horizontální, thumbnail vlevo
function ArticleCardSmall({ article }: { article: Article }) {
  return (
    <article className="group flex items-start gap-4">
      <Link href={`/article/${article.slug}`} className="flex-shrink-0">
        <div className="relative h-20 w-28 overflow-hidden rounded-sm">
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Badge variant="secondary" className="mb-1">{article.category.name}</Badge>
        <Link href={`/article/${article.slug}`}>
          <h3 className="font-display text-display-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2 leading-snug text-sm">
            {article.title}
          </h3>
        </Link>
        <time className="text-caption text-[var(--color-text-muted)] mt-1 block" dateTime={article.date}>
          {formatDate(article.date)}
        </time>
      </div>
    </article>
  )
}
