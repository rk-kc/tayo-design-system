# Tayo Design System

A portable component kit for the Tayo product surface. Token-driven, dark-first, mobile-first. React 18 + Tailwind 4 + TypeScript strict.

## Quickstart

```bash
npm install
npm run dev
```

Open the dev server URL. You're looking at the live spec — every token, primitive, overlay, and pattern on one scrollable page.

## What's in here

```
src/
  styles/
    tokens.css       — colors, fonts, radius, shadows, spacing, motion (via Tailwind @theme)
    effects.css      — .glass-surface, .sun-glow, .ambient-orb, sheet animations
  lib/
    cn.ts            — clsx + tailwind-merge
  components/        — Button, Card, Avatar, Badge, Stat, Input, Fab, Skeleton,
                       BottomSheet, Dialog, UserDetailSheet, ActionSheet, AppFrame
  showcase/          — sections rendered on the live preview page
```

## Using it in another app

### Recommended: install via git URL

```bash
npm install github:rk-kc/tayo-design-system#main
```

Then import in your app:

```ts
// main.tsx — once
import 'tayo-design-system/styles/tokens.css'
import 'tayo-design-system/styles/effects.css'

// anywhere
import { Button, Card, BottomSheet } from 'tayo-design-system'
```

The consumer needs to be on **Tailwind 4** so `@theme` block in `tokens.css` generates utilities like `bg-leaf`, `text-sun`, etc. Vite handles TS transpilation of the source files automatically.

Peer deps the consumer must have installed:

```
clsx, tailwind-merge, lucide-react, react ≥18, react-dom ≥18, tailwindcss ≥4
```

### Alternative: copy-paste

If you don't want a git dependency, copy `src/styles/tokens.css`, `src/styles/effects.css`, and any components from `src/components/` into the target app. Update the `../lib/cn` imports as needed.

## Design principles

- **Two colors with clear roles.** `leaf` (moss green) is the brand — primary CTAs, FABs, focus, identity. `sun` (warm orange) is the secondary accent — ambient warmth, sparkles, "recent" highlights. Leaf says *do this*, sun says *look at this*.
- **Glass as the default surface.** Cards, dialogs, sheets, and inputs all share `.glass-surface`: frosted white over near-black, soft border, ambient shadow. Compose freely — they nest beautifully.
- **Sheets, not popups.** Detail views and menus slide up from the bottom; only confirmations use centered dialogs. The motion is part of the brand.
- **Tokens, not values.** No hex codes in component code — everything routes through CSS variables defined in `tokens.css`.
- **Tiempos serif everywhere.** Headings, body, buttons, inputs — all in the same warm serif. Single voice, distinct personality.
- **Mobile is the default.** Components are designed for 393×852. Desktop wraps the app in a centered 560px frame (see `AppFrame`).

## Cross-platform porting

The tokens are platform-neutral. If you later need a Flutter or React Native app:

- Copy the values from `:root` in `tokens.css` into a per-platform tokens file (Dart `ThemeData`, JS object, etc.).
- Components don't port directly — reimplement using the spec in `DESIGN_SYSTEM.md` and the patterns visible in the showcase.

See `DESIGN_SYSTEM.md` for the full specification.
