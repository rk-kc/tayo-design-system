import { cn } from '../lib/cn'
import type { ReactNode } from 'react'

interface StatProps {
  icon: ReactNode
  value: number | string
  label: string
  className?: string
}

// The small glass tile used inside dialogs and detail sheets to show a
// number with a labeled icon. `min-w` keeps stacks of stats balanced.
export function Stat({ icon, value, label, className }: StatProps) {
  const display = typeof value === 'number' ? value.toLocaleString() : value
  return (
    <div
      className={cn(
        'glass-surface rounded-2xl px-4 py-3 flex flex-col items-center min-w-[112px]',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-sun mb-0.5">
        {icon}
        <span className="text-base font-bold text-white">{display}</span>
      </div>
      <span className="text-[0.625rem] text-white/50 tracking-wide">{label}</span>
    </div>
  )
}
