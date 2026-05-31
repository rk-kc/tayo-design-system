import { type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Avatar } from './Avatar'
import { Badge, type BadgeTone } from './Badge'
import { Stat } from './Stat'
import { BottomSheet } from './BottomSheet'

export interface UserStat {
  icon: ReactNode
  value: number | string
  label: string
}

interface UserDetailSheetProps {
  open: boolean
  onClose: () => void
  displayName: string
  avatarUrl: string | null
  /** Small icon + text shown under the name (e.g., "Joined Mar 14, 2026"). */
  subtitle?: { icon: ReactNode; text: string }
  /** Pill badge above the subtitle (e.g., "Event creator"). */
  badge?: { label: string; tone: BadgeTone }
  stats: UserStat[]
}

// Composition: BottomSheet + Avatar + Badge + Stats. The radial sun-glow
// behind the avatar is the visual signature that ties profile detail views
// to the QR ticket aesthetic across the app.
export function UserDetailSheet({
  open,
  onClose,
  displayName,
  avatarUrl,
  subtitle,
  badge,
  stats,
}: UserDetailSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-10 bg-white/10 border border-white/15 backdrop-blur-md text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      <div
        className="absolute inset-x-0 top-0 h-72 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(255,140,66,0.30) 0%, rgba(255,140,66,0.05) 35%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center text-center pt-6 px-2">
        <Avatar name={displayName} src={avatarUrl} size="xl" glow />

        <h2 className="text-2xl font-bold mt-6 mb-1">{displayName}</h2>

        {badge && (
          <Badge tone={badge.tone} className="mb-2">
            {badge.label}
          </Badge>
        )}

        {subtitle && (
          <p className="text-xs text-white/55 mb-8 flex items-center gap-1.5 font-ui">
            <span className="text-sun shrink-0">{subtitle.icon}</span>
            {subtitle.text}
          </p>
        )}
        {!subtitle && <div className="mb-8" />}

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {stats.map((s, i) => (
            <Stat key={i} icon={s.icon} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}
