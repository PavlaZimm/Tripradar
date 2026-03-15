import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn() — kombinace clsx + tailwind-merge pro bezpečné slučování tříd
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formátování data v češtině
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Formátování data — krátký formát
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}

// ISO 8601 formát pro schema.org
export function formatDateISO(dateString: string): string {
  return new Date(dateString).toISOString()
}

// Kalkulace doby čtení (~ 200 slov za minutu pro CZ text)
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Formátování ceny v CZK
export function formatPrice(amountInHalere: number, currency = 'CZK'): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInHalere / 100)
}

// Truncate text na N znaků s "..."
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

// Slugify — pro URL-safe řetězce
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Odstranění diakritiky
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Absolutní URL
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz'
  return `${baseUrl}${path}`
}

// Blur data URL placeholder (base64 1x1 teplá šedá pro skeleton)
export const blurDataUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB/8QAIRAAAQMDBQEAAAAAAAAAAAAAAQIDBAAFBhESIiP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcouSnb+ijzjDFKM1d9PKO3LRqLWhPQGaFRbhh0h5DRWKQ0skdEdXBRYKZbPVvJzO3B9dW0jV3NP1yCrnjh5Ly3Dv9hRMwAAAABJRU5ErkJggg=='
