import { useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from './Calendar'
import { BottomSheet } from './BottomSheet'
import { cn } from '../lib/cn'

export type DatePickerSize = 'sm' | 'md' | 'lg'

interface DatePickerProps {
  value?: Date | null
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  /** Matches Input/Button sizes for inline form alignment. */
  size?: DatePickerSize
  disabled?: boolean
  className?: string
  /** Optional title shown above the calendar in the bottom sheet. */
  sheetTitle?: string
  /** Aria label for the trigger button. Falls back to the value or placeholder. */
  ariaLabel?: string
}

// Trigger heights mirror Input so a DatePicker drops into a Field next to
// regular text Inputs without re-aligning anything.
const triggerSizeClasses: Record<DatePickerSize, string> = {
  sm: 'h-9 text-xs px-3',
  md: 'h-12 text-sm px-4',
  lg: 'h-14 text-base px-5',
}

// Input-shaped trigger + BottomSheet + Calendar. Picking a date auto-closes
// the sheet. The trigger displays a short, friendly date (e.g., "Mar 21, 2026")
// or the placeholder when nothing is selected.
export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Select date',
  size = 'md',
  disabled = false,
  className,
  sheetTitle,
  ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const handlePick = (date: Date) => {
    onChange(date)
    setOpen(false)
  }

  const label = value ? formatDate(value) : placeholder

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        aria-label={ariaLabel ?? label}
        aria-haspopup="dialog"
        className={cn(
          'glass-surface rounded-xl text-white w-full flex items-center justify-between gap-2',
          'focus:outline-none focus:ring-2 focus:ring-leaf focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.99] transition-transform',
          triggerSizeClasses[size],
          className,
        )}
      >
        <span className={value ? 'text-white' : 'text-white/30'}>{label}</span>
        <CalendarIcon className="w-4 h-4 text-white/40 shrink-0" />
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        {sheetTitle ? (
          <h3 className="text-base font-medium text-white text-center mb-3">{sheetTitle}</h3>
        ) : null}
        <Calendar
          value={value}
          onChange={handlePick}
          minDate={minDate}
          maxDate={maxDate}
          surface={false}
        />
      </BottomSheet>
    </>
  )
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
