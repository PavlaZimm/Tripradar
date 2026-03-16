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

  const canonical = absoluteUrl(`/article/${slug}`)
  const ogImage = {
    url: article.heroImage.url,
    width: 1200,
    height: 630,
    alt: article.heroImage.alt,
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags ?? [],
    robots: article.noIndex ? 'noindex,nofollow' : 'index,follow',
    authors: [{ name: article.author.name, url: absoluteUrl(`/author/${article.author.slug}`) }],
    openGraph: {
      title: article.title,
      description: article.description,
      images: [ogImage],
      type: 'article',
      publishedTime: formatDateISO(article.date),
      modifiedTime: article.updatedDate ? formatDateISO(article.updatedDate) : formatDateISO(article.date),
      authors: [absoluteUrl(`/author/${article.author.slug}`)],
      section: article.category.name,
      tags: article.tags ?? [],
      locale: 'cs_CZ',
      siteName: 'TripRadar',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage.url],
    },
    alternates: {
      canonical,
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

  // Article JSON-LD — rozšířené schema pro Google
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.heroImage.url,
      width: 1200,
      height: 630,
    },
    inLanguage: 'cs',
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
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/article/${slug}`),
    },
    articleSection: article.category.name,
    ...(article.tags && article.tags.length > 0 && { keywords: article.tags.join(', ') }),
    ...(article.readingTime && { timeRequired: `PT${article.readingTime}M` }),
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
