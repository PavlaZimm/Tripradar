import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-overline font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)]',
        secondary:
          'border-transparent bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]',
        destructive:
          'border-transparent bg-[var(--color-accent-coral)] text-white hover:bg-red-600',
        outline:
          'text-[var(--color-text-primary)] border-[var(--color-border)]',
        warm:
          'border-transparent bg-[var(--color-accent-warm)] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
