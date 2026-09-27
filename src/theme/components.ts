import {
  Alert,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Code,
  ColorSwatch,
  Input,
  Menu,
  Modal,
  Paper,
  Popover,
  Switch,
  Table,
  Tabs,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import type { MantineThemeComponents } from "@mantine/core";

/**
 * Every surface in the system is square and flat. Extracted so the value is
 * stated once — all three reference sites have zero radius and zero shadow on
 * every element, and that discipline is the strongest brand signal we have.
 */
const flatSurface = {
  borderRadius: 0,
  boxShadow: "none",
} as const;

export const rewdyComponents: MantineThemeComponents = {
  Button: Button.extend({
    defaultProps: { radius: 0 },
    styles: {
      root: {
        ...flatSurface,
        fontWeight: 700,
      },
    },
  }),

  Badge: Badge.extend({
    defaultProps: { radius: 0 },
    styles: {
      root: {
        ...flatSurface,
        fontWeight: 700,
        letterSpacing: "0.06em",
      },
    },
  }),

  Paper: Paper.extend({
    defaultProps: { radius: 0, shadow: undefined, withBorder: true },
    styles: { root: flatSurface },
  }),

  Card: Card.extend({
    defaultProps: { radius: 0, shadow: undefined, withBorder: true },
    styles: { root: flatSurface },
  }),

  // Alerts use a left accent rule on a neutral surface instead of a saturated
  // tinted fill — flatter and quieter, and the same language as the
  // hairline-bordered surfaces everywhere else.
  //
  // `--alert-bg` is overridden to a neutral band tint, while `--alert-color`
  // (Mantine's per-variant accent color) drives the left rule, so every color
  // variant stays correct without enumerating them.
  Alert: Alert.extend({
    defaultProps: { radius: 0, variant: "light" },
    // CSS variables must go through `vars`, not `styles` — Mantine writes its own
    // --alert-* values into the same inline style attribute and would clobber a
    // --alert-bg set via `styles`.
    vars: () => ({
      root: { "--alert-bg": "var(--rwd-band-tint)" },
    }),
    styles: {
      root: {
        ...flatSurface,
        // Longhands, not the `border` shorthand: Mantine's inline border-*
        // longhands would blank out parts of a shorthand set here.
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--rwd-border-color)",
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: "var(--alert-color)",
      },
    },
  }),

  Modal: Modal.extend({
    defaultProps: { radius: 0 },
    styles: { content: flatSurface, header: { borderRadius: 0 } },
  }),

  Menu: Menu.extend({
    defaultProps: { radius: 0, shadow: undefined },
    styles: { dropdown: { ...flatSurface, border: "1px solid var(--rwd-border-color)" } },
  }),

  Popover: Popover.extend({
    defaultProps: { radius: 0, shadow: undefined },
    styles: { dropdown: { ...flatSurface, border: "1px solid var(--rwd-border-color)" } },
  }),

  Tooltip: Tooltip.extend({
    defaultProps: { radius: 0 },
    styles: { tooltip: { borderRadius: 0 } },
  }),

  // Targets the shared Input base so TextInput, Select, Textarea, NumberInput,
  // PasswordInput, etc. all inherit square corners in one place.
  Input: Input.extend({
    defaultProps: { radius: 0 },
    styles: { input: { borderRadius: 0 } },
  }),

  Checkbox: Checkbox.extend({
    defaultProps: { radius: 0 },
    styles: { input: { borderRadius: 0 } },
  }),

  // Radio is deliberately absent: radios stay round, because a square radio
  // reads as a checkbox.

  // Chip's pill shape is baked into --chip-radius rather than the radius prop.
  Chip: Chip.extend({
    styles: { root: { "--chip-radius": "0" } },
  }),

  // Switch, ColorSwatch and Avatar ignore `defaultRadius` — their radius
  // variable falls back to a hardcoded pill/circle in Mantine's own stylesheet
  // unless the `radius` prop is set explicitly, so it has to be set here.
  Switch: Switch.extend({
    defaultProps: { radius: 0 },
  }),

  ColorSwatch: ColorSwatch.extend({
    defaultProps: { radius: 0 },
  }),

  Avatar: Avatar.extend({
    defaultProps: { radius: 0 },
  }),

  ThemeIcon: ThemeIcon.extend({
    defaultProps: { radius: 0 },
    styles: { root: flatSurface },
  }),

  Code: Code.extend({
    styles: {
      root: {
        borderRadius: 0,
        border: "1px solid var(--rwd-border-color)",
        color: "light-dark(var(--mantine-color-magenta-8), var(--mantine-color-magenta-4))",
      },
    },
  }),

  Anchor: Anchor.extend({
    defaultProps: { underline: "hover" },
    styles: { root: { fontWeight: 700 } },
  }),

  Tabs: Tabs.extend({
    styles: { tab: { borderRadius: 0 } },
  }),

  Table: Table.extend({
    defaultProps: { horizontalSpacing: "md", verticalSpacing: "sm" },
    styles: {
      th: {
        fontSize: "var(--mantine-font-size-xs)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--mantine-color-dimmed)",
      },
    },
  }),

  // h1/h2 are the display face with its tight tracking; h3-h6 return to Karla
  // 700 with near-neutral tracking, because Archivo Black is single-weight and
  // reads far too heavy below ~32px.
  //
  // This has to be done per-order here rather than in a stylesheet: Mantine's
  // Title class sets `font-family: var(--mantine-font-family-headings)` at
  // (0,1,0), which beats any `:where()`-wrapped rule, and `headings.sizes` has
  // no per-level fontFamily. The styles API emits an inline style, which wins.
  Title: Title.extend({
    styles: (_theme, props) => {
      const isDisplay = (props.order ?? 1) <= 2;

      return {
        root: {
          fontFamily: isDisplay
            ? "var(--mantine-font-family-headings)"
            : "var(--mantine-font-family)",
          letterSpacing: isDisplay ? "var(--rwd-display-tracking)" : "-0.005em",
        },
      };
    },
  }),
};
