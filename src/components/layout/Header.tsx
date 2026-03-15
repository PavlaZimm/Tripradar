import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'
import type { NavItem } from '@/types'

const navItems: NavItem[] = [
  {
    label: 'Destinace',
    href: '/category/destinace',
    children: [
      { label: 'Evropa', href: '/category/evropa' },
      { label: 'Asie', href: '/category/asie' },
      { label: 'Amerika', href: '/category/amerika' },
      { label: 'Afrika', href: '/category/afrika' },
    ],
  },
  { label: 'Průvodci', href: '/category/pruvodci' },
  { label: 'Tipy & triky', href: '/category/tipy' },
  { label: 'Mystery výlety', href: '/mystery' },
  { label: 'E-booky', href: '/ebooks' },
]

// Server Component — navigace je statická, bez client-side JS
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-display-sm text-[var(--color-accent-warm)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="TripRadar — domů"
        >
          TripRadar
        </Link>

        {/* Desktop navigace */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-caption text-overline text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </Link>

              {/* Dropdown */}
              {item.children && item.children.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-caption text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)] transition-colors first:rounded-t-sm last:rounded-b-sm"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Pravá strana — search + CTA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild aria-label="Vyhledat">
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/mystery">Mystery výlety</Link>
          </Button>

          {/* Mobile hamburger */}
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  )
}
