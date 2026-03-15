import type { FAQItem } from '@/types'

interface FAQProps {
  items: FAQItem[]
  title?: string
}

// Server Component — FAQ sekce s FAQPage schema se přidává přes FAQSchema.tsx
export function FAQ({ items, title = 'Časté dotazy' }: FAQProps) {
  if (items.length === 0) return null

  return (
    <section className="container mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
      <h2 className="text-display-md font-display text-[var(--color-text-primary)] mb-8 text-center">
        {title}
      </h2>
      <dl className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-b border-[var(--color-border)] pb-6 last:border-0"
          >
            <dt className="font-body font-semibold text-body text-[var(--color-text-primary)] mb-2">
              {item.question}
            </dt>
            <dd className="text-body text-[var(--color-text-secondary)] leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
