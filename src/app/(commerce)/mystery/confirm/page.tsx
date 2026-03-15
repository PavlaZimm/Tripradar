import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Předplatné aktivováno!',
  robots: 'noindex',
}

export default function MysteryConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent-primary)]/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-[var(--color-accent-primary)]" />
        </div>
        <h1 className="text-display-md font-display text-[var(--color-text-primary)] mb-4">
          Vítej v Mystery výletech!
        </h1>
        <p className="text-body text-[var(--color-text-secondary)] mb-8">
          Tvoje předplatné je aktivní. Dostaneš e-mail s potvrzením a informacemi o prvním výletu.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/account">Přejít do účtu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Na hlavní stránku</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
