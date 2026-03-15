import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, blurDataUrl } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleHeroProps {
  article: Article
}

// Server Component — full-bleed hero s text overlay
// Prioritní načítání (LCP optimalizace)
export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header className="relative">
      {/* Full-bleed hero obrázek */}
      <div className="relative h-[65vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <Image
          src={article.heroImage.url}
          alt={article.heroImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
        {/* Gradient overlay pro čitelnost textu */}
        <div className="hero-overlay absolute inset-0" />

        {/* Obsah přes obrázek */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-12 md:pb-16">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-caption text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Domů
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {article.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            <Badge variant="warm" className="mb-4">
              {article.category.name}
            </Badge>

            <h1 className="text-display-lg text-white font-display">{article.title}</h1>

            <p className="mt-4 text-body-lg text-white/80 max-w-2xl">{article.description}</p>

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-caption text-white/60">
              <Link
                href={`/author/${article.author.slug}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span>{article.author.name}</span>
              </Link>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updatedDate && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Aktualizováno{' '}
                    <time dateTime={article.updatedDate}>{formatDate(article.updatedDate)}</time>
                  </span>
                </>
              )}
              {article.readingTime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime} min čtení</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fotograf credit */}
      {article.heroImage.credit && (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-caption text-[var(--color-text-muted)] mt-2">
            Foto: {article.heroImage.credit}
          </p>
        </div>
      )}
    </header>
  )
}
