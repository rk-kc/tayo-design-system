# Tayo Design System — Specification

Source of truth for tokens, type scale, components, effects, and motion. The live preview app (`npm run dev`) is the visual companion to this doc.

---

## 1. What's in the system

| Layer | Approach |
|---|---|
| Color | Dual palette — `leaf` (moss green) as brand primary + `sun` (warm orange) as secondary accent, on ink-black. Semantic ok/warn/danger. No light mode in v1. |
| Typography | Tiempos Text serif for headings + body, Inter for dense UI (numbers, captions, buttons), mono for tokens |
| Surface | One card style: `.glass-surface` — frosted white over ink with a soft border and ambient shadow |
| Layout | Mobile-first (393×852). Desktop wraps the app in a 560px centered frame via `AppFrame` |
| Motion | Bottom sheets slide up with `--ease-out-expo`. Confirmations fade-scale in `200ms`. |
| Dark mode | Single-mode dark. No theme toggle. |

---

## 2. Color tokens

All tokens live as CSS variables on `:root` and are exposed to Tailwind 4 via `@theme` in `tokens.css`. Use either Tailwind utilities (`bg-leaf`, `bg-sun`) or `var(--color-leaf)` directly.

### Brand primary — `leaf`

| Token | Value | Use |
|---|---|---|
| `--color-leaf` | `#546B41` | Primary CTA, FABs, focus rings, tab active state, app logo dot, anything that says "the app's identity" |
| `--color-leaf-deep` | `#3F5230` | Pressed/hover state for leaf-filled buttons |

Pair with `text-white` — `leaf` is dark enough that black text drops below contrast minimums.

### Secondary accent — `sun`

| Token | Value | Use |
|---|---|---|
| `--color-sun` | `#FF8C42` | Decorative warmth, ambient halos, sparkles, "recent" markers, stat tile icons |
| `--color-sun-deep` | `#E56B3A` | Pressed/hover state for sun-filled buttons (use sparingly — `sun` is not for primary CTAs) |

### When to use which

| Use | Color | Why |
|---|---|---|
| Primary CTA ("Save", "Create event") | **leaf** | Brand identity reads as the obvious action |
| FAB (camera, "new") | **leaf** | Same — the app's most-pressed button |
| Focus ring on inputs | **leaf** | Signals "this is interactive" without competing with content |
| App logo dot, section eyebrows | **leaf** | Brand voice |
| "Event creator" badge | **leaf** | A creator IS the brand-special role |
| Ambient orbs (desktop frame canvas), shadow-glass halo | **sun** | Warm decorative atmosphere, not interactive |
| Sparkles icon ("Recently shared") | **sun** | Highlight motif — readers parse the warm glow as flair |
| Stat tile icon colors | **sun** | Numerical accents — sun pops against the white numerals |
| ActionSheet leading icons | **sun** | Categorical decoration, not the action surface itself |
| "Live" / "New" badges (status) | **sun** | "Notice this" without saying "click this" |

**Rule of thumb:** **leaf says *do this*. sun says *look at this*.** If you reach for sun on a CTA, switch to leaf. If you reach for leaf on a sparkle, switch to sun.

### Ink (base surfaces)

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#000000` | Page background everywhere |
| `--color-ink-soft` | `#0A0A0A` | Slightly lifted surface inside dark contexts |

### Glass

The default card style is defined by these two tokens (consumed by `.glass-surface`):

| Token | Value | Use |
|---|---|---|
| `--color-glass-fill` | `rgba(255,255,255,0.04)` | Frosted card fill |
| `--color-glass-border` | `rgba(255,255,255,0.10)` | Soft separator + outline |

### Semantic

| Token | Value | Use |
|---|---|---|
| `--color-ok` | `#30D158` | Success states, "Saved", "Live" badges |
| `--color-warn` | `#FFB547` | Caution states, soft warnings |
| `--color-danger` | `#FF453A` | Destructive actions (Delete), error messages |

### When to use which color

| Surface | Color | Why |
|---|---|---|
| Primary CTA ("Save", "Create event") | `sun` filled | Maximum signal |
| Secondary action ("Cancel", "Skip") | `glass-surface` text | Available but quiet |
| Destructive action ("Delete album") | `danger` filled | Match severity |
| Brand atmosphere (ambient orbs, glows) | `sun` at very low opacity | Identity without noise |
| Status badges | `ok` / `warn` / `danger` at 15% bg + border | Recognizable at a glance |

---

## 3. Typography

| Family | Family stack | Use |
|---|---|---|
| `--font-sans` / `--font-display` | Tiempos Text, Georgia, serif | Headings (h1–h4), body, dialog titles |
| `--font-ui` | Inter, system-ui, sans-serif | Buttons, captions, numbers, table rows, anything dense |
| `--font-mono` | ui-monospace, SFMono-Regular | Tokens, codes, the QR token in share view |

### Scale

The system uses Tailwind's default scale; the only constants worth memorizing:

| Role | Class | Notes |
|---|---|---|
| Display (hero) | `text-5xl font-bold` | Onboarding screens, marketing-style headers |
| H1 | `text-3xl font-bold` | Top of standalone pages |
| H2 | `text-2xl font-bold` | Dialog titles, detail headings |
| H3 | `text-xl font-bold` | Section headings inside cards |
| H4 | `text-lg font-bold` | Sub-sections |
| Body | `text-base` | Default paragraph |
| Small | `text-sm` (in `font-ui`) | Helper text, supporting content |
| Caption | `text-xs tracking-wide` (in `font-ui`) | Metadata: dates, counts, "JOINED" labels |
| Micro | `text-[0.625rem]` (in `font-ui`) | Tile labels under stat numbers |

**Why two families?** The serif gives the product warmth — it doesn't feel like a generic SaaS dashboard. But serifs in form controls look antique and tabular numbers in serif read poorly. So Inter handles UI density wherever the serif gets in the way.

---

## 4. Radius scale

| Token | Px | Use |
|---|---|---|
| `--radius-sm` | 8px | Tags, very small chips |
| `--radius-md` | 12px | Buttons, inputs, small cards |
| `--radius-lg` | 16px | Larger cards, lists |
| `--radius-xl` | 24px | Card stacks, hero containers |
| `--radius-2xl` | 32px | Bottom sheets (top corners), dialogs |
| `--radius-3xl` | 48px | The desktop app frame |

---

## 5. Shadows

Four shadows, ordered by elevation:

| Token | Use | Why |
|---|---|---|
| `--shadow-card` | Small inline panels | Light depth, doesn't fight content |
| `--shadow-lifted` | Default for prominent cards | Confident drop without being heavy |
| `--shadow-fab` | Floating action buttons | Reads as floating above the canvas |
| `--shadow-glass` | Signature ambient | Diffuse drop + 4-color stack + warm sun halo. The "floating glass" feel. |

The `--shadow-glass` is the secret sauce — it gives surfaces a soft warm `sun`-toned aura. This is one of the deliberate places the secondary accent reinforces the brand atmosphere even though `leaf` is the primary brand color:

```
0 20px 50px -20px rgba(0,0,0,0.55),   /* deep drop */
0 4px 16px  -6px rgba(0,0,0,0.35),    /* crisp lift */
0 0 30px   -10px rgba(255,140,66,0.12) /* sun glow */
```

---

## 6. Spacing (semantic)

Most spacing uses Tailwind's default `4px` step. These named tokens cover the cases where naming-by-purpose helps:

| Token | Px | Use |
|---|---|---|
| `--spacing-page-x` | 16px | Default horizontal page gutter |
| `--spacing-page-x-lg` | 24px | Wider gutter for hero/feature screens |
| `--spacing-screen-y` | 56px | Top safe area on hero screens (account for status bar feel) |
| `--spacing-bottom-tab` | 96px | `pb-24` clearance so list content isn't hidden under the tab bar |

---

## 7. Motion

Two reusable easing curves, picked deliberately:

| Token | Curve | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.22, 1, 0.36, 1)` | Sheet enter, anything that should "settle" |
| `--ease-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | Quick acknowledgements, button presses, fade-outs |

Durations:

| Token | ms | Use |
|---|---|---|
| `--duration-sheet-in` | 360 | Bottom sheet enter |
| `--duration-sheet-out` | 280 | Bottom sheet exit (shorter than enter — close feels lighter) |
| `--duration-fade` | 200 | Backdrops, fade transitions |

**Animation principles:**

- **Sheets enter slower than they leave.** Open feels deliberate; close feels effortless. Asymmetric durations make the difference.
- **Press feedback is scale, not color.** `active:scale-[0.98]` on every interactive surface. Color states are reserved for hover.
- **Never animate height on text content.** It causes layout shift and the user loses their place. Animate transform/opacity only.

---

## 8. Surfaces

The system has one signature card style. Everything else inherits from it.

### `.glass-surface`

```css
background-color: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.10);
backdrop-filter: blur(60px);
box-shadow: <shadow-glass>;
```

**Composes with:**

- `rounded-2xl` — most cards
- `rounded-3xl` — sheets, dialogs
- `rounded-full` — pill buttons, badges
- `bg-ink/80` — dialogs that need a more opaque base than the default 4% white

### `.sun-glow`

Wraps an element in a soft orange radial halo. Use sparingly — best for hero avatars, large icons, or the first thing on a screen.

### `.ambient-orb`

Two of these positioned outside the desktop frame give the app a warm "lit room" feeling. Visible at `md+` only.

---

## 9. Components

| Component | Purpose | Notes |
|---|---|---|
| `Button` | All clickable primary/secondary/danger/ghost actions | 4 variants × 3 sizes. Use `primary` only once per screen. |
| `Card` | Default content container | Use `interactive` for tappable list rows |
| `Avatar` | User identity | Falls back to initial. `glow` for hero placements. |
| `Badge` | Status, role, classification chip | `leaf`, `sun`, `neutral`, `danger`, `ok` tones |
| `Stat` | Number + label tile | Use inside dialogs, detail sheets |
| `Input` | Text input | 3 sizes (`sm` h-9 / `md` h-12 / `lg` h-14) that line up 1:1 with Button sizes |
| `Fab` | Floating action button | One per screen; fixed bottom-right above the tab bar |
| `Skeleton` | Loading placeholder | Pulses opacity, not shimmer. Less noisy on dark. |
| `BottomSheet` | Slide-up overlay primitive | The signature Tayo motion |
| `Dialog` | Centered confirmation modal | Use for destructive confirmations only |
| `ActionSheet` | Slide-up menu of 2–4 options | Built on `BottomSheet` |
| `UserDetailSheet` | Profile detail sheet | Built on `BottomSheet`. Used for friends + members. |
| `AppFrame` | Desktop chrome that wraps the app | Phone-style frame at md+. Does nothing on mobile. |

See the showcase (`npm run dev`) for live examples of every component.

---

## 10. Z-index scale

Defined as tokens because mixing arbitrary `z-50`s leads to fighting overlays:

| Token | Value | Use |
|---|---|---|
| `--z-fab` | 20 | Floating action buttons |
| `--z-tab-bar` | 30 | Sticky bottom tab bar |
| `--z-modal` | 50 | All overlay modals (sheets, dialogs) |
| `--z-toast` | 60 | Toast notifications (reserved; not yet built) |

---

## 11. Layout — the desktop frame

On phones, the app fills the viewport. On `md+` (≥768px), `AppFrame` wraps the entire app in a **560px-wide centered glass column**:

- Rounded corners, soft border, ambient shadow
- Two warm sun-orange orbs float in the outer canvas behind it
- `[transform:translateZ(0)]` is the trick — it creates a CSS containing block so `position: fixed` descendants (tab bars, FABs) scope to the frame instead of the viewport
- Internal scroll on the wrapper means the tab bar stays put as content scrolls

This makes the app feel intentional on a desktop without faking a phone bezel.

---

## 12. Accessibility checklist

The system aims for WCAG 2.1 AA. The biggest things to remember:

- **Touch targets ≥ 44×44.** Buttons default to `h-12` (48px). Smaller interactive elements (`h-9`) should have padding that brings the hit area to 44.
- **Color contrast.** White-on-ink is fine. White-on-glass (4% fill) needs subjective testing — always pair semi-transparent fills with adequate opacity on the text (typically `text-white/80` minimum for body).
- **Focus rings.** Always preserve `:focus-visible` outlines. Inputs use `focus:ring-2 focus:ring-sun`.
- **Labels.** Every icon-only button gets `aria-label`. Every dialog gets `role="dialog" aria-modal="true"` + a labelled title.
- **Motion reduce.** Respect `prefers-reduced-motion` for non-essential animations (TODO — not yet implemented).

---

## 13. What's NOT in v1

To keep the system tight, the following are deliberately deferred:

- **Light mode** — Tayo is single-mode dark.
- **Theme toggle / multi-brand** — one brand color (`sun`), one ink.
- **Tooltips, popovers** — not needed for the current product surface.
- **Toast component** — z-index reserved (`--z-toast`), but not built yet.
- **Data table** — Tayo is photo-first, no tabular data UIs in v1.
- **Form library / validation primitives** — only basic `Input`; no `Field`, `Label`, `FieldError` yet.
- **Animation library** — pure CSS keyframes, no Framer Motion / Spring. Add only if a future pattern actually needs it.

---

## 14. File layout summary

```
design-system/
├── README.md                ← quickstart + integration guide
├── DESIGN_SYSTEM.md         ← this file
├── package.json
├── vite.config.ts
├── tsconfig.json + tsconfig.app.json
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx              ← live preview entry
    ├── lib/
    │   └── cn.ts            ← clsx + tailwind-merge helper
    ├── styles/
    │   ├── tokens.css       ← @theme block + :root variables
    │   └── effects.css      ← .glass-surface, .sun-glow, animations
    ├── components/
    │   ├── index.ts         ← barrel exports
    │   ├── Avatar.tsx
    │   ├── Badge.tsx
    │   ├── BottomSheet.tsx
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── Dialog.tsx
    │   ├── Fab.tsx
    │   ├── Input.tsx
    │   ├── Skeleton.tsx
    │   ├── Stat.tsx
    │   ├── ActionSheet.tsx
    │   ├── UserDetailSheet.tsx
    │   └── AppFrame.tsx
    └── showcase/
        ├── SectionHeader.tsx
        ├── Tokens.tsx
        ├── Primitives.tsx
        ├── Overlays.tsx
        └── Patterns.tsx
```

---

## 15. Versioning

`0.1` — initial extraction from the live Tayo app (May 2026). Reflects what's actually shipping: glass-surface cards, slide-up sheets, sun-orange accents, desktop frame, camera capture, QR ticket, friend/member detail sheets.

Future bumps when:

- Net-new components are added (toast, form field, popover)
- Token values change (e.g., the sun color tweaks)
- A migration is required for consumers

Patch releases for documentation / non-breaking polish.
