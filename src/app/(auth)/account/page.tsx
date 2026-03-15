import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Můj účet',
  robots: 'noindex',
}

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Middleware toto chrání, ale pro jistotu
  if (!user) redirect('/login')

  const admin = createSupabaseAdminClient()

  // Načti předplatné a nákupy paralelně
  const [subscriptionResult, purchasesResult] = await Promise.all([
    admin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single(),
    admin
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ])

  const subscription = subscriptionResult.data
  const purchases = purchasesResult.data ?? []

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-display-md font-display text-[var(--color-text-primary)] mb-8">
        Můj účet
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Sidebar — info */}
        <aside className="md:col-span-1">
          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <h2 className="text-overline text-[var(--color-text-muted)] mb-4">Profil</h2>
            <p className="text-body font-medium text-[var(--color-text-primary)]">
              {user.user_metadata?.full_name ?? 'Uživatel'}
            </p>
            <p className="text-caption text-[var(--color-text-secondary)]">{user.email}</p>
          </div>
        </aside>

        {/* Hlavní obsah */}
        <main className="md:col-span-2 space-y-8">
          {/* Předplatné */}
          <section className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <h2 className="text-overline text-[var(--color-text-muted)] mb-4">Mystery předplatné</h2>
            {subscription ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="default">Aktivní</Badge>
                  <span className="text-caption text-[var(--color-text-secondary)]">
                    Obnovení: {formatDate(subscription.current_period_end)}
                  </span>
                </div>
                {subscription.cancel_at_period_end && (
                  <p className="text-caption text-[var(--color-accent-coral)] mb-4">
                    Předplatné se neobnoví po {formatDate(subscription.current_period_end)}.
                  </p>
                )}
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/mystery">Zobrazit výlety</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-body text-[var(--color-text-secondary)] mb-4">
                  Nemáš aktivní Mystery předplatné.
                </p>
                <Button asChild size="sm">
                  <Link href="/mystery">Začít 7 dní zdarma</Link>
                </Button>
              </div>
            )}
          </section>

          {/* Zakoupené e-booky */}
          <section className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <h2 className="text-overline text-[var(--color-text-muted)] mb-4">Zakoupené e-booky</h2>
            {purchases.length === 0 ? (
              <div>
                <p className="text-body text-[var(--color-text-secondary)] mb-4">
                  Zatím žádné nákupy.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/ebooks">Prohlédnout e-booky</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--color-border)]">
                {purchases.map((purchase) => (
                  <li key={purchase.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-caption font-medium text-[var(--color-text-primary)]">
                        {purchase.slug}
                      </p>
                      <p className="text-caption text-[var(--color-text-muted)]">
                        {formatDate(purchase.created_at)} · {formatPrice(purchase.amount, purchase.currency.toUpperCase())}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/api/download/${purchase.product_id}`}>
                        Stáhnout
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
