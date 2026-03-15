import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/ecomail'
import { newsletterSchema } from '@/lib/validators'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Zod validace
    const validated = newsletterSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.errors[0]?.message ?? 'Neplatná data.' },
        { status: 400 }
      )
    }

    const { email, source = 'website-signup' } = validated.data

    // Přihlásit do Ecomail
    const result = await subscribeToNewsletter(email, ['free-newsletter', 'website-signup'])

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 500 })
    }

    // Uložit do Supabase subscribers tabulky
    try {
      const supabase = await createSupabaseServerClient()
      await supabase.from('subscribers').upsert(
        {
          email,
          source,
          tags: ['free-newsletter', 'website-signup'],
          gdpr_consent: true,
        },
        { onConflict: 'email', ignoreDuplicates: true }
      )
    } catch {
      // Neblokující — Ecomail je primární
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ success: false, error: 'Chyba serveru.' }, { status: 500 })
  }
}
