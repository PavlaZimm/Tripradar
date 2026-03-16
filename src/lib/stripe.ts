import Stripe from 'stripe'

// Stripe server client — POUZE server-side
// Nikdy neimportovat do Client Components!
// Lazy inicializace — neprovádí se při buildu, jen při skutečném volání
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
  }
  return _stripe
}

// Price IDs pro Mystery předplatné
export const MYSTERY_PRICES = {
  monthly: process.env.STRIPE_MYSTERY_MONTHLY_PRICE_ID!,
  yearly: process.env.STRIPE_MYSTERY_YEARLY_PRICE_ID!,
} as const

// Webhook secret
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
