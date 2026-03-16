export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripe, MYSTERY_PRICES } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { mysteryCheckoutSchema } from '@/lib/validators'
import { absoluteUrl } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    let interval: string

    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData()
      interval = String(formData.get('interval') ?? 'monthly')
    } else {
      const body = await req.json()
      interval = body.interval
    }

    const validated = mysteryCheckoutSchema.safeParse({ interval })
    if (!validated.success) {
      return NextResponse.json({ error: 'Neplatný typ předplatného.' }, { status: 400 })
    }

    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const priceId = MYSTERY_PRICES[validated.data.interval]

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: absoluteUrl('/mystery/confirm?session_id={CHECKOUT_SESSION_ID}'),
      cancel_url: absoluteUrl('/mystery'),
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          tier: 'mystery',
          interval: validated.data.interval,
        },
      },
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      ...(user?.email && { customer_email: user.email }),
      metadata: {
        productType: `mystery-${validated.data.interval}`,
        userId: user?.id ?? 'guest',
      },
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Nepodařilo se vytvořit předplatné.' }, { status: 500 })
    }

    return NextResponse.redirect(session.url, { status: 303 })
  } catch (error) {
    console.error('Mystery checkout error:', error)
    return NextResponse.json({ error: 'Chyba serveru.' }, { status: 500 })
  }
}
