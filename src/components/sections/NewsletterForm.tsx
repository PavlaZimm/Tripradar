'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  variant?: 'inline' | 'centered'
  leadMagnet?: string
}

// Client Component — email capture formulář
// variant="inline" — pro sidebar a footer
// variant="centered" — pro homepage sekci
export function NewsletterForm({
  variant = 'centered',
  leadMagnet = 'Průvodce: 10 nejlevnějších letišť v Evropě',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website-signup' }),
      })

      const data = await res.json()

      if (!data.success) {
        setStatus('error')
        setErrorMessage(data.error ?? 'Nepodařilo se přihlásit. Zkuste to znovu.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Chyba sítě. Zkuste to znovu.')
    }
  }

  if (variant === 'inline') {
    return (
      <div>
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-caption text-[var(--color-accent-primary)]">
            <CheckCircle2 className="h-4 w-4" />
            <span>Přihlášení úspěšné! Zkontroluj e-mail.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="tvuj@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="E-mailová adresa pro newsletter"
              className="flex-1"
            />
            <Button type="submit" disabled={status === 'loading'} size="sm">
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Přihlásit'}
            </Button>
          </form>
        )}
        {errorMessage && (
          <p className="mt-1 text-caption text-[var(--color-accent-coral)]">{errorMessage}</p>
        )}
      </div>
    )
  }

  // variant="centered" — homepage sekce
  return (
    <section className="bg-[var(--color-accent-primary)] py-16 md:py-24">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-6">
          <Mail className="h-6 w-6 text-white" />
        </div>

        <h2 className="text-display-md font-display text-white mb-3">
          Newsletter pro cestovatele
        </h2>
        <p className="text-body text-white/80 mb-2">
          Tipy, průvodce a exkluzivní nabídky přímo do schránky.
        </p>
        {leadMagnet && (
          <p className="text-caption text-white/60 mb-8">
            🎁 Dárek zdarma: <strong className="text-white/80">{leadMagnet}</strong>
          </p>
        )}

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-white">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-body font-medium">Přihlášení úspěšné! Zkontroluj e-mail.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="tvuj@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="E-mailová adresa pro newsletter"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              variant="secondary"
              className="flex-shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Přihlásit se'
              )}
            </Button>
          </form>
        )}

        {errorMessage && (
          <p className="mt-2 text-caption text-white/70">{errorMessage}</p>
        )}

        <p className="mt-4 text-caption text-white/40">
          Bez spamu · Odhlášení kdykoliv · GDPR
        </p>
      </div>
    </section>
  )
}
