import { absoluteUrl } from '@/lib/utils'
import type { Destination } from '@/types'

interface DestinationSchemaProps {
  destination: Destination
}

// Server Component — JSON-LD TouristDestination
export function DestinationSchema({ destination }: DestinationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristDestination',
        name: destination.name,
        description: destination.description,
        image: destination.coverImage.url,
        url: absoluteUrl(`/destination/${destination.slug}`),
        containedInPlace: {
          '@type': 'Country',
          name: destination.country,
        },
        touristType: {
          '@type': 'Audience',
          audienceType: 'Cestovatelé',
        },
      },
      {
        '@type': 'BreadcrumbList',
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
            name: 'Destinace',
            item: absoluteUrl('/category/destinace'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: destination.name,
            item: absoluteUrl(`/destination/${destination.slug}`),
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
