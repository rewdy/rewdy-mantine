# AGENTS.md

Guidance for working in this repo. It is the published theme package, extracted
from the `rewdy-project-mantine` showcase app; there is no application here.

## What this is

`@rewdy/mantine` — a Mantine 9 theme. Full-bleed tint bands instead of floating
cards, a teal-tinted neutral doing the structural work, and flat, square surfaces
everywhere. The full spec, including the measured values it came from and a
decisions log, is in `docs/design-system.md`. **Read it before changing anything
visual.** The palette, type scale and shape language are deliberate.

## Commands

```bash
pnpm typecheck      # tsc over src, test and the config files
pnpm lint           # oxlint
pnpm format         # oxfmt (writes); format:check for CI
pnpm test           # vitest
pnpm build          # vite build -> dist/
```

Run all five before calling a change done. `prepublishOnly` runs the build, so a
stale `dist/` can never be published.

## There is no app here

This matters more than it sounds. The theme's real behaviour is only visible in a
running app — several bugs in this system's history were rules that read
correctly and lost a CSS specificity contest, which you cannot see by reasoning
about the source. **Verify visual changes in a consuming app** (the
`rewdy-project-mantine` harness is one) with a computed-style check or a
screenshot, not by reading the CSS.

`test/` covers the theme contract — palettes, the resolver's variables, which
variants produce which markup. It cannot tell you whether something *looks*
right.

## The consumer contract

Consumers do exactly two things:

```tsx
import "@rewdy/mantine/styles.css";
import { RewdyProvider } from "@rewdy/mantine";
```

`styles.css` is the whole stylesheet: Mantine's own CSS via `@import`, then the
theme's globals, then the component CSS. `fonts.css` (Karla and Archivo,
self-hosted via Fontsource) is separate and optional. Everything else is the
`exports` map in `package.json`; keep it in sync with `files` and with what the
build actually emits.

## Build shape

- ESM only, to `dist/index.js`, with React and Mantine external.
- Declarations are emitted per-file by `vite-plugin-dts`, not rolled up.
  `dist/index.d.ts` re-exports from the rest of the `dist/` tree, so the two have
  to stay consistent: if you ever switch to a single bundled JS file, you must
  also roll the declarations up, or the types will point at files that don't
  exist.
- Component CSS is merged into `dist/styles.css` by the `stylesheets()` plugin in
  `vite.config.ts`.

## Gotchas that cost real time

The Mantine-specific ones are in `docs/design-system.md` under "Gotchas worth
remembering". These are specific to this package:

**Do not inject CSS from the JavaScript.** Vite's lib mode extracts CSS modules
into their own asset and drops the import from the JS. The tempting fix is to
re-attach `import "./…css"` (e.g. `vite-plugin-lib-inject-css`), and it does
work in a bundler — but it makes the package unimportable in plain Node, so SSR
and scripts break. The plugin here folds the component CSS into `styles.css`
instead. It is marked `enforce: "post"` because Vite's own CSS plugin emits its
asset during `generateBundle`; drop that and the asset survives unmerged.

**`oxfmt` ignores Markdown on purpose.** Its defaults repad every table and
rewrite `*emphasis*` to `_emphasis_`, which churns prose for no benefit. Don't
remove `ignorePatterns` from `.oxfmrc.json`.

**`oxlint` has an override for `Band` and `Prose`.** `react/only-export-components`
false-positives on components built with `createPolymorphicComponent`, and this
package has no fast refresh to protect anyway.

**Fontsource names the variable families `Karla Variable` / `Archivo Variable`,
not `Karla` / `Archivo`.** The theme's stacks look for the `Variable` names
first, then the plain ones. If you change how fonts are loaded, the stacks have
to agree with the `@font-face` families that actually ship — a mismatch fails
silently, falling through to the system font with no error.

**Mantine 9 throws without a provider**, rather than falling back to a default
theme — so every component test renders through `RewdyProvider`. That is also
what makes the tests meaningful: they exercise the real theme and resolver.

**`createTheme` is typed as returning a deep-partial override**, not a
`MantineTheme`. That is why `test/theme.test.ts` widens it with a cast before
handing it to the resolver.

## Decisions already made — don't relitigate

Each has a rationale in `docs/design-system.md`: square and flat everywhere (no
radius, no shadow, not even at the scale level); three textures that share one
teal hue but keep separate ink weights; `deep` bands as dark-scheme islands;
selection from the `success` family; the hero violet as an opt-in `c="violet"`
rather than a theme default; the button lean scoped to filled buttons and gated
on `prefers-reduced-motion`; `Swipe` deliberately unskewed.

If you think one is wrong, say so — but the burden is on a concrete visual
problem, not on a preference.

## Conventions

Double quotes, semicolons, trailing commas, 100-char lines (enforced by
`oxfmt`). Named exports throughout. Comments explain *why*, especially where a
workaround exists. Project docs belong in `./docs`.