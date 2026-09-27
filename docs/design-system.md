# rewdy fun — design system spec

The visual language for `@rewdy/mantine`, a Mantine theme for personal
exploration projects.

## Where this comes from

Audited from the three reference sites (2026-07-28):

| Source | What it contributed |
| --- | --- |
| `rewdy.lol` | Karla, full-bleed tint bands, tiled wave texture, zero radius, zero shadow, teal body copy |
| `zoom-wow.rewdy.lol` | Magenta/mint/acid accent energy, dot-grid texture, square chips |
| `scroll-wow.com` | Same kit as zoom-wow — confirms it's a system, not a one-off |

Measured values worth recording, because they define the "feel" being preserved:

- `rewdy.lol` body copy: Karla 300, 24px / 36px line-height, `letter-spacing: 1.2px`
- Headings: Karla 600, violet `#870BE0`
- Body copy color is **teal** `#1292AF`, not gray — unusual and a big part of the character
- Bands: `#F2F2F2` → `#FAFAFA` → `#FFFFFF`
- Wave texture: `hsla(189, 75%, 87%)` 1.5px stroke, tiled `60px 15px`
- **No element on any of the three sites has a border-radius or a box-shadow**

## Direction

Keep the structure, tame the saturation. The reference sites get their energy
from loud color on flat white. This system moves the energy into a *teal-anchored
neutral* and a *disciplined accent budget*, so it reads considered rather than
novelty — while staying unmistakably the same author.

Three rules that carry most of the identity:

1. **Bands, not cards.** Page rhythm comes from full-bleed horizontal bands of
   slightly different tint and texture. Cards are a last resort, not the default.
2. **Flat and square.** `radius: 0`, `shadow: none`, 1px hairline borders. Depth
   is communicated by tint change, never by elevation.
3. **Accent budget.** Teal is structural and may appear anywhere. Magenta is
   rationed — at most one magenta element per viewport.

## Typography

| Role | Face | Weight |
| --- | --- | --- |
| Display (h1, h2) | Archivo (variable) | 700 |
| Headings (h3–h6) | Karla | 700 |
| Body / UI | Karla | 400, 300 for large prose |
| Mono | system mono stack | 400 |

Archivo is a neutral grotesque — the same humanist-grotesque genus as Karla, so it
harmonizes rather than competes. Display and h3–h6 are the *same weight*; the
distinction between them is the face, not the weight. Archivo's narrower, flatter
grotesque forms carry the hero; Karla's warmer forms handle the sub-heads.

The display weight is exported as `displayWeight` and emitted as
`--rwd-display-weight`. Anything setting the display face by hand has to set the
weight too — Archivo is variable, so inheriting 400 renders it as a plain
regular.

Both faces are self-hosted through [Fontsource](https://fontsource.org) rather
than the Google Fonts CDN, so the library makes no third-party request on a
consumer's behalf and the versions stay pinned. Fontsource registers the
variable builds as `Karla Variable` and `Archivo Variable` — not the plain
names — so the stacks list those first and the plain names second, which keeps a
self-hosted or CDN copy of either face working.

### Hero color

The hero h1 can carry the reference site's **violet** instead of the body ink.
It's a stock Mantine prop — no theme code involved:

```tsx
<Title order={1} c="violet">Hi, I'm Rewdy.</Title>
```

Apply it to the landing hero and nothing else. A theme-wide rule on any heading
level turns the violet from a hero gesture into the page's normal type color.

`c="violet"` resolves to Mantine's `--mantine-color-violet-text`, which is
already per-scheme: `violet-6` in light, `violet-4` in dark. That's the same
two-step shift `primaryShade` uses, so the hero ink needs no variables or classes
of its own.

### Dual scale

Two scales, because 24px body copy is wonderful in an editorial band and hostile
in a data table.

**App scale** — theme default, `md: 18px`:

| Token | Size | Line height |
| --- | --- | --- |
| `xs` | 13px | 1.45 |
| `sm` | 15px | 1.5 |
| `md` | 18px | 1.6 |
| `lg` | 20px | 1.6 |
| `xl` | 24px | 1.55 |

Headings (app): h1 44 / h2 32 / h3 24 / h4 20 / h5 18 / h6 16.

**Editorial scale** — opt-in via `<Prose>`, for hero and content bands:

- Body 21px / 1.65, `letter-spacing: 0.2px`
- h1 `clamp(2.75rem, 6vw, 4.75rem)`, h2 40px
- Max measure 62ch

Letter-spacing: display type gets `-0.02em` (tightens Archivo's already tight
fit); large prose gets `+0.2px`, a restrained nod to the 1.2px on the current
site.

## Color

Primary is teal `#1292AF` — already the body-copy color on `rewdy.lol`, and it
harmonizes with the teal-tinted neutral instead of sitting on top of it.

### Neutral — `slate` (teal-tinted gray)

The single most important family. Hue ~197 at 8–14% saturation, so every gray
surface carries a faint teal cast. This is the "slightly teal gray" being
preserved.

```
0 #F4F7F8   3 #B4C2C7   6 #5C7178   9 #232D30
1 #E8EDEF   4 #92A5AB   7 #47585E
2 #D3DCDF   5 #748A91   8 #354347
```

### Dark neutral — `dark`

Mantine reads `dark` for every neutral it needs in dark mode, so this family has
to exist too — otherwise dark-mode surfaces are a warm gray sitting on the
teal-tinted bands. Its surface steps *are* the band tints, which is what keeps
the two from drifting.

```
0 #CCD8DC (text)     4 #47585E (border)    7 #1A2225 (body = band base)
1 #B9C7CC            5 #263237 (hover)     8 #151C1F
2 #7F9299 (dimmed)   6 #202A2E (surface    9 #101618 (= band deep)
3 #62757B (placeh.)     = band tint)
```

### Semantic families

| Family | Seed (idx 6) | Role |
| --- | --- | --- |
| `primary` | `#1292AF` | teal — buttons, links, focus, structure |
| `magenta` | `#DB3EB1` | rationed pop — logo, one hero CTA |
| `violet` | `#8B2FD6` | secondary accent, from the site's heading violet |
| `info` | `#2E88F5` | from the `#73B9FB` label sky |
| `success` | `#319A5D` | muted green, deliberately distinct from teal |
| `warning` | `#ED9D0E` | amber; needs dark text on filled surfaces |
| `danger` | `#E1304E` | rose-red, tuned to sit beside magenta |

`autoContrast` is on so filled `warning` gets dark text automatically.

### Surfaces

Four band tints per color scheme, exposed as CSS variables so bands work
identically in light and dark.

| Band | Light | Dark |
| --- | --- | --- |
| `base` | `#FFFFFF` | `#1A2225` |
| `tint` | `#F6F9FA` | `#202A2E` |
| `muted` | `#EDF2F4` | `#263237` |
| `deep` | `#232D30` (inverted) | `#101618` |

## Textures

Tiling background motifs, applied to a band via `texture="…"`. All are
CSS-only or inline SVG data URIs — no binary assets, and all recolor with the
color scheme.

All three share the primary teal **hue** and differ only in **weight**, which is
what makes them read as one family. Weight is per-texture because density
differs: a 1px dot at 20px pitch and a 1.5px wave need different strength to read
at all, and the hatch is a broad wash rather than line work.

| Texture | Form | Ink |
| --- | --- | --- |
| `wave` | 60×15px SVG stroke | `--rwd-texture-wave` — lightest, carries hero copy; near the source site's `hsla(189, 75%, 87%)` |
| `dots` | 1px lattice, 20px pitch | `--rwd-texture-dots` |
| `hatch` | 45° hairline, 8px pitch | `--rwd-texture-hatch` — same teal at low alpha |

## Shape and depth

```
radius:  0 everywhere
shadow:  none everywhere
border:  1px solid hairline, in two weights one step apart:
           --rwd-border-color   slate-2 / slate-8   structural — bands, dividers
           --rwd-border-strong  slate-3 / slate-7   controls — inputs, cards
focus:   2px solid primary, 2px offset (visible against every band tint)
```

Two weights rather than one because a control needs a visible edge to read as
interactive, while a band separator should stay quiet. `slate` is darker at each
index than Mantine's stock `gray`, so Mantine's own `gray-4` default lands too
heavy — `--mantine-color-default-border` is re-pointed at `--rwd-border-strong`.

Interaction is expressed by tint and border-color shifts, plus movement — never
by shadow. Three small motions carry the system's "quirk":

| Motion | Where | Detail |
| --- | --- | --- |
| Button lean | filled `Button` on hover | `scale(1.03)` + `rotate(±0.6deg)`, sign flipped on `:nth-child(even)` so a row doesn't move as one |
| Arrow nudge | `ArrowLink` | the trailing `→` shifts 3px on hover/focus |
| Press nudge | any `Button` on `:active` | 1px translate |

All three are sub-degree and sub-pixel-ish on purpose: silly, not jarring. The
two hover motions are gated on `(hover: hover) and (prefers-reduced-motion:
no-preference)`. Filled-only for the lean, because a form with a stack of
buttons shouldn't wobble.

Selection is the **`success`** family (`--rwd-selection-bg`/`-ink`) — it's on
screen the whole time you're editing, so it can't be a rationed accent.

`Swipe` is the one flat gesture on display type: a translucent wash mixed from
Mantine's per-scheme violet accent (`--mantine-color-violet-text`), so it needs
no variables of its own and re-tints in dark mode automatically. Deliberately
unskewed and unoffset — a rotated block would tip the system toward
skeuomorphism.

## Color scheme support

Both light and dark ship tuned from the start. The dark surface ramp is
teal-tinted rather than neutral (`#1A2225`, not `#1A1B1E`) so the family
relationship holds. In dark mode the accent families shift one step brighter
(`primaryShade: { light: 6, dark: 4 }`) to hold contrast.

## Implementation notes

Where the design meets Mantine 9.5, and the non-obvious bits.

### Package layout

```
lib/src/
  theme/
    colors.ts         # 8 families + `dark`; `gray` is aliased to slate
    typography.ts     # font stacks + app scale + heading scale
    components.ts     # Component.extend() defaults — square/flat everywhere
    css-variables.ts  # --rwd-* per color scheme, + Mantine semantic overrides
    index.ts          # createTheme()
  components/
    Band/             # full-bleed section (no Mantine equivalent)
    Prose/            # opt-in editorial type scale
    Eyebrow/          # caps-tracked section kicker
    ArrowLink/        # link/CTA with a nudging trailing arrow
    Swipe/            # flat highlight wash for a phrase in display type
  provider/
    RewdyProvider.tsx # MantineProvider + theme + variables resolver
  styles/
    global.css        # Mantine CSS + selection + button motion
    fonts.css         # Karla + Archivo, self-hosted via Fontsource
```

`Band`, `Prose`, `ArrowLink` and `Swipe` are real components because Mantine has
no equivalent primitive; everything else is pure theme configuration.

### Gotchas worth remembering

**Mantine's component classes beat `:where()`.** This is the one to internalize,
because three separate bugs came from it. Mantine styles components with a single
class (specificity 0,1,0). A `:where(…)` selector is 0,0,0, so *any* override
written that way silently loses no matter where the stylesheet sits. Two
consequences:

- Overriding a Mantine component's own declaration from a stylesheet needs real
  specificity (`:is()` instead of `:where()`, a doubled class, or a descendant
  selector) — or it needs to go through the styles API, which emits inline style
  and always wins.
- Equal specificity is just as bad: it resolves on stylesheet order, which is not
  ours to control (and differs between dev and a production build).

**`headings.sizes` has no per-level `fontFamily`.** Setting
`headings.fontFamily` to Archivo applies it to every level, and h3–h6 need
to come back to Karla. That reassignment lives in the `Title` override in
`theme/components.ts` as a per-`order` `styles` function — *not* in a stylesheet,
per the gotcha above.

**`Prose` has to hand its scale to `Text` explicitly.** An opt-in type scale on a
wrapper only reaches bare markup: `Text` sets its own `font-size`/`line-height`
from a class, and a class declaration beats an inherited value, so every `<Text>`
child snaps back to the app scale. `Prose.module.css` overrides it through
`var(--text-fz, inherit)`, which keeps an explicit `fz` prop winning.

**Mantine needs a `dark` color family, not just band variables.** In dark mode
every Mantine neutral — body, surfaces, borders, text, placeholders — comes from
`theme.colors.dark`, which is a warm gray by default. Tuning only the band
variables leaves stock gray cards floating on teal-tinted bands. `colors.ts`
defines a `dark` ramp whose surface steps *are* the band tints.

**Some Mantine semantics point at palettes we don't use.**
`--mantine-color-error` resolves to `red`, `--mantine-color-success` to `teal`,
and `--mantine-color-default-border` to `gray-4` — which, with `gray` aliased to
`slate`, lands two steps darker than the hairline everywhere else. All three are
re-pointed at the end of `theme/css-variables.ts`, which wins because resolver
variables are written after Mantine's own.

**`radius: 0` doesn't reach every component.** `Switch`, `ColorSwatch` and
`Avatar` fall back to a hardcoded pill/circle in Mantine's stylesheet unless the
`radius` prop is set explicitly — `defaultRadius` is not consulted. `Chip` is the
same story via `--chip-radius`. All four are set in `theme/components.ts`.

**CSS variables must go through `vars`, not `styles`.** Mantine writes its own
`--alert-*` values into the same inline `style` attribute, so an `--alert-bg` set
via `styles` gets clobbered. `vars: () => ({ root: { "--alert-bg": … } })` wins.

**Use border longhands, not the shorthand, when overriding a Mantine component's
border.** Mantine emits inline `border-top-color`, `border-top-style`, … which
partially blank out a `border: 1px solid …` shorthand set via `styles`.

**Some shapes live in a component's own variable, not the `radius` prop.** `Chip`
is a pill via `--chip-radius`; `radius={0}` doesn't touch it.

**Mantine 9 renamed `Grid`'s `gutter` prop to `gap`.**

**`Prose`'s child spacing needs `.root.root`.** Mantine's `Text` sets `margin: 0`
from a single class; at equal specificity the winner depends on stylesheet order,
which we don't control.

**An inverted band has to declare itself a dark-scheme subtree.** Rebinding the
text variables is not enough: Mantine paints most light-scheme surfaces with the
literal `--mantine-color-white` token (not `--mantine-color-body`), so a `Card` in
a `deep` band stays white and then inherits the band's near-white text — invisible
copy. `Band` sets `data-mantine-color-scheme="dark"` on the `deep` variant, which
flips Mantine's component rules (they're written as descendant selectors on that
attribute) while leaving `white` alone. Rebinding `white` instead is the trap: it
also carries inverse *text* color, so every filled button label in the band turns
dark-on-teal.

Because the variable blocks are bound to `:root[data-mantine-color-scheme=…]`, the
attribute alone doesn't bring the dark variables — `.deep` still has to set the
semantic tokens plus the `dark` ramp's three surface steps by hand.

**Texture ink depends on the band, not just the color scheme.** A `deep` band is
dark in *both* schemes, so the light-scheme ink strobes on it. Each texture
variable has a `--rwd-band-deep-*` counterpart that `.deep` swaps in.

**CSS can't interpolate `var()` inside `url()`.** The `wave` texture is an SVG
data URI, so its stroke color can't be a variable — which is how it ended up
hardcoded once per scheme. It's now painted as a mask over a flat
`--rwd-texture-wave` fill on a pseudo-element: one definition, recolors like the
others. That's what `position: relative` + `isolation: isolate` on `.root` are
for.

**`component={Link}` renders a bare `<a>`** and picks up the user agent's link
blue. Set `color` explicitly on polymorphic links.

**Textures need a per-scheme ink variable from day one.** A hardcoded light
stroke strobes over dark bands and swamps the type on them. This is the single
thing that would have been most expensive to retrofit.

## Decisions log

| Decision | Rationale |
| --- | --- |
| Archivo over Bricolage/Anton | Confident without quirk; lets color carry personality. Anton is single-weight *and* condensed-only. |
| Archivo 700, not Archivo Black | Black read too heavy at hero sizes. Archivo's variable range gives the step down that Archivo Black (single-weight) couldn't. 800 was tried first; 700's more editorial read won. |
| Teal primary, not magenta | Magenta as primary can't be "subdued"; as a rationed pop it stays exciting. |
| Square + flat retained | All three reference sites already do this; it's the strongest existing signal. |
| Dual type scale | A single 21px+ scale breaks tables and forms; a single 16px scale loses the airiness. |
| Both color schemes up front | Retrofitting dark across every texture and band later costs more than building it now. |
| `Band`/`Prose` as components | Mantine has no full-bleed section primitive and no opt-in type scale; everything else stayed pure theme config. |
| Alerts get a left rule, not a tinted fill | A saturated fill fights the band tints; a neutral surface with an accent rule matches the hairline language. |
| Example app consumes lib source directly | No build step to babysit while iterating on the theme. Add a `vite build` + `dts` step when publishing. |
| wouter over react-router | Tiny, hook-based, no provider ceremony needed for a showcase app. |
| Per-level heading font in the theme, not CSS | A stylesheet rule can't beat Mantine's Title class without a specificity hack; the styles API emits inline style and just works. |
| `deep` band as a dark-scheme subtree | Rebinding the white token fixes surfaces but breaks filled-button labels. The data attribute flips exactly the component rules and nothing else. |
| Two hairline weights | One value can't serve both a quiet band separator and a legible control edge. Kept one step apart so it still reads as a single language. |
| Semantic Mantine vars re-pointed, stock palettes left alone | `error`/`success`/`default-border` are what components actually read. Aliasing `red`/`teal` wholesale would hide which palette is in play. |
| Hero violet via `c="violet"`, set per instance | Mantine already emits a per-scheme `--mantine-color-{name}-text` (violet-6 light / violet-4 dark), so the hero ink needs no custom variable or class. A theme-wide heading rule made every page title violet, which read as a default rather than a hero gesture. |
| Button lean, filled only | A row of filled CTAs is where the quirk is fun; a form's button stack is where it would be noise. Sign flips on `:nth-child(even)` so a row doesn't move in lockstep. |
| Selection uses `success`, not magenta | Selection is on screen constantly while editing, so the rationed accent can't take it. |
| `Swipe` is unskewed | A skewed or offset highlight starts to read as skeuomorphic; flat keeps it in the system's language. |
| Motion gated on `hover: hover` + `prefers-reduced-motion` | Touch devices shouldn't get hover transforms, and motion-sensitive users shouldn't get the lean at all. |
