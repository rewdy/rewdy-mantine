# @rewdy/mantine

A [Mantine 9](https://mantine.dev) theme for my personal projects. Full-bleed
tint bands instead of floating cards, a teal-tinted neutral doing the structural
work, and flat, square surfaces everywhere — no radius, no shadow.

The full spec, including the measured values it was derived from and a decisions
log, is in [`docs/design-system.md`](./docs/design-system.md).

## Install

```bash
pnpm add @rewdy/mantine @mantine/core @mantine/hooks react react-dom
```

## Usage

Load the stylesheets once, then wrap the app.

```tsx
import "@rewdy/mantine/fonts.css";
import "@rewdy/mantine/styles.css";

import { RewdyProvider, Band, Prose, Eyebrow } from "@rewdy/mantine";

export function App() {
  return (
    <RewdyProvider defaultColorScheme="auto">
      <Band variant="tint" texture="wave" pad="lg">
        <Eyebrow>Design system</Eyebrow>
        <Prose>
          <h1>Hi, I'm Rewdy.</h1>
        </Prose>
      </Band>
    </RewdyProvider>
  );
}
```

`fonts.css` loads Karla and Archivo, self-hosted via
[Fontsource](https://fontsource.org) — no third-party request at runtime.
Fontsource registers the *variable* builds as `Karla Variable` and
`Archivo Variable`, and the theme's stacks look for those names first, so keep
this import unless you're supplying the same variable fonts yourself.

`styles.css` is the only stylesheet you need: it re-exports Mantine's own CSS via
`@import`, then layers the theme's globals and the component styles on top. Fonts
are kept separate because they're optional.

### What's in the box

- **`RewdyProvider`** — `MantineProvider` preconfigured with the theme and the
  CSS variables resolver.
- **`Band`** — a full-bleed section; `variant` (base/tint/muted/deep) ×
  `texture` (none/wave/dots/hatch) × `pad`. The `deep` variant is a
  dark-scheme island, so nested Mantine components invert with it.
- **`Prose`** — the opt-in 21px editorial type scale, capped at 62ch.
- **`Eyebrow`** — the caps-tracked section kicker.
- **`ArrowLink`** — a link or CTA whose trailing arrow nudges on hover.
- **`Swipe`** — a flat highlight wash for a phrase in display type.

Everything else is plain theme configuration: if you use stock Mantine
components you get the look without opting into anything.

The hero violet is not a theme default. Ask for it per instance:

```tsx
<Title order={1} c="violet">
  Hi, I'm Rewdy.
</Title>
```

## Development

```bash
pnpm install
pnpm typecheck    # tsc, source and tests
pnpm lint         # oxlint
pnpm format       # oxfmt
pnpm test         # vitest
pnpm build        # vite build -> dist/
```

The build emits ESM plus declaration files to `dist/`, with React and Mantine
left external so consumers keep one copy of each. Component CSS is folded into
`dist/styles.css` at build time rather than injected from the JavaScript, which
keeps the package importable outside a bundler — SSR and plain Node included.
