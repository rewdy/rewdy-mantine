import type { CSSVariablesResolver } from "@mantine/core";

import { displayWeight } from "./typography";

/**
 * Emits the band-surface and texture variables the design system runs on, and
 * re-points the handful of Mantine semantic variables that would otherwise
 * resolve to a stock palette.
 *
 * Three things live here rather than in component styles:
 *
 * 1. **Band surfaces** — four tint steps per color scheme, plus the set of
 *    values a `deep` (inverted) band re-binds so nested Mantine surfaces invert
 *    with it. `Band` reads these so the same `variant` prop produces the right
 *    tint in either scheme.
 * 2. **Texture ink** — every texture's stroke color is a variable. This is
 *    load-bearing: hardcoding a light stroke makes textures strobe over dark
 *    bands and swamp the type on them. There's a `deep` counterpart for each,
 *    because the correct ink depends on the *band*, not only the scheme.
 * 3. **Mantine semantics** — `--mantine-color-error`/`-success` point at
 *    `red`/`teal`, and `--mantine-color-default-border` at `gray-4`, none of
 *    which land where this palette wants them. These are set last, so they win.
 */
export const rewdyCssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--rwd-display-tracking": "-0.02em",
    // Archivo is variable, so anything setting the display face by hand has to
    // set the weight too — inheriting 400 renders it as a regular grotesque.
    "--rwd-display-weight": displayWeight,
    "--rwd-eyebrow-tracking": "0.14em",
    "--rwd-border-width": "1px",
    "--rwd-prose-measure": "62ch",
  },
  light: {
    "--rwd-band-base": theme.white,
    "--rwd-band-tint": "#f6f9fa",
    "--rwd-band-muted": "#edf2f4",
    "--rwd-band-deep": theme.colors.slate[9],
    // What a `deep` band re-binds. Text color plus the surface/border steps, so
    // a Card or Input dropped into one inverts instead of staying white.
    "--rwd-band-deep-fg": theme.colors.slate[1],
    "--rwd-band-deep-dim": theme.colors.slate[3],
    "--rwd-band-deep-surface": "#2c383c",
    "--rwd-band-deep-hover": theme.colors.slate[8],
    "--rwd-band-deep-border": theme.colors.slate[7],
    // Two hairline weights, one step apart: structural for bands and dividers,
    // strong for controls, which need a visible edge to read as interactive.
    "--rwd-border-color": theme.colors.slate[2],
    "--rwd-border-strong": theme.colors.slate[3],
    // One teal hue for all three textures, weighted per texture because their
    // density differs: the wave and dot lattice are line work and ride a light
    // teal pass over the band, while the hatch is a broad wash, so it's the same
    // teal at low alpha. Sharing the hue is what makes them read as one family
    // rather than three unrelated patterns. The wave is the lightest of the
    // three because it carries body copy.
    "--rwd-texture-wave": "#c6ecf3",
    "--rwd-texture-dots": "#b3dbe4",
    "--rwd-texture-hatch": "rgba(18, 146, 175, 0.08)",
    // On a `deep` band the ink has to sit *above* a near-black surface, so these
    // are the same teal hue lifted instead of the light-scheme values.
    "--rwd-band-deep-texture-wave": "#3a4d55",
    "--rwd-band-deep-texture-dots": "#42565f",
    "--rwd-band-deep-texture-hatch": "rgba(75, 182, 205, 0.07)",
    // Selection is the `success` family, deliberately not magenta — it shows up
    // constantly while editing and a rationed accent can't take that.
    "--rwd-selection-bg": theme.colors.success[2],
    "--rwd-selection-ink": theme.colors.success[9],
    "--mantine-color-error": theme.colors.danger[6],
    "--mantine-color-success": theme.colors.success[6],
    "--mantine-color-default-border": "var(--rwd-border-strong)",
  },
  dark: {
    // The band tints are the `dark` ramp (see theme/colors.ts) so surfaces and
    // bands can't drift apart.
    "--rwd-band-base": theme.colors.dark[7],
    "--rwd-band-tint": theme.colors.dark[6],
    "--rwd-band-muted": theme.colors.dark[5],
    "--rwd-band-deep": theme.colors.dark[9],
    "--rwd-band-deep-fg": theme.colors.slate[1],
    "--rwd-band-deep-dim": "#a7b8bd",
    "--rwd-band-deep-surface": theme.colors.dark[7],
    "--rwd-band-deep-hover": theme.colors.dark[6],
    "--rwd-band-deep-border": theme.colors.slate[8],
    "--rwd-border-color": theme.colors.slate[8],
    "--rwd-border-strong": theme.colors.slate[7],
    "--rwd-texture-wave": "#2f4750",
    "--rwd-texture-dots": "#35505a",
    "--rwd-texture-hatch": "rgba(75, 182, 205, 0.09)",
    "--rwd-band-deep-texture-wave": "#26363d",
    "--rwd-band-deep-texture-dots": "#2c3e46",
    "--rwd-band-deep-texture-hatch": "rgba(75, 182, 205, 0.07)",
    "--rwd-selection-bg": theme.colors.success[8],
    "--rwd-selection-ink": theme.colors.success[1],
    // Both semantics shift one step brighter in dark, same as `primaryShade`.
    "--mantine-color-error": theme.colors.danger[4],
    "--mantine-color-success": theme.colors.success[4],
    "--mantine-color-default-border": "var(--rwd-border-strong)",
  },
});
