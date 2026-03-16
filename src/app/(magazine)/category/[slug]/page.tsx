import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article/ArticleCard'
import { getCategoryBySlug, getArticles, getAllCategories } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

const ARTICLES_PER_PAGE = 12

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories()
    return categories.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug).catch(() => null)
  if (!category) return {}

  const title = `${category.name} — průvodci a tipy`
  const description =
    category.description ??
    `Průvodci, tipy a inspirace pro cestování po destinacích: ${category.name}. Vše co potřebuješ vědět před cestou.`

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/category/${slug}`) },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'cs_CZ',
      siteName: 'TripRadar',
    },
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const [category, result] = await Promise.all([
    getCategoryBySlug(slug).catch(() => null),
    getArticles({ category: slug, page, limit: ARTICLES_PER_PAGE }).catch(() => ({
      docs: [],
      totalDocs: 0,
      totalPages: 1,
      page: 1,
    })),
  ])

  if (!category) notFound()

  const { docs: articles, totalDocs, totalPages } = result

  return (
    <>
      {/* Hlavička kategorie */}
      <section className="border-b border-[var(--color-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 py-4 text-xs text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
              Domů
            </Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{category.name}</span>
          </nav>

          {/* Název + meta */}
          <div className="py-12 md:py-16 border-t border-[var(--color-border)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-4 block">
                  Kategorie
                </span>
                <h1 className="font-display text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-tight text-[var(--color-text-primary)]">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="mt-4 text-base text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
                    {category.description}
                  </p>
                )}
              </div>
              <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] md:pb-2 flex-shrink-0">
                {totalDocs} {totalDocs === 1 ? 'článek' : totalDocs < 5 ? 'články' : 'článků'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid článků */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        {articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[var(--color-text-muted)] text-sm">
              V této kategorii zatím nejsou žádné články.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors underline underline-offset-4"
            >
              Zpět na hlavní stránku
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} size="md" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-16 flex items-center justify-center gap-2"
                aria-label="Stránkování"
              >
                {page > 1 && (
                  <Link
                    href={`/category/${slug}?page=${page - 1}`}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-1"
                  >
                    ← Předchozí
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce<(number | '…')[]>((acc, p, idx, arr) => {
                      if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('…')
                      acc.push(p)
                      return acc
                    }, [])
                    .map((p, idx) =>
                      p === '…' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-sm text-[var(--color-text-muted)]">
                          …
                        </span>
                      ) : (
                        <Link
                          key={p}
                          href={`/category/${slug}?page=${p}`}
                          className={`text-sm px-3 py-1 transition-colors ${
                            p === page
                              ? 'text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]'
                              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                          }`}
                          aria-current={p === page ? 'page' : undefined}
                        >
                          {p}
                        </Link>
                      )
                    )}
                </div>
                {page < totalPages && (
                  <Link
                    href={`/category/${slug}?page=${page + 1}`}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-1"
                  >
                    Další →
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://tripradar.cz' },
              {
                '@type': 'ListItem',
                position: 2,
                name: category.name,
                item: absoluteUrl(`/category/${slug}`),
              },
            ],
          }),
        }}
      />
    </>
  )
}
