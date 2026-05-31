import { Image as ImageIcon, Users, Sparkles } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { Card } from '@/components/Card'
import { Avatar } from '@/components/Avatar'

// These are composition-level patterns built from the primitives. They show
// the system's voice: where to put names, dates, numbers, and how the
// glass surfaces stack visually.
export function PatternsSection() {
  return (
    <section id="patterns" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="04 · Patterns"
        title="Compositions"
        description="How the primitives combine into the real surfaces shipping in the app."
      />

      <Pattern title="Friend row">
        <Card interactive className="max-w-md">
          <div className="flex items-center gap-4">
            <Avatar name="Yuki Tanaka" src="https://i.pravatar.cc/150?u=yuki" size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold truncate mb-0.5">Yuki Tanaka</h3>
              <p className="text-xs text-white/50 truncate">
                Recent: Tokyo Summer Trip
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>132</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>4</span>
              </div>
            </div>
          </div>
        </Card>
      </Pattern>

      <Pattern title="Event card">
        <Card padding="none" className="max-w-sm overflow-hidden">
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), linear-gradient(135deg, #FF8C42 0%, #E56B3A 100%)',
            }}
          >
            <div className="h-full flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold mb-0.5">Tokyo Summer Trip</h3>
              <p className="text-xs text-white/80">Jun 14 – 18, 2026</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>132 photos</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Users className="w-3.5 h-3.5" />
              <span>4 members</span>
            </div>
          </div>
        </Card>
      </Pattern>

      <Pattern title="Hero with sun-glow avatar">
        <Card className="max-w-md text-center py-10 relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-72 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 60%, rgba(255,140,66,0.30) 0%, rgba(255,140,66,0.05) 35%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <Avatar
              name="Yuki Tanaka"
              src="https://i.pravatar.cc/150?u=yuki"
              size="xl"
              glow
              className="inline-block"
            />
            <h2 className="text-2xl font-bold mt-6 mb-2">Yuki Tanaka</h2>
            <p className="text-xs text-white/55 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sun" />
              Recently shared: Tokyo Summer Trip
            </p>
          </div>
        </Card>
      </Pattern>
    </section>
  )
}

function Pattern({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}
