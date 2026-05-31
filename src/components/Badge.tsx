import { cn } from '../lib/cn'
import type { ReactNode } from 'react'

export type BadgeTone = 'leaf' | 'sun' | 'neutral' | 'danger' | 'ok'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

// Pill-shaped chips. `leaf` is the brand-flavored chip (e.g., "Pro",
// "Creator"). `sun` is the warm secondary (e.g., "New", "Recent").
// `neutral` for muted info, `danger` / `ok` for status.
const toneClasses: Record<BadgeTone, string> = {
  // White text on a tinted leaf fill — leaf itself is too dark for legible
  // text on a transparent-over-ink background.
  leaf: 'bg-leaf/30 text-white border border-leaf/45',
  sun: 'bg-sun/15 text-sun border border-sun/30',
  neutral: 'bg-white/5 text-white/70 border border-white/15',
  danger: 'bg-danger/15 text-danger border border-danger/30',
  ok: 'bg-ok/15 text-ok border border-ok/30',
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.625rem] tracking-wide uppercase font-ui font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
