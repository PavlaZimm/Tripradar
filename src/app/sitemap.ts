import type { MetadataRoute } from 'next'
import {
  getAllArticlesForSitemap,
  getAllEbooksForSitemap,
  getAllCategoriesForSitemap,
} from '@/lib/payload'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz'

// Statické stránky s prioritami
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/mystery`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/ebooks`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/o-nas`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/kontakt`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.4,
  },
  {
    url: `${BASE_URL}/affiliate`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/gdpr`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    url: `${BASE_URL}/podminky`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Paralelní fetch všech dynamic routes
  const [articles, ebooks, categories] = await Promise.all([
    getAllArticlesForSitemap(),
    getAllEbooksForSitemap(),
    getAllCategoriesForSitemap(),
  ])

  const articleRoutes: MetadataRoute.Sitemap = articles.map(({ slug, date, updatedDate }) => ({
    url: `${BASE_URL}/article/${slug}`,
    lastModified: updatedDate ? new Date(updatedDate) : new Date(date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const ebookRoutes: MetadataRoute.Sitemap = ebooks.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/ebooks/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes, ...ebookRoutes]
}
