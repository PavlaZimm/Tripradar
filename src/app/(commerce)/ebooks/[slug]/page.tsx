import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { getEbookBySlug, getEbooks } from '@/lib/payload'
import { formatPrice, absoluteUrl, blurDataUrl } from '@/lib/utils'
import { CheckCircle2, Download, Shield, BookOpen } from 'lucide-react'

export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const ebooks = await getEbooks({ limit: 100 })
    return ebooks.map((ebook) => ({ slug: ebook.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ebook = await getEbookBySlug(slug).catch(() => null)
  if (!ebook) return {}

  return {
    title: ebook.title,
    description: ebook.description,
    openGraph: {
      title: ebook.title,
      description: ebook.description,
      images: [{ url: ebook.coverImage.url, width: 800, height: 1000, alt: ebook.coverImage.alt }],
      type: 'website',
    },
    alternates: { canonical: absoluteUrl(`/ebooks/${slug}`) },
  }
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params
  const ebook = await getEbookBySlug(slug)

  if (!ebook) notFound()

  // Product JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ebook.title,
    description: ebook.description,
    image: ebook.coverImage.url,
    sku: ebook.id,
    offers: {
      '@type': 'Offer',
      price: (ebook.price / 100).toFixed(2),
      priceCurrency: ebook.currency.toUpperCase(),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'TripRadar',
      },
    },
  }

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Cover obrázek */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src={ebook.coverImage.url}
                alt={ebook.coverImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </div>
          </div>

          {/* Detail + koupit */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {ebook.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-display-md font-display text-[var(--color-text-primary)] mb-4">
              {ebook.title}
            </h1>
            <p className="text-body text-[var(--color-text-secondary)] mb-8">
              {ebook.description}
            </p>

            {/* Co dostaneš */}
            <ul className="space-y-2 mb-8">
              {[
                'Detailní PDF průvodce (okamžité stažení)',
                'Itinerář den po dni',
                'Doporučení ubytování + restaurací',
                'Tipy na skrytá místa',
                'Doživotní přístup k aktualizacím',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-body">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-primary)] flex-shrink-0" />
                  <span className="text-[var(--color-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Cena + koupit */}
            <div className="flex items-center gap-6 mb-6">
              <span className="text-display-md font-display text-[var(--color-accent-primary)]">
                {formatPrice(ebook.price, ebook.currency.toUpperCase())}
              </span>
              {ebook.previewUrl && (
                <a
                  href={ebook.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-[var(--color-accent-primary)] hover:underline"
                >
                  Ukázka zdarma
                </a>
              )}
            </div>

            {/* Checkout button — POST na API */}
            <form action="/api/checkout/ebook" method="POST">
              <input type="hidden" name="slug" value={ebook.slug} />
              <input type="hidden" name="priceId" value={ebook.stripePriceId} />
              <Button type="submit" size="lg" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Koupit a stáhnout — {formatPrice(ebook.price, ebook.currency.toUpperCase())}
              </Button>
            </form>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-4 text-caption text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Bezpečná platba
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                PDF formát
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                Okamžité stažení
              </span>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbSchema
        items={[
          { name: 'Domů', href: '/' },
          { name: 'E-booky', href: '/ebooks' },
          { name: ebook.title, href: `/ebooks/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  )
}
