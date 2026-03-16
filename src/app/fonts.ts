import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

// Serif — nadpisy, hero, pull quotes (VŽDY latin-ext pro českou diakritiku!)
export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Sans-serif — UI, body text, metadata
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})
