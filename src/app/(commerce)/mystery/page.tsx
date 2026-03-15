import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FAQ } from '@/components/sections/FAQ'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CheckCircle2, MapPin, Calendar, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import type { FAQItem } from '@/types'

// SSG — mění se jen při redeploymentu
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Mystery výlety — Měsíční předplatné',
  description:
    'Každý měsíc dostaneš tip na výjimečný výlet — cíl nevíš dopředu. 7 dní zdarma, zrušení kdykoliv.',
  alternates: { canonical: 'https://tripradar.cz/mystery' },
}

const mysteryFAQ: FAQItem[] = [
  {
    question: 'Jak Mystery výlety fungují?',
    answer:
      'Každý měsíc dostaneš e-mailem kompletní průvodce na výjimečný výlet — cíl nevíš dopředu. Zahrnuté je doporučení ubytování, restaurací, itinerář a tipy na skrytá místa. Sbal se a jeď!',
  },
  {
    question: 'Mohu předplatné kdykoliv zrušit?',
    answer:
      'Ano, zrušení je kdykoliv bez poplatků. Přístup k výletům ti zůstane do konce zaplaceného období.',
  },
  {
    question: 'Jsou výlety jen pro Českou republiku?',
    answer:
      'Ne! Mystery výlety zahrnují celou Evropu i zámoří. Připravujeme destinace v různých cenových kategoriích.',
  },
  {
    question: 'Co zahrnuje 7denní zkušební období?',
    answer:
      'Během 7 dní zdarma máš přístup ke všem Mystery výletům a průvodcům. Karta se strhne až po uplynutí zkušební doby.',
  },
]

const testimonials = [
  {
    name: 'Tereza K.',
    text: 'Díky Mystery výletům jsem objevila místa, která bych nikdy sama nehledala. Každý měsíc překvapení!',
    stars: 5,
  },
  {
    name: 'Martin V.',
    text: 'Ideální pro lidi, kteří chtějí cestovat, ale nemají čas plánovat. Vše je připraveno za vás.',
    stars: 5,
  },
  {
    name: 'Jana P.',
    text: 'Skvělý tip od kamarádky. Průvodce jsou detailní a destinace vždycky originální.',
    stars: 5,
  },
]

export default function MysteryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-dark)] py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, #1C768F 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, #C4956A 0%, transparent 50%)',
          }}
        />
        <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <Badge variant="default" className="mb-6">
            7 dní zdarma
          </Badge>
          <h1 className="text-display-xl text-[var(--color-bg-primary)] font-display mb-6">
            Mystery výlety
            <br />
            <em className="text-[var(--color-accent-warm)]">Nechej se překvapit.</em>
          </h1>
          <p className="text-body-lg text-[var(--color-bg-primary)]/70 max-w-2xl mx-auto mb-10">
            Každý měsíc dostaneš tip na výjimečný výlet — cíl nevíš dopředu. Jen se sbal a jeď.
            Průvodce, ubytování, itinerář — vše připraveno.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <form action="/api/checkout/mystery" method="POST">
              <input type="hidden" name="interval" value="monthly" />
              <Button type="submit" size="lg">
                Začít 7 dní zdarma — pak 199 Kč/měs
              </Button>
            </form>
            <form action="/api/checkout/mystery" method="POST">
              <input type="hidden" name="interval" value="yearly" />
              <Button type="submit" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Roční plán — ušetři 40%
              </Button>
            </form>
          </div>
          <p className="mt-4 text-caption text-[var(--color-bg-primary)]/40">
            Bez závazků · Zrušení kdykoliv · Bezpečná platba přes Stripe
          </p>
        </div>
      </section>

      {/* Jak to funguje */}
      <section id="jak-to-funguje" className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-display-md font-display text-center mb-12">Jak to funguje?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              step: '01',
              title: 'Přihlas se',
              desc: '7 dní zdarma, pak 199 Kč/měsíc nebo 1 399 Kč/rok.',
            },
            {
              icon: Calendar,
              step: '02',
              title: 'Čekej na překvapení',
              desc: '1. den každého měsíce dostaneš e-mail s průvodcem na tajnou destinaci.',
            },
            {
              icon: MapPin,
              step: '03',
              title: 'Sbal se a jeď',
              desc: 'Vše je připraveno — ubytování, itinerář, restaurace, tipy.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-primary)]/10 mb-4">
                <item.icon className="h-6 w-6 text-[var(--color-accent-primary)]" />
              </div>
              <p className="text-overline text-[var(--color-accent-primary)] mb-2">{item.step}</p>
              <h3 className="font-display text-display-sm mb-2">{item.title}</h3>
              <p className="text-caption text-[var(--color-text-secondary)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Co zahrnuje */}
      <section className="bg-[var(--color-bg-secondary)] py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-display-md font-display text-center mb-10">Co dostaneš</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Kompletní průvodce destinací (PDF)',
              'Itinerář den po dni',
              'Doporučení ubytování ve všech kategoriích',
              'Tipy na restaurace a kavárny',
              'Skrytá místa mimo turistické trasy',
              'Praktické informace (doprava, vízum, počasí)',
              'Přístup k archivu všech předchozích výletů',
              'Prioritní podpora e-mailem',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                <span className="text-body text-[var(--color-text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-display-md font-display text-center mb-10">Co říkají cestovatelé</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
              <div className="flex mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-accent-warm)] text-[var(--color-accent-warm)]" />
                ))}
              </div>
              <p className="text-body text-[var(--color-text-secondary)] mb-4">„{t.text}"</p>
              <footer className="text-caption text-[var(--color-text-muted)]">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <div className="bg-[var(--color-bg-secondary)]">
        <FAQ items={mysteryFAQ} title="Časté dotazy" />
      </div>

      {/* Final CTA */}
      <section className="bg-[var(--color-accent-primary)] py-16 text-center">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-display-md font-display text-white mb-4">
            Připraven na první výlet?
          </h2>
          <p className="text-body text-white/80 mb-8">
            7 dní zdarma, pak od 199 Kč/měsíc. Zrušení kdykoliv.
          </p>
          <form action="/api/checkout/mystery" method="POST">
            <input type="hidden" name="interval" value="monthly" />
            <Button type="submit" size="lg" variant="secondary">
              Začít 7 dní zdarma
            </Button>
          </form>
        </div>
      </section>

      <FAQSchema items={mysteryFAQ} />
      <BreadcrumbSchema
        items={[
          { name: 'Domů', href: '/' },
          { name: 'Mystery výlety', href: '/mystery' },
        ]}
      />
    </>
  )
}
