import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  /** Fixed position by default. Set false if you want to place it manually. */
  fixed?: boolean
}

// The orange-on-black floating action button. Single most prominent UI
// element on event screens. Fixed to bottom-right above the tab bar.
export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ icon, label, fixed = true, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          'bg-leaf text-white w-14 h-14 rounded-full flex items-center justify-center shadow-fab hover:bg-leaf-deep active:scale-95 hover:scale-105 transition-all',
          fixed && 'fixed bottom-28 right-6 z-[20]',
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    )
  },
)
Fab.displayName = 'Fab'
