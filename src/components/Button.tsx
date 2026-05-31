import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// All buttons share the same press feel: tiny scale-down + opacity dim on
// disabled. `text-sm font-medium` keeps button labels readable without
// borrowing heading weights — same Tiempos serif as the rest of the app.
const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'

// `text-white` on leaf (not text-black like the orange one had) because
// #546B41 is dark enough that black text drops well below contrast minimums.
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-leaf text-white shadow-lifted hover:bg-leaf-deep',
  secondary: 'glass-surface text-white hover:bg-white/[0.08]',
  danger: 'bg-danger text-white shadow-lifted hover:opacity-90',
  ghost: 'text-white/70 hover:text-white hover:bg-white/[0.05]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3',
  md: 'h-12 px-5',
  lg: 'h-14 px-6 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', leftIcon, rightIcon, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    )
  },
)
Button.displayName = 'Button'
