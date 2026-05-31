import { TokensSection } from './showcase/Tokens'
import { PrimitivesSection } from './showcase/Primitives'
import { OverlaysSection } from './showcase/Overlays'
import { PatternsSection } from './showcase/Patterns'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <main className="max-w-5xl mx-auto px-6 md:px-10 pb-32">
        <Hero />
        <TokensSection />
        <PrimitivesSection />
        <OverlaysSection />
        <PatternsSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-leaf" />
          <span className="font-bold">Tayo Design System</span>
          <span className="text-xs text-white/40">v0.1</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#tokens" className="hover:text-white transition-colors">Tokens</a>
          <a href="#primitives" className="hover:text-white transition-colors">Primitives</a>
          <a href="#overlays" className="hover:text-white transition-colors">Overlays</a>
          <a href="#patterns" className="hover:text-white transition-colors">Patterns</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-20 text-center relative">
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,140,66,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <p className="text-xs uppercase tracking-widest text-leaf font-medium mb-3">
        A mobile-first component kit
      </p>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
        Moss-green primary, glass surfaces, sun-warm accents.
      </h1>
      <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
        Token-driven, dark-first. Built around a deep leaf-green brand color, a frosted glass
        surface, and warm orange accents that give every screen its identity.
      </p>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-xs text-white/40 text-center">
        See <code className="text-white/60">DESIGN_SYSTEM.md</code> for the full spec.
      </div>
    </footer>
  )
}
