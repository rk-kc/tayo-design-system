import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  inputSize?: InputSize
}

// Heights match the Button sizes so an input + button laid out side-by-side
// (e.g., a search bar with a "Join" button) line up without manual tweaks.
const sizeBase: Record<InputSize, string> = {
  sm: 'h-9 text-xs px-3',
  md: 'h-12 text-sm px-4',
  lg: 'h-14 text-base px-5',
}

// When there's a left icon, the left padding has to clear it; per-size
// offsets keep the gap visually consistent.
const sizeWithIcon: Record<InputSize, string> = {
  sm: 'h-9 text-xs pl-8 pr-3',
  md: 'h-12 text-sm pl-11 pr-4',
  lg: 'h-14 text-base pl-12 pr-5',
}

const iconOffset: Record<InputSize, string> = {
  sm: 'left-2.5',
  md: 'left-4',
  lg: 'left-4',
}

const iconSize: Record<InputSize, string> = {
  sm: '[&>*]:w-3.5 [&>*]:h-3.5',
  md: '[&>*]:w-4 [&>*]:h-4',
  lg: '[&>*]:w-5 [&>*]:h-5',
}

// Frosted-glass input that pairs with the rest of the system. Inherits the
// Tiempos serif body font like every other text surface.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, inputSize = 'md', className, ...rest }, ref) => {
    const sharedFocus =
      'glass-surface rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-leaf focus:border-transparent'

    if (leftIcon) {
      return (
        <div className="relative">
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-white/30 pointer-events-none',
              iconOffset[inputSize],
              iconSize[inputSize],
            )}
          >
            {leftIcon}
          </div>
          <input
            ref={ref}
            className={cn('w-full', sharedFocus, sizeWithIcon[inputSize], className)}
            {...rest}
          />
        </div>
      )
    }
    return (
      <input
        ref={ref}
        className={cn('w-full', sharedFocus, sizeBase[inputSize], className)}
        {...rest}
      />
    )
  },
)
Input.displayName = 'Input'
