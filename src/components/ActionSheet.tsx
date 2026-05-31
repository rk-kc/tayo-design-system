import { type ReactNode } from 'react'
import { BottomSheet } from './BottomSheet'

export interface ActionSheetOption {
  icon: ReactNode
  title: string
  subtitle?: string
  onSelect: () => void
}

interface ActionSheetProps {
  open: boolean
  onClose: () => void
  options: ActionSheetOption[]
}

// Slide-up menu of 2–4 options. Each option is a full-width glass row
// with an iconified sun-tinted badge, title, and helper text. Use for
// FAB choices, share/menu actions, etc.
export function ActionSheet({ open, onClose, options }: ActionSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} maxWidthClass="max-w-md">
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              opt.onSelect()
              onClose()
            }}
            className="w-full text-left glass-surface rounded-2xl px-4 py-3.5 hover:bg-white/[0.07] transition-colors active:scale-[0.98] flex items-center gap-4"
          >
            <div className="bg-sun/15 text-sun w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{opt.title}</div>
              {opt.subtitle && (
                <div className="text-xs text-white/55 mt-0.5">{opt.subtitle}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}
