import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:ring-[var(--color-accent-primary)]',
        destructive:
          'bg-[var(--color-accent-coral)] text-white hover:bg-red-600 focus-visible:ring-[var(--color-accent-coral)]',
        outline:
          'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)] focus-visible:ring-[var(--color-accent-primary)]',
        secondary:
          'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] focus-visible:ring-[var(--color-accent-primary)]',
        ghost:
          'hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)]',
        link: 'text-[var(--color-accent-primary)] underline-offset-4 hover:underline',
        warm:
          'bg-[var(--color-accent-warm)] text-white hover:bg-amber-700 focus-visible:ring-[var(--color-accent-warm)]',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-sm px-4 text-xs',
        lg: 'h-12 rounded-sm px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
