'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Heslo musí mít alespoň 8 znaků.')
      setIsLoading(false)
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/account`,
      },
    })

    if (authError) {
      setError(authError.message === 'User already registered'
        ? 'Tento e-mail je již registrován.'
        : 'Registrace se nezdařila. Zkuste to znovu.')
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <CheckCircle2 className="h-12 w-12 text-[var(--color-accent-primary)] mx-auto mb-4" />
          <h1 className="text-display-sm font-display mb-2">Zkontroluj e-mail</h1>
          <p className="text-body text-[var(--color-text-secondary)]">
            Poslali jsme ti ověřovací odkaz na <strong>{email}</strong>.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/login">Zpět na přihlášení</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-display-md text-[var(--color-accent-warm)]">
            TripRadar
          </Link>
          <h1 className="mt-4 text-display-sm font-display text-[var(--color-text-primary)]">
            Vytvořit účet
          </h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-caption font-medium mb-1 block">Jméno</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Jan Novák"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-caption font-medium mb-1 block">E-mail</label>
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
            <label htmlFor="password" className="text-caption font-medium mb-1 block">Heslo</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min. 8 znaků"
            />
          </div>

          {error && (
            <p className="text-caption text-[var(--color-accent-coral)]" role="alert">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Vytvořit účet'}
          </Button>

          <p className="text-caption text-[var(--color-text-muted)] text-center">
            Registrací souhlasíš s{' '}
            <Link href="/podminky" className="hover:underline">podmínkami</Link>{' '}
            a{' '}
            <Link href="/gdpr" className="hover:underline">zásadami ochrany dat</Link>.
          </p>
        </form>

        <p className="mt-6 text-center text-caption text-[var(--color-text-muted)]">
          Máš účet?{' '}
          <Link href="/login" className="text-[var(--color-accent-primary)] hover:underline">
            Přihlásit se
          </Link>
        </p>
      </div>
    </div>
  )
}
