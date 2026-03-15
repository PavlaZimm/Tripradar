import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  destinace: {
    title: 'Destinace',
    links: [
      { label: 'Evropa', href: '/category/evropa' },
      { label: 'Asie', href: '/category/asie' },
      { label: 'Amerika', href: '/category/amerika' },
      { label: 'Afrika', href: '/category/afrika' },
    ],
  },
  obsah: {
    title: 'Obsah',
    links: [
      { label: 'Průvodci', href: '/category/pruvodci' },
      { label: 'Tipy & triky', href: '/category/tipy' },
      { label: 'E-booky', href: '/ebooks' },
      { label: 'Mystery výlety', href: '/mystery' },
    ],
  },
  onas: {
    title: 'O nás',
    links: [
      { label: 'O TripRadaru', href: '/o-nas' },
      { label: 'Autoři', href: '/autori' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Inzerce', href: '/inzerce' },
    ],
  },
  pravni: {
    title: 'Právní',
    links: [
      { label: 'Zásady ochrany dat', href: '/gdpr' },
      { label: 'Podmínky užití', href: '/podminky' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Affiliate disclaimer', href: '/affiliate' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        {/* Logo + popis */}
        <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-display-md text-[var(--color-accent-warm)]"
            >
              TripRadar
            </Link>
            <p className="mt-2 text-caption text-[var(--color-text-secondary)]">
              Česky psaný travel magazín pro všechny cestovatele. Průvodci, tipy, mystery výlety a e-booky.
            </p>
          </div>

          {/* Affiliate disclaimer */}
          <div className="max-w-sm rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <p className="text-caption text-[var(--color-text-muted)]">
              <strong className="text-overline">Affiliate disclaimer:</strong>{' '}
              Některé odkazy na tomto webu jsou affiliate. Pokud nakoupíte přes náš odkaz, dostaneme malou provizi bez dopadu na cenu pro vás.
            </p>
          </div>
        </div>

        {/* Linky */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-overline text-[var(--color-text-primary)] mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} TripRadar.cz. Všechna práva vyhrazena.
          </p>
          <p className="text-caption text-[var(--color-text-muted)]">
            Analytika: Umami (GDPR-compliant, no cookies)
          </p>
        </div>
      </div>
    </footer>
  )
}
