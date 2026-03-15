import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Sparkles } from 'lucide-react'

// Server Component — dark sekce s gradientem
// Cíl: konverze na Mystery předplatné
export function MysteryTeaser() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-20 md:py-32">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(28, 118, 143, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(196, 149, 106, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Dekorativní prvky */}
      <div className="absolute top-8 right-8 text-[var(--color-text-muted)]/20 text-[120px] font-display select-none pointer-events-none">
        ?
      </div>

      <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <span className="text-overline text-[var(--color-accent-primary)] mb-4 block">
          Mystery výlety
        </span>

        <h2 className="text-display-lg text-[var(--color-bg-primary)] font-display mb-6">
          Nevíš kam jet?
          <br />
          <em className="text-[var(--color-accent-warm)]">Nechej to na nás.</em>
        </h2>

        <p className="text-body-lg text-[var(--color-bg-primary)]/70 max-w-2xl mx-auto mb-10">
          Každý měsíc dostaneš tip na výjimečný výlet — cíl nevíš dopředu. Jen se sbal a jeď.
          Průvodce, ubytování, itinerář — vše připraveno.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: MapPin,
              title: 'Nové destinace',
              desc: 'Místa, která bys sám nehledal',
            },
            {
              icon: Calendar,
              title: 'Každý měsíc',
              desc: 'Pravidelný výlet naplánovaný za tebe',
            },
            {
              icon: Sparkles,
              title: '7 dní zdarma',
              desc: 'Vyzkoušej bez závazků',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-sm border border-[var(--color-border-dark)] p-6 text-left"
            >
              <feature.icon className="h-6 w-6 text-[var(--color-accent-primary)] mb-3" />
              <h3 className="text-caption font-semibold text-[var(--color-bg-primary)] mb-1">
                {feature.title}
              </h3>
              <p className="text-caption text-[var(--color-bg-primary)]/60">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/mystery">Začít 7 dní zdarma</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-[var(--color-bg-primary)]/30 text-[var(--color-bg-primary)] hover:bg-[var(--color-bg-primary)]/10">
            <Link href="/mystery#jak-to-funguje">Jak to funguje?</Link>
          </Button>
        </div>

        <p className="mt-4 text-caption text-[var(--color-bg-primary)]/40">
          Zrušení kdykoliv · Žádné závazky · Od 199 Kč/měsíc
        </p>
      </div>
    </section>
  )
}
