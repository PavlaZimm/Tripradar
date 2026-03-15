import { absoluteUrl } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

// Server Component — JSON-LD BreadcrumbList
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : absoluteUrl(item.href),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
