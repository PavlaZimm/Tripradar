'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { NavItem } from '@/types'

interface MobileNavProps {
  navItems: NavItem[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Otevřít menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="font-display text-display-sm text-[var(--color-accent-warm)]">
              TripRadar
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block rounded-sm px-3 py-2 text-body font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
              >
                {item.label}
              </Link>
              {item.children && item.children.length > 0 && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-sm px-3 py-1.5 text-caption text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <Separator className="my-4" />
        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/mystery">Mystery výlety</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/ebooks">E-booky</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
