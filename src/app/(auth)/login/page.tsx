'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createSupabaseBrowserClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Nesprávný e-mail nebo heslo.')
      setIsLoading(false)
      return
    }

    router.push('/account')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-display-md text-[var(--color-accent-warm)]">
            TripRadar
          </Link>
          <h1 className="mt-4 text-display-sm font-display text-[var(--color-text-primary)]">
            Přihlásit se
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-caption font-medium text-[var(--color-text-primary)] mb-1 block">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tvuj@email.cz"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-caption font-medium text-[var(--color-text-primary)] mb-1 block">
              Heslo
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-caption text-[var(--color-accent-coral)]" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Přihlásit se'}
          </Button>
        </form>

        <p className="mt-6 text-center text-caption text-[var(--color-text-muted)]">
          Nemáš účet?{' '}
          <Link href="/register" className="text-[var(--color-accent-primary)] hover:underline">
            Zaregistrovat se
          </Link>
        </p>
      </div>
    </div>
  )
}
