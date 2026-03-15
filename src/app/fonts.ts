import { Cormorant_Garamond, Outfit } from 'next/font/google'

// Serif — nadpisy, hero, pull quotes (VŽDY latin-ext pro českou diakritiku!)
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Sans-serif — UI, body text, metadata
export const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})
