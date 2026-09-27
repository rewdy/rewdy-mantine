import type { MantineColorsTuple } from "@mantine/core";

/**
 * Teal-tinted neutral. Hue ~197 at 8-14% saturation so every "gray" surface
 * carries a faint teal cast — this is the single family most responsible for the
 * rewdy.lol feel. Replaces Mantine's stock `gray` (see theme/index.ts).
 */
export const slate: MantineColorsTuple = [
  "#f4f7f8",
  "#e8edef",
  "#d3dcdf",
  "#b4c2c7",
  "#92a5ab",
  "#748a91",
  "#5c7178",
  "#47585e",
  "#354347",
  "#232d30",
];

/**
 * The dark color scheme's surface ramp. Mantine reads `dark` for every neutral
 * it needs in dark mode — body, surfaces, borders, text, placeholders — and its
 * stock ramp is a warm neutral (#242424 / #2e2e2e), which reads as gray cards
 * floating on the teal-tinted bands. These values are the band tints, so
 * surfaces and bands belong to the same family:
 *
 *   0 text  ·  2 dimmed  ·  3 placeholder  ·  4 border
 *   5 hover ·  6 surface (= band tint)  ·  7 body (= band base)  ·  9 band deep
 */
export const dark: MantineColorsTuple = [
  "#ccd8dc",
  "#b9c7cc",
  "#7f9299",
  "#62757b",
  "#47585e",
  "#263237",
  "#202a2e",
  "#1a2225",
  "#151c1f",
  "#101618",
];

/**
 * Brand teal. Seed #1292AF at index 6 — lifted from the rewdy.lol body-copy
 * color and promoted to the structural/primary role.
 */
export const primary: MantineColorsTuple = [
  "#e7f5f8",
  "#d3ebf1",
  "#a8d9e4",
  "#78c5d6",
  "#4bb6cd",
  "#2ba7c1",
  "#1292af",
  "#0f7f99",
  "#0d6d83",
  "#08596c",
];

/**
 * The pop. Desaturated from the zoom-wow/scroll-wow neon #ED40C5 to #DB3EB1.
 * Budgeted: at most one magenta element per viewport (see docs/design-system.md).
 */
export const magenta: MantineColorsTuple = [
  "#fdeaf7",
  "#f9d7ee",
  "#f2afdd",
  "#eb86cb",
  "#e563bd",
  "#e04cb5",
  "#db3eb1",
  "#c22f9b",
  "#a41c81",
  "#871267",
];

/** Secondary accent, descended from the rewdy.lol heading violet #870BE0. */
export const violet: MantineColorsTuple = [
  "#f4ecfd",
  "#e8d9f9",
  "#d0b1f2",
  "#b886eb",
  "#a463e5",
  "#954ce0",
  "#8b2fd6",
  "#7726bd",
  "#651ea1",
  "#521585",
];

/** Informational. From the #73B9FB label sky on rewdy.lol. */
export const info: MantineColorsTuple = [
  "#e9f2fe",
  "#d5e6fd",
  "#a9ccfb",
  "#7db2f8",
  "#589cf6",
  "#3d8ef5",
  "#2e88f5",
  "#1f74d9",
  "#1563b8",
  "#0c4f96",
];

/** Success. Deliberately kept green enough to not read as the teal primary. */
export const success: MantineColorsTuple = [
  "#e8f6ed",
  "#d4ecdd",
  "#a9d8bb",
  "#7cc498",
  "#55b37b",
  "#3ba668",
  "#319a5d",
  "#28854e",
  "#207040",
  "#175a32",
];

/**
 * Warning amber. Even the dark end stays mid-tone, so filled surfaces need dark
 * text — `autoContrast` on the theme handles that per-shade.
 */
export const warning: MantineColorsTuple = [
  "#fff6e3",
  "#ffedcb",
  "#fdd897",
  "#fbc45f",
  "#f8b232",
  "#f6a718",
  "#ed9d0e",
  "#d18705",
  "#b47300",
  "#945d00",
];

/** Danger. A rose-red tuned to sit next to magenta without muddying it. */
export const danger: MantineColorsTuple = [
  "#fdeaee",
  "#fad6dd",
  "#f4abb8",
  "#ee7d92",
  "#e95771",
  "#e53f5c",
  "#e1304e",
  "#c8233f",
  "#ab1a34",
  "#8d1028",
];

export const rewdyColors = {
  primary,
  magenta,
  violet,
  info,
  success,
  warning,
  danger,
  slate,
  // Override Mantine's stock neutral so every built-in component that reaches
  // for `gray` picks up the teal-tinted ramp instead.
  gray: slate,
  // Same reasoning for the dark scheme's neutral, which Mantine keys off `dark`.
  dark,
} as const;

export type RewdyColorName = keyof typeof rewdyColors;
