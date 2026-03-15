import { z } from 'zod'

// Newsletter přihlášení
export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Zadejte platnou e-mailovou adresu.' })
    .max(254, { message: 'E-mail je příliš dlouhý.' }),
  source: z.string().optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// Checkout — e-book
export const ebookCheckoutSchema = z.object({
  slug: z.string().min(1),
  priceId: z.string().startsWith('price_'),
})

export type EbookCheckoutInput = z.infer<typeof ebookCheckoutSchema>

// Checkout — Mystery předplatné
export const mysteryCheckoutSchema = z.object({
  interval: z.enum(['monthly', 'yearly']),
})

export type MysteryCheckoutInput = z.infer<typeof mysteryCheckoutSchema>

// Download request
export const downloadSchema = z.object({
  id: z.string().uuid({ message: 'Neplatné ID.' }),
})

export type DownloadInput = z.infer<typeof downloadSchema>

// Kontaktní formulář (budoucí rozšíření)
export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Jméno musí mít alespoň 2 znaky.' }).max(100),
  email: z.string().email({ message: 'Zadejte platnou e-mailovou adresu.' }),
  message: z
    .string()
    .min(10, { message: 'Zpráva musí mít alespoň 10 znaků.' })
    .max(2000, { message: 'Zpráva je příliš dlouhá.' }),
})

export type ContactInput = z.infer<typeof contactSchema>
