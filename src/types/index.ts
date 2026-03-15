// =============================================================================
// TripRadar.cz — TypeScript Interfaces
// Strict mode — žádné any typy
// =============================================================================

// -----------------------------------------------------------------------------
// Affiliate
// -----------------------------------------------------------------------------

export interface AffiliateData {
  label: string          // např. "Ubytování v destinaci"
  provider: 'Stay22' | 'Booking' | 'Pojisteni' | string
  url: string
  cta: string            // např. "Hledat ubytování"
}

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------

export interface FAQItem {
  question: string
  answer: string
}

// -----------------------------------------------------------------------------
// Article Frontmatter (Payload CMS data model)
// -----------------------------------------------------------------------------

export interface ArticleFrontmatter {
  title: string
  description: string          // Meta description (max 160 znaků)
  date: string                 // ISO 8601 — "2026-03-15"
  updatedDate?: string         // Datum aktualizace — EEAT signál
  category: string             // Slug kategorie
  tags: string[]
  heroImage: string            // URL hero fotky
  heroAlt: string              // Alt text — SEO + a11y
  heroCredit?: string          // Fotograf credit
  author: string               // Slug autora
  readingTime?: number         // Minuty — auto-kalkulace
  affiliate?: AffiliateData
  faq?: FAQItem[]
  relatedSlugs?: string[]
  schema?: 'Article' | 'TouristDestination' | 'TouristTrip'
  noIndex?: boolean            // True pro draft preview
}

// -----------------------------------------------------------------------------
// Media
// -----------------------------------------------------------------------------

export interface MediaItem {
  id: string
  url: string
  width: number
  height: number
  alt: string
  caption?: string
  credit?: string
  mimeType: string
  filesize: number
}

// -----------------------------------------------------------------------------
// Author (EEAT)
// -----------------------------------------------------------------------------

export interface Author {
  id: string
  slug: string
  name: string
  bio: string
  credentials?: string        // "Cestovní spisovatel, 15 let v oboru"
  photo?: MediaItem
  socialLinks?: {
    instagram?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
}

// -----------------------------------------------------------------------------
// Category
// -----------------------------------------------------------------------------

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  icon?: string               // Lucide icon name nebo emoji
}

// -----------------------------------------------------------------------------
// Article
// -----------------------------------------------------------------------------

export interface Article {
  id: string
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  category: Category
  tags: string[]
  heroImage: MediaItem
  author: Author
  readingTime: number
  content: unknown            // Payload Lexical rich text (serializovaný JSON)
  affiliate?: AffiliateData
  faq?: FAQItem[]
  relatedArticles?: Article[]
  status: 'draft' | 'published'
  noIndex?: boolean
}

// -----------------------------------------------------------------------------
// Destination Hub
// -----------------------------------------------------------------------------

export interface Destination {
  id: string
  slug: string
  name: string
  country: string
  description: string
  coverImage: MediaItem
  articles?: Article[]
  heroImage?: MediaItem
}

// -----------------------------------------------------------------------------
// E-book
// -----------------------------------------------------------------------------

export interface EBook {
  id: string
  slug: string
  title: string
  description: string
  coverImage: MediaItem
  previewUrl?: string         // Ukázka PDF (veřejná)
  fileUrl: string             // Chráněná URL pro stažení
  price: number               // V haléřích (Stripe format)
  currency: string            // 'czk'
  stripePriceId: string
  tags?: string[]
  featured?: boolean
}

// -----------------------------------------------------------------------------
// Mystery Trip
// -----------------------------------------------------------------------------

export interface MysteryTrip {
  id: string
  title: string
  destination: string         // Tajné až po přihlášení
  revealDate: string          // ISO 8601 — kdy se odhalí cíl
  description: string         // Obecný popis bez spoilerů
  fullDescription?: string    // Pouze pro aktivní předplatitele
  price: number
  coverImage: MediaItem
  subscriberOnly: true
}

// -----------------------------------------------------------------------------
// Commerce — Supabase tabulky
// -----------------------------------------------------------------------------

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  stripe_customer_id?: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  stripe_price_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid'
  tier: 'mystery'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
}

export interface Purchase {
  id: string
  user_id: string
  product_id: string
  stripe_session_id: string
  amount: number              // V haléřích
  currency: string
  file_path: string           // Cesta v Supabase Storage
  slug: string                // E-book slug pro download
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  source: string              // 'website-signup' | 'checkout' | atd.
  ecomail_id?: string
  tags: string[]
  gdpr_consent: boolean
  created_at: string
}

// -----------------------------------------------------------------------------
// API Response shapes
// -----------------------------------------------------------------------------

export interface ApiSuccessResponse<T = unknown> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

// -----------------------------------------------------------------------------
// Newsletter
// -----------------------------------------------------------------------------

export type NewsletterTag =
  | 'free-newsletter'
  | 'paid-subscriber'
  | 'ebook-buyer'
  | 'website-signup'
  | 'mystery-interest'

export interface NewsletterSubscribePayload {
  email: string
  tags?: NewsletterTag[]
  source?: string
}

// -----------------------------------------------------------------------------
// Stripe
// -----------------------------------------------------------------------------

export interface StripeCheckoutMetadata {
  productId: string
  userId?: string
  productType: 'ebook' | 'mystery-monthly' | 'mystery-yearly'
  slug?: string
}

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------

export interface PaginatedResult<T> {
  docs: T[]
  totalDocs: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
