import type { MantineThemeOverride } from "@mantine/core";

const systemSansFallback =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/**
 * Body / UI face. The brand font.
 *
 * The `Variable` name comes first because that's how Fontsource registers the
 * variable build, which is what `fonts.css` loads; the plain name follows so a
 * self-hosted or CDN copy of the same face still resolves.
 */
export const karlaStack = `"Karla Variable", Karla, ${systemSansFallback}`;

/**
 * Display face. Archivo variable (100-900), set at 700 — Archivo Black, which
 * this replaced, read too heavy at hero sizes. Used for h1/h2 only; h3-h6 fall
 * back to Karla 700, which is the same weight but a different face.
 */
export const displayStack = `"Archivo Variable", Archivo, ${karlaStack}`;

/** Weight the display face is set at. Deliberately not Black (900). */
export const displayWeight = "700";

export const monoStack =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

/**
 * App scale — the theme default. Base 18px keeps dense UI (forms, tables,
 * dashboards) comfortable without the 21px+ editorial setting crushing them.
 */
export const fontSizes = {
  xs: "0.8125rem", // 13
  sm: "0.9375rem", // 15
  md: "1.125rem", // 18
  lg: "1.25rem", // 20
  xl: "1.5rem", // 24
} as const;

export const lineHeights = {
  xs: "1.45",
  sm: "1.5",
  md: "1.6",
  lg: "1.6",
  xl: "1.55",
} as const;

/**
 * Heading scale. h1/h2 are display (Archivo 700, tight tracking); h3-h6 are
 * Karla 700.
 *
 * `headings.sizes` only accepts fontSize/lineHeight/fontWeight — there's no
 * per-level fontFamily — so `headings.fontFamily` here sets the display face for
 * ALL levels and styles/global.css reassigns h3-h6 back to Karla.
 */
const headings: MantineThemeOverride["headings"] = {
  fontFamily: displayStack,
  fontWeight: displayWeight,
  sizes: {
    h1: {
      fontSize: "2.75rem", // 44
      lineHeight: "1.05",
      fontWeight: displayWeight,
    },
    h2: {
      fontSize: "2rem", // 32
      lineHeight: "1.1",
      fontWeight: displayWeight,
    },
    h3: {
      fontSize: "1.5rem", // 24
      lineHeight: "1.25",
      fontWeight: "700",
    },
    h4: {
      fontSize: "1.25rem", // 20
      lineHeight: "1.3",
      fontWeight: "700",
    },
    h5: {
      fontSize: "1.125rem", // 18
      lineHeight: "1.35",
      fontWeight: "700",
    },
    h6: {
      fontSize: "1rem", // 16
      lineHeight: "1.4",
      fontWeight: "700",
    },
  },
};

export const rewdyTypography: Pick<
  MantineThemeOverride,
  "fontFamily" | "fontFamilyMonospace" | "fontSizes" | "lineHeights" | "headings"
> = {
  fontFamily: karlaStack,
  fontFamilyMonospace: monoStack,
  fontSizes,
  lineHeights,
  headings,
};
