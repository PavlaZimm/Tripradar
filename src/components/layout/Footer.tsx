import Link from 'next/link'

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
    ],
  },
  pravni: {
    title: 'Právní',
    links: [
      { label: 'Ochrana dat', href: '/gdpr' },
      { label: 'Podmínky užití', href: '/podminky' },
      { label: 'Affiliate', href: '/affiliate' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">

        {/* Horní část — logo + linky */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5 mb-14">
          {/* Logo + tagline */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-xl text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors">
              TripRadar
            </Link>
            <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
              Česky psaný travel magazín pro všechny cestovatele.
            </p>
          </div>

          {/* Linky */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-xs tracking-widest uppercase text-[var(--color-text-primary)] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Spodní část */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} TripRadar.cz
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Některé odkazy jsou affiliate — cena pro vás se nemění.
          </p>
        </div>

      </div>
    </footer>
  )
}
