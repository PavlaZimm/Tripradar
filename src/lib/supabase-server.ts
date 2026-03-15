import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

// Server client — pro Server Components a Route Handlers
// Importuje next/headers → NIKDY do Client Components!
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookies nelze nastavovat, ignorujeme
          }
        },
      },
    }
  )
}

// Admin client — POUZE server-side, nikdy NEXT_PUBLIC!
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// Helper: Ověří aktivní předplatné (pro mystery obsah)
export async function hasActiveMysterySubscription(userId: string): Promise<boolean> {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .eq('tier', 'mystery')
    .single()
  return !!data
}

// Helper: Ověří, zda user koupil daný e-book
export async function hasPurchasedEbook(userId: string, productId: string): Promise<boolean> {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()
  return !!data
}
