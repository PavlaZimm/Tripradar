import { absoluteUrl, formatDateISO } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleSchemaProps {
  article: Article
}

// Server Component — JSON-LD Article + BreadcrumbList + Person (autor)
export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': absoluteUrl(`/article/${article.slug}#article`),
        headline: article.title,
        description: article.description,
        image: {
          '@type': 'ImageObject',
          url: article.heroImage.url,
          width: 1200,
          height: 630,
          caption: article.heroImage.caption,
        },
        datePublished: formatDateISO(article.date),
        dateModified: article.updatedDate
          ? formatDateISO(article.updatedDate)
          : formatDateISO(article.date),
        author: {
          '@type': 'Person',
          '@id': absoluteUrl(`/author/${article.author.slug}#person`),
          name: article.author.name,
          description: article.author.bio,
          jobTitle: article.author.credentials,
          url: absoluteUrl(`/author/${article.author.slug}`),
          image: article.author.photo?.url,
          sameAs: [
            article.author.socialLinks?.instagram,
            article.author.socialLinks?.twitter,
            article.author.socialLinks?.linkedin,
            article.author.socialLinks?.website,
          ].filter(Boolean),
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
        mainEntityOfPage: absoluteUrl(`/article/${article.slug}`),
        articleSection: article.category.name,
        keywords: article.tags.join(', '),
        wordCount: article.readingTime ? article.readingTime * 200 : undefined,
        inLanguage: 'cs-CZ',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': absoluteUrl(`/article/${article.slug}#breadcrumb`),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Domů',
            item: 'https://tripradar.cz',
          },
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
            item: absoluteUrl(`/article/${article.slug}`),
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
