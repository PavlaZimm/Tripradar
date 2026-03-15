import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase'
import { ebookCheckoutSchema } from '@/lib/validators'
import { absoluteUrl } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    // Parsuj form data nebo JSON
    let slug: string
    let priceId: string

    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData()
      slug = String(formData.get('slug') ?? '')
      priceId = String(formData.get('priceId') ?? '')
    } else {
      const body = await req.json()
      slug = body.slug
      priceId = body.priceId
    }

    // Zod validace
    const validated = ebookCheckoutSchema.safeParse({ slug, priceId })
    if (!validated.success) {
      return NextResponse.json({ error: 'Neplatná data.' }, { status: 400 })
    }

    // Načti přihlášeného uživatele (nepovinné — guest checkout povolíme)
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Vytvoř Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: validated.data.priceId, quantity: 1 }],
      success_url: `${absoluteUrl(`/ebooks/${validated.data.slug}`)}?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: absoluteUrl(`/ebooks/${validated.data.slug}`),
      automatic_tax: { enabled: true },
      metadata: {
        productType: 'ebook',
        productId: validated.data.slug,
        userId: user?.id ?? 'guest',
        slug: validated.data.slug,
      } satisfies { productType: string; productId: string; userId: string; slug: string },
      // Pokud je přihlášen, předvyplníme email
      ...(user?.email && { customer_email: user.email }),
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Nepodařilo se vytvořit platbu.' }, { status: 500 })
    }

    return NextResponse.redirect(session.url, { status: 303 })
  } catch (error) {
    console.error('Ebook checkout error:', error)
    return NextResponse.json({ error: 'Chyba serveru.' }, { status: 500 })
  }
}
