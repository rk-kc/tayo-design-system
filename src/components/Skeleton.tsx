import { cn } from '../lib/cn'

interface SkeletonProps {
  className?: string
}

// Subtle loading placeholder. Use inside `glass-surface` cards or directly
// in lists. Pulses opacity rather than shimmering — feels less noisy on dark.
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('bg-white/10 rounded-lg skeleton-pulse', className)}
    />
  )
}
