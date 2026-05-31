import { type ReactNode } from 'react'

interface AppFrameProps {
  children: ReactNode
}

// The desktop chrome that wraps the whole app at md+ widths. On phones
// it does nothing — full-width, body scrolls. On md+ it becomes a 560px
// centered glass column with ambient orbs in the canvas behind it.
//
// The `[transform:translateZ(0)]` is intentional: it creates a containing
// block so `position: fixed` descendants (tab bars, FABs) scope to the
// frame instead of the viewport.
export function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans md:flex md:justify-center overflow-hidden">
      <div className="hidden md:block ambient-orb ambient-orb-sun -top-40 -left-32" aria-hidden="true" />
      <div className="hidden md:block ambient-orb ambient-orb-deep -bottom-48 -right-32" aria-hidden="true" />

      <div
        className="
          relative w-full bg-ink min-h-screen
          md:h-[calc(100vh-3rem)] md:min-h-0
          md:my-6 md:max-w-[560px]
          md:bg-white/[0.03] md:backdrop-blur-2xl
          md:rounded-3xl
          md:border md:border-white/10
          md:shadow-glass
          md:overflow-y-auto md:overflow-x-hidden
          md:no-scrollbar
          md:[transform:translateZ(0)]
        "
      >
        {children}
      </div>
    </div>
  )
}
