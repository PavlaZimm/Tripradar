import Link from 'next/link'
import { MapPin, Calendar, Sparkles } from 'lucide-react'

export function MysteryTeaser() {
  return (
    <section className="bg-[var(--color-bg-dark)] py-24 md:py-36 overflow-hidden relative">
      {/* Jemný ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(255,111,89,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 40%, rgba(28,118,143,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[var(--color-accent-primary)]" />
          <span className="text-xs tracking-widest uppercase text-[var(--color-accent-primary)]">
            Mystery výlety
          </span>
        </div>

        {/* Hlavní obsah — 2 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end mb-16">
          <div>
            <h2 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-tight text-white mb-6">
              Nevíš kam jet?
              <br />
              <em className="text-[var(--color-accent-primary)]">Nechej to na nás.</em>
            </h2>
          </div>
          <div>
            <p className="text-base text-white/60 leading-relaxed mb-8">
              Každý měsíc dostaneš tip na výjimečný výlet — cíl nevíš dopředu.
              Jen se sbal a jeď. Průvodce, ubytování, itinerář — vše připraveno.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link
                href="/mystery"
                className="text-sm font-medium text-[var(--color-accent-primary)] hover:text-[#FF8B78] transition-colors underline underline-offset-4"
              >
                Začít 7 dní zdarma →
              </Link>
              <Link
                href="/mystery#jak-to-funguje"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Jak to funguje?
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/25 tracking-wide">
              Zrušení kdykoliv · Od 199 Kč/měsíc
            </p>
          </div>
        </div>

        {/* Tři vlastnosti — tenké linky */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-white/10">
          {[
            { icon: MapPin, title: 'Nové destinace', desc: 'Místa, která bys sám nehledal' },
            { icon: Calendar, title: 'Každý měsíc', desc: 'Pravidelný výlet naplánovaný za tebe' },
            { icon: Sparkles, title: '7 dní zdarma', desc: 'Vyzkoušej bez závazků' },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`py-8 pr-8 ${i > 0 ? 'sm:pl-8 sm:border-l border-white/10' : ''}`}
            >
              <f.icon className="h-4 w-4 text-[var(--color-accent-primary)] mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-medium text-white mb-1">{f.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
