import { cn } from '../lib/cn'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Wrap the avatar in a soft sun glow. Use sparingly — typically for hero placements. */
  glow?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-14 h-14 text-base',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-28 h-28 text-3xl',
}

const borderClasses = {
  sm: 'border-2 border-white/20',
  md: 'border-2 border-white/20',
  lg: 'border-2 border-white/30',
  xl: 'border-4 border-white/80',
}

export function Avatar({ src, name, size = 'md', glow = false, className }: AvatarProps) {
  const inner = src ? (
    <img
      src={src}
      alt={name}
      className={cn(
        'rounded-full object-cover relative',
        sizeClasses[size],
        borderClasses[size],
        glow && 'shadow-glass',
      )}
    />
  ) : (
    <div
      aria-label={name}
      className={cn(
        'rounded-full bg-white/10 flex items-center justify-center font-bold text-white relative',
        sizeClasses[size],
        borderClasses[size],
        glow && 'shadow-glass',
      )}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )

  if (!glow) return <div className={className}>{inner}</div>

  return (
    <div className={cn('sun-glow inline-block', className)}>{inner}</div>
  )
}
