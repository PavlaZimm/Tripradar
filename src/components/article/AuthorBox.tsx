import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Twitter, Linkedin, Globe } from 'lucide-react'
import { blurDataUrl } from '@/lib/utils'
import type { Author } from '@/types'

interface AuthorBoxProps {
  author: Author
}

// Server Component — EEAT autor box
export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <aside className="my-12 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
      <p className="text-overline text-[var(--color-text-muted)] mb-4">O autorovi</p>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Profilová fotka */}
        {author.photo && (
          <Link href={`/author/${author.slug}`} className="flex-shrink-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={author.photo.url}
                alt={author.photo.alt}
                fill
                sizes="80px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </div>
          </Link>
        )}

        {/* Info */}
        <div className="flex-1">
          <Link
            href={`/author/${author.slug}`}
            className="font-display text-display-sm hover:text-[var(--color-accent-primary)] transition-colors"
          >
            {author.name}
          </Link>
          {author.credentials && (
            <p className="text-caption text-[var(--color-text-muted)] mt-0.5">
              {author.credentials}
            </p>
          )}
          <p className="text-body text-[var(--color-text-secondary)] mt-3">{author.bio}</p>

          {/* Sociální sítě */}
          {author.socialLinks && (
            <div className="mt-4 flex items-center gap-3">
              {author.socialLinks.instagram && (
                <a
                  href={author.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
                  aria-label={`${author.name} na Instagramu`}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
                  aria-label={`${author.name} na X/Twitter`}
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
                  aria-label={`${author.name} na LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {author.socialLinks.website && (
                <a
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
                  aria-label={`${author.name} — osobní web`}
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
