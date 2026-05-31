import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

interface CalendarProps {
  /** Currently selected date. Pass `null` for no selection. */
  value?: Date | null
  /** Fired when the user picks a date. The chosen date has time stripped to local midnight. */
  onChange: (date: Date) => void
  /** Earliest selectable date (inclusive). Days before are dimmed and inert. */
  minDate?: Date
  /** Latest selectable date (inclusive). Days after are dimmed and inert. */
  maxDate?: Date
  /** Wrap the grid in a glass-surface card. Defaults to true. Set false
   *  when placing the calendar inside another surface (BottomSheet, Card). */
  surface?: boolean
  className?: string
}

// Sunday-first week. Switch the array if/when we add locale support.
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// A glass-themed month grid. Compose inside a sheet, dialog, or directly
// in a form. Owns its own "viewed month" state — selection is controlled.
export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  surface = true,
  className,
}: CalendarProps) {
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const seed = value ?? new Date()
    return new Date(seed.getFullYear(), seed.getMonth(), 1)
  })

  const today = useMemo(() => stripTime(new Date()), [])
  const minDay = minDate ? stripTime(minDate) : null
  const maxDay = maxDate ? stripTime(maxDate) : null
  const days = useMemo(() => buildMonthGrid(viewMonth), [viewMonth])

  const goPrev = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
  const goNext = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))

  return (
    <div className={cn(surface && 'glass-surface rounded-2xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous month"
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.05] active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-medium text-white">
          {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.05] active:scale-95 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div
            key={i}
            className="text-center text-[0.625rem] uppercase tracking-wide text-white/40 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === viewMonth.getMonth()
          const isSelected = value ? isSameDay(day, value) : false
          const isToday = isSameDay(day, today)
          const isDisabled =
            (minDay !== null && day < minDay) || (maxDay !== null && day > maxDay)

          return (
            <button
              key={day.getTime()}
              type="button"
              onClick={() => {
                if (isDisabled) return
                onChange(day)
              }}
              disabled={isDisabled}
              aria-label={day.toDateString()}
              aria-pressed={isSelected}
              className={cn(
                'h-10 rounded-lg text-sm transition-colors',
                isSelected
                  ? 'bg-leaf text-white font-medium shadow-lifted'
                  : inMonth
                  ? 'text-white/85 hover:bg-white/[0.06]'
                  : 'text-white/25 hover:bg-white/[0.04]',
                isToday && !isSelected && 'ring-1 ring-sun/60',
                isDisabled && 'opacity-30 cursor-not-allowed hover:bg-transparent',
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Build a 6-row × 7-col grid (42 cells) starting from the Sunday on or
// before the first of the viewed month. Always 6 rows so the grid height
// stays constant when navigating months.
function buildMonthGrid(viewMonth: Date): Date[] {
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
  const startOffset = firstOfMonth.getDay()
  const start = new Date(firstOfMonth)
  start.setDate(start.getDate() - startOffset)

  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
