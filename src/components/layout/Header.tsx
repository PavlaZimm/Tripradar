import Link from 'next/link'
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
  { label: 'E-booky', href: '/ebooks' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
          aria-label="TripRadar — domů"
        >
          TripRadar
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </Link>

              {item.children && item.children.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-44 border border-[var(--color-border)] bg-white shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Pravá strana */}
        <div className="flex items-center gap-4">
          <Link
            href="/mystery"
            className="hidden sm:inline-flex items-center text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Mystery výlety →
          </Link>
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Přihlásit
          </Link>
          <MobileNav navItems={navItems} />
        </div>

      </div>
    </header>
  )
}
