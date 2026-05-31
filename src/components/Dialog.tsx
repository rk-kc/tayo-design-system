import { useEffect, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Optional dismiss-on-backdrop guard (e.g., disabled during an in-flight action). */
  dismissable?: boolean
  /** Tailwind class for max width. Defaults to `max-w-md`. */
  maxWidthClass?: string
  /** Render the X button in the top-right. Off by default for dialogs with their own header. */
  showCloseButton?: boolean
}

const EXIT_DURATION_MS = 200

// Center-positioned modal for confirmations + short forms. Use BottomSheet
// for navigational sheets and detail views — this is for explicit dialogs
// like delete confirmations.
export function Dialog({
  open,
  onClose,
  children,
  dismissable = true,
  maxWidthClass = 'max-w-md',
  showCloseButton = false,
}: DialogProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setVisible(false)
  }, [open])

  useEffect(() => {
    if (!open || !dismissable) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dismissable])

  const handleDismiss = () => {
    if (!visible || !dismissable) return
    setVisible(false)
    window.setTimeout(onClose, EXIT_DURATION_MS)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-[50] flex items-end md:items-center justify-center p-4 transition-opacity',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
    >
      {/* When `dismissable` is false (e.g., during an in-flight action) the
          backdrop becomes a non-interactive div so clicks are ignored. */}
      {dismissable ? (
        <button
          type="button"
          aria-label="Close"
          onClick={handleDismiss}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
        />
      ) : (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      )}
      <div
        className={cn(
          'relative w-full glass-surface bg-ink/85 rounded-3xl shadow-lifted overflow-hidden transition-transform',
          maxWidthClass,
          visible ? 'scale-100' : 'scale-95',
        )}
        style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
      >
        {showCloseButton && dismissable && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 bg-white/10 border border-white/15 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
