import { SectionHeader } from './SectionHeader'

interface Swatch {
  name: string
  value: string
  cssVar: string
}

const brand: Swatch[] = [
  { name: 'leaf', value: '#546B41', cssVar: '--color-leaf' },
  { name: 'leaf-deep', value: '#3F5230', cssVar: '--color-leaf-deep' },
]
const accent: Swatch[] = [
  { name: 'sun', value: '#FF8C42', cssVar: '--color-sun' },
  { name: 'sun-deep', value: '#E56B3A', cssVar: '--color-sun-deep' },
]
const ink: Swatch[] = [
  { name: 'ink', value: '#000000', cssVar: '--color-ink' },
  { name: 'ink-soft', value: '#0A0A0A', cssVar: '--color-ink-soft' },
]
const semantic: Swatch[] = [
  { name: 'ok', value: '#30D158', cssVar: '--color-ok' },
  { name: 'warn', value: '#FFB547', cssVar: '--color-warn' },
  { name: 'danger', value: '#FF453A', cssVar: '--color-danger' },
]
const glass: Swatch[] = [
  { name: 'glass-fill', value: 'rgba(255,255,255,0.04)', cssVar: '--color-glass-fill' },
  { name: 'glass-border', value: 'rgba(255,255,255,0.10)', cssVar: '--color-glass-border' },
]

const radii = [
  { name: 'sm', px: 8 },
  { name: 'md', px: 12 },
  { name: 'lg', px: 16 },
  { name: 'xl', px: 24 },
  { name: '2xl', px: 32 },
  { name: '3xl', px: 48 },
]

const shadows = [
  { name: 'card', desc: 'small panels' },
  { name: 'lifted', desc: 'default' },
  { name: 'fab', desc: 'floating buttons' },
  { name: 'glass', desc: 'signature ambient' },
]

export function TokensSection() {
  return (
    <section id="tokens" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="01 · Tokens"
        title="The foundation"
        description="Every visual decision compiles down to these tokens. No hex codes in component code — everything routes through CSS variables."
      />

      <Row title="Brand">
        {brand.map((s) => (
          <Swatch key={s.name} swatch={s} />
        ))}
      </Row>

      <Row title="Accent (secondary)">
        {accent.map((s) => (
          <Swatch key={s.name} swatch={s} />
        ))}
      </Row>

      <Row title="Ink">
        {ink.map((s) => (
          <Swatch key={s.name} swatch={s} />
        ))}
      </Row>

      <Row title="Glass">
        {glass.map((s) => (
          <Swatch key={s.name} swatch={s} />
        ))}
      </Row>

      <Row title="Semantic">
        {semantic.map((s) => (
          <Swatch key={s.name} swatch={s} />
        ))}
      </Row>

      <Row title="Radius">
        {radii.map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 bg-white/10 border border-white/15"
              style={{ borderRadius: `${r.px}px` }}
            />
            <code className="text-xs text-white/70">--radius-{r.name}</code>
            <code className="text-[0.625rem] font-mono text-white/40">{r.px}px</code>
          </div>
        ))}
      </Row>

      <Row title="Shadow">
        {shadows.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 bg-white/10 rounded-2xl"
              style={{ boxShadow: `var(--shadow-${s.name})` }}
            />
            <div className="text-center">
              <code className="text-xs text-white/70 block">--shadow-{s.name}</code>
              <span className="text-[0.625rem] text-white/40">{s.desc}</span>
            </div>
          </div>
        ))}
      </Row>

      <Row title="Type scale">
        <div className="space-y-4 w-full">
          <TypeRow label="Display (Tiempos serif, 700)" className="text-5xl font-bold">
            Tokyo Summer Trip
          </TypeRow>
          <TypeRow label="H1" className="text-3xl font-bold">
            Event details
          </TypeRow>
          <TypeRow label="H2" className="text-2xl font-bold">
            Friends
          </TypeRow>
          <TypeRow label="H3" className="text-xl font-bold">
            Section heading
          </TypeRow>
          <TypeRow label="Body (sans)" className="text-base">
            People you've shared memories with
          </TypeRow>
          <TypeRow label="Small (sans)" className="text-sm text-white/70">
            Most recent shared event
          </TypeRow>
          <TypeRow label="Caption (sans, tracked)" className="text-xs tracking-wide text-white/50">
            JOINED MAR 14, 2026
          </TypeRow>
        </div>
      </Row>
    </section>
  )
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </div>
  )
}

function Swatch({ swatch }: { swatch: Swatch }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-2xl border border-white/10"
        style={{ background: swatch.value }}
      />
      <code className="text-xs text-white/70">{swatch.name}</code>
      <code className="text-[0.625rem] font-mono text-white/40">{swatch.value}</code>
    </div>
  )
}

function TypeRow({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-3">
      <div className={className}>{children}</div>
      <code className="text-[0.625rem] font-mono text-white/30 shrink-0">{label}</code>
    </div>
  )
}
