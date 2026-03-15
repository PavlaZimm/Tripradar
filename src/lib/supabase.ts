// Server-only Supabase utilities
// Importuje next/headers — NESMÍ být importován z Client Components!
// Client Components: importuj z '@/lib/supabase-browser'
export {
  createSupabaseServerClient,
  createSupabaseAdminClient,
  hasActiveMysterySubscription,
  hasPurchasedEbook,
} from './supabase-server'
