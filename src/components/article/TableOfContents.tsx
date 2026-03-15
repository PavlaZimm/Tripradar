'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

// Client Component — potřebuje scroll tracking a interakci
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // Sleduje aktivní sekci při scrollu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <>
      {/* Desktop — sticky sidebar (skrytý na mobilu) */}
      <aside className="hidden xl:block sticky top-24 self-start">
        <nav aria-label="Obsah článku">
          <h2 className="text-overline text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
            <BookOpen className="h-3 w-3" />
            Obsah
          </h2>
          <ol className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block text-caption transition-colors py-0.5',
                    item.level === 2 ? 'pl-0' : 'pl-4',
                    activeId === item.id
                      ? 'text-[var(--color-accent-primary)] font-medium'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      {/* Mobil — collapsible */}
      <div className="xl:hidden mb-8 border border-[var(--color-border)] rounded-sm overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-caption font-medium bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-colors"
          aria-expanded={isOpen}
          aria-controls="toc-mobile"
        >
          <span className="flex items-center gap-2 text-overline">
            <BookOpen className="h-3 w-3" />
            Obsah článku
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isOpen && (
          <nav id="toc-mobile" aria-label="Obsah článku — mobil" className="bg-[var(--color-bg-secondary)] px-4 py-3">
            <ol className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      'block text-caption py-0.5',
                      item.level === 2 ? 'pl-0' : 'pl-4',
                      'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </>
  )
}
