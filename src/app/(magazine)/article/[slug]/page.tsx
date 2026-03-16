import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ArticleHero } from '@/components/article/ArticleHero'
import { ReadingProgress } from '@/components/article/ReadingProgress'
import { TableOfContents } from '@/components/article/TableOfContents'
import { AffiliateBox } from '@/components/article/AffiliateBox'
import { AuthorBox } from '@/components/article/AuthorBox'
import { RelatedArticles } from '@/components/article/RelatedArticles'
import { FAQ } from '@/components/sections/FAQ'
import { MysteryTeaser } from '@/components/sections/MysteryTeaser'
import { getArticleBySlug, getArticles, getAllArticleSlugs } from '@/lib/payload'
import { absoluteUrl, formatDateISO } from '@/lib/utils'

// ISR — revalidace každou hodinu + on-demand webhook z Payload
export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug).catch(() => null)

  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    robots: article.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: article.title,
      description: article.description,
      images: [
        {
          url: article.heroImage.url,
          width: 1200,
          height: 630,
          alt: article.heroImage.alt,
        },
      ],
      type: 'article',
      publishedTime: formatDateISO(article.date),
      modifiedTime: article.updatedDate ? formatDateISO(article.updatedDate) : undefined,
      authors: [`${absoluteUrl(`/author/${article.author.slug}`)}`],
    },
    alternates: {
      canonical: absoluteUrl(`/article/${slug}`),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  // Načti related articles — ze stejné kategorie pokud není manuálně vybráno
  const related =
    article.relatedArticles && article.relatedArticles.length > 0
      ? article.relatedArticles
      : (await getArticles({ category: article.category.slug, limit: 4 })).docs.filter(
          (a) => a.id !== article.id
        )

  // TOC z headingů — v produkci bude parsováno z Lexical content
  // Placeholder pro scaffolding:
  const tocItems: { id: string; text: string; level: number }[] = []

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.heroImage.url,
    datePublished: formatDateISO(article.date),
    dateModified: article.updatedDate
      ? formatDateISO(article.updatedDate)
      : formatDateISO(article.date),
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: absoluteUrl(`/author/${article.author.slug}`),
    },
    publisher: {
      '@type': 'Organization',
      name: 'TripRadar',
      url: 'https://tripradar.cz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tripradar.cz/logo.png',
      },
    },
    mainEntityOfPage: absoluteUrl(`/article/${slug}`),
  }

  // FAQ JSON-LD (pokud existuje)
  const faqSchema =
    article.faq && article.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <>
      {/* Reading progress bar — fixed nahoře */}
      <ReadingProgress />

      {/* Hero */}
      <ArticleHero article={article} />

      {/* Hlavní obsah */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="xl:grid xl:grid-cols-[200px_1fr] xl:gap-12">
          {/* TOC sidebar (desktop) / collapsible (mobile) */}
          <TableOfContents items={tocItems} />

          {/* Tělo článku */}
          <article className="min-w-0">
            {/* TOC mobile je renderován uvnitř TableOfContents */}

            {/* Affiliate box — po 3. odstavci (podmíněně) */}
            {article.affiliate && <AffiliateBox data={article.affiliate} />}

            {/* Rich text obsah z Payload Lexical */}
            {/* V produkci: <PayloadRichText content={article.content} /> */}
            <div className="prose max-w-none text-body text-[var(--color-text-primary)]">
              {/* Placeholder obsahu — vyplní Payload Lexical renderer */}
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                Obsah článku se načítá z Payload CMS přes Lexical renderer.
              </p>
            </div>

            {/* Author box — EEAT */}
            <AuthorBox author={article.author} />

            {/* FAQ sekce */}
            {article.faq && article.faq.length > 0 && (
              <FAQ items={article.faq} title="Časté dotazy k tomuto článku" />
            )}

            {/* Related articles */}
            <Suspense>
              <RelatedArticles articles={related} />
            </Suspense>

            {/* CTA banner — Mystery nebo Ebook */}
            <MysteryTeaser />
          </article>
        </div>
      </div>

      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* BreadcrumbList */}
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
                name: article.category.name,
                item: absoluteUrl(`/category/${article.category.slug}`),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: absoluteUrl(`/article/${slug}`),
              },
            ],
          }),
        }}
      />
    </>
  )
}
