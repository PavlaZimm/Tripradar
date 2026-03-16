import type { Where } from 'payload'
import type { Article, Author, Category, Destination, EBook, MysteryTrip, PaginatedResult } from '@/types'

// Payload CMS Local API — server-side only
// Importuje se jen v Server Components a Route Handlers

// Lazy import aby nedošlo k bundlování na klienta
async function getPayload() {
  const { getPayload: _getPayload } = await import('payload')
  const { default: config } = await import('@payload-config')
  return _getPayload({ config })
}

// Načte článek dle slugu (draft: false = pouze publikované)
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      depth: 2, // Načte related Author a Category
    })
    return (result.docs[0] as unknown as Article) ?? null
  } catch (error) {
    console.error('getArticleBySlug error:', error)
    return null
  }
}

// Načte seznam článků s paginací
export async function getArticles(options: {
  page?: number
  limit?: number
  category?: string
  tag?: string
  featured?: boolean
}): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12, category, tag } = options

  const payload = await getPayload()

  const where: Where = {
    status: { equals: 'published' },
  }
  if (category) (where as Record<string, unknown>)['category.slug'] = { equals: category }
  if (tag) (where as Record<string, unknown>).tags = { contains: tag }

  const result = await payload.find({
    collection: 'articles',
    where,
    page,
    limit,
    sort: '-date',
    depth: 2,
  })

  return result as unknown as PaginatedResult<Article>
}

// Načte kategorii dle slugu
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as unknown as Category) ?? null
  } catch {
    return null
  }
}

// Načte všechny kategorie
export async function getAllCategories(): Promise<Category[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })
  return result.docs as unknown as Category[]
}

// Načte autora dle slugu
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'authors',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as unknown as Author) ?? null
  } catch {
    return null
  }
}

// Načte destinaci dle slugu
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return (result.docs[0] as unknown as Destination) ?? null
  } catch {
    return null
  }
}

// Načte e-booky
export async function getEbooks(options: { limit?: number; featured?: boolean } = {}): Promise<EBook[]> {
  const payload = await getPayload()
  const where: Where = {}
  if (options.featured) (where as Record<string, unknown>).featured = { equals: true }

  const result = await payload.find({
    collection: 'ebooks',
    where,
    limit: options.limit ?? 10,
    depth: 1,
  })
  return result.docs as unknown as EBook[]
}

// Načte e-book dle slugu
export async function getEbookBySlug(slug: string): Promise<EBook | null> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'ebooks',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as unknown as EBook) ?? null
  } catch {
    return null
  }
}

// Načte Mystery výlety (pouze pro aktivní předplatitele)
export async function getMysteryTrips(limit = 6): Promise<MysteryTrip[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'mystery-trips',
    limit,
    sort: '-revealDate',
  })
  return result.docs as unknown as MysteryTrip[]
}

// Slugy pro generateStaticParams
export async function getAllArticleSlugs(): Promise<string[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
  })
  return result.docs.map((doc) => (doc as unknown as { slug: string }).slug)
}
