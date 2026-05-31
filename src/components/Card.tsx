import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Padding scale. Defaults to `md` (16px). */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Adds a press feel + hover lift. Use for tap-targets like list rows. */
  interactive?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', interactive = false, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-surface rounded-2xl',
          paddingClasses[padding],
          interactive && 'cursor-pointer transition-all hover:bg-white/[0.07] active:scale-[0.98]',
          className,
        )}
        {...rest}
      />
    )
  },
)
Card.displayName = 'Card'
