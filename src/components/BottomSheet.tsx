import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Show the small drag-handle pill at the top. Defaults to true. */
  showHandle?: boolean
  /** Tailwind class for max width on desktop. Defaults to `max-w-md`. */
  maxWidthClass?: string
}

const EXIT_DURATION_MS = 280

// The signature Tayo modal pattern. Slides up from the bottom of the
// viewport (or the desktop frame), with a frosted backdrop. Click-outside
// or Escape closes it. Animation is symmetric: open 360ms, close 280ms.
export function BottomSheet({
  open,
  onClose,
  children,
  showHandle = true,
  maxWidthClass = 'max-w-md',
}: BottomSheetProps) {
  // We use a local `visible` flag so we can render an exit animation before
  // the parent unmounts. The flow is: parent sets open=true → mount with
  // visible=false → next frame visible=true (enter animation) →
  // user dismisses → visible=false → after EXIT_DURATION_MS → onClose().
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setVisible(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleDismiss = () => {
    if (!visible) return
    setVisible(false)
    window.setTimeout(onClose, EXIT_DURATION_MS)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-[50] flex items-end justify-center transition-opacity',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
    >
      {/* The backdrop is the click-outside surface. Clicks on the sheet
          content (a sibling element) do not bubble to it, so no extra
          stopPropagation is needed inside the sheet. */}
      <button
        type="button"
        aria-label="Close"
        onClick={handleDismiss}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      <div
        className={cn(
          'relative w-full transform transition-transform',
          maxWidthClass,
          visible ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{
          transitionDuration: 'var(--duration-sheet-in)',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        <div className="glass-surface bg-ink/80 rounded-t-3xl pt-3 pb-10 px-6 relative">
          {showHandle && (
            <div className="flex justify-center mb-2">
              <div className="drag-handle" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
