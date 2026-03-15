import { createBrowserClient } from '@supabase/ssr'

// Pouze browser client — bezpečný pro Client Components ("use client")
// NEIMPORTUJE next/headers → nevadí v klientském kontextu
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
