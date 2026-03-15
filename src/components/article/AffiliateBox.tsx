import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { AffiliateData } from '@/types'

interface AffiliateBoxProps {
  data: AffiliateData
}

// Server Component — affiliate CTA box (vkládá se po 3. odstavci)
export function AffiliateBox({ data }: AffiliateBoxProps) {
  return (
    <aside
      className="my-8 rounded-sm border border-[var(--color-accent-warm)]/30 bg-[var(--color-accent-warm)]/5 p-6"
      aria-label={`Affiliate: ${data.label}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-overline text-[var(--color-accent-warm)] mb-1">{data.label}</p>
          <p className="text-caption text-[var(--color-text-secondary)]">
            Partnerský link — platíš stejnou cenu, nám pomáhá provozovat magazín.
          </p>
        </div>
        <Button asChild variant="warm" className="flex-shrink-0">
          <Link href={data.url} target="_blank" rel="noopener noreferrer nofollow">
            {data.cta}
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>
    </aside>
  )
}
