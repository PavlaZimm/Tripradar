import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { createSupabaseAdminClient } from '@/lib/supabase'
import {
  sendEbookPurchaseConfirmation,
  sendMysterySubscriptionConfirmation,
  sendPaymentFailedNotification,
} from '@/lib/resend'
import { addTagsToSubscriber } from '@/lib/ecomail'
import { absoluteUrl } from '@/lib/utils'

// KRITICKÉ: Použij req.text() NE req.json() — jinak selže ověření podpisu!
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Chybí Stripe signature.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Neplatný podpis.' }, { status: 400 })
  }

  const supabase = createSupabaseAdminClient()

  try {
    switch (event.type) {
      // -------------------------------------------------------------------------
      // Úspěšný nákup (e-book nebo předplatné)
      // -------------------------------------------------------------------------
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata ?? {}
        const customerEmail = session.customer_details?.email

        if (metadata.productType === 'ebook') {
          // Zaznamenat nákup e-booku do Supabase
          if (metadata.userId && metadata.userId !== 'guest') {
            await supabase.from('purchases').insert({
              user_id: metadata.userId,
              product_id: metadata.productId,
              stripe_session_id: session.id,
              amount: session.amount_total ?? 0,
              currency: session.currency ?? 'czk',
              slug: metadata.slug,
              // file_path se doplní z produktu v reálné implementaci
              file_path: `ebooks/${metadata.slug}.pdf`,
            })
          }

          // Odeslat potvrzovací e-mail
          if (customerEmail && metadata.slug) {
            await sendEbookPurchaseConfirmation(customerEmail, {
              ebookTitle: metadata.productId,
              downloadUrl: absoluteUrl(`/api/download/${metadata.productId}`),
            })
            // Přidat Ecomail tag
            await addTagsToSubscriber(customerEmail, ['ebook-buyer'])
          }
        }
        break
      }

      // -------------------------------------------------------------------------
      // Předplatné aktivováno / aktualizováno
      // -------------------------------------------------------------------------
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0]?.price.id ?? '',
              status: subscription.status,
              tier: subscription.metadata?.tier ?? 'mystery',
              current_period_start: new Date(
                subscription.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            })
            .eq('stripe_subscription_id', subscription.id)
        }

        // Pokud je nové předplatné — odeslat uvítací e-mail
        if (subscription.status === 'active' && event.data.previous_attributes?.status === 'trialing') {
          const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer
          if (customer.email) {
            await sendMysterySubscriptionConfirmation(customer.email, {
              nextRevealDate: '1. příštího měsíce',
            })
            await addTagsToSubscriber(customer.email, ['paid-subscriber'])
          }
        }
        break
      }

      // -------------------------------------------------------------------------
      // Předplatné zrušeno
      // -------------------------------------------------------------------------
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      // -------------------------------------------------------------------------
      // Platba selhala
      // -------------------------------------------------------------------------
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer
        if (customer.email) {
          await sendPaymentFailedNotification(customer.email, {
            updateUrl: absoluteUrl('/account'),
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Chyba zpracování.' }, { status: 500 })
  }
}
