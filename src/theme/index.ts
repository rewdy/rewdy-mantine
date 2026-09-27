import { createTheme, type MantineThemeOverride } from "@mantine/core";
import { rewdyColors } from "./colors";
import { rewdyComponents } from "./components";
import { rewdyTypography } from "./typography";

export const rewdyTheme: MantineThemeOverride = createTheme({
  primaryColor: "primary",
  // Teal #1292AF (index 6) reads correctly on light surfaces; brighten two steps
  // in dark so it holds contrast against the teal-tinted dark bands.
  primaryShade: { light: 6, dark: 4 },
  // The warning amber is too light for white text at every shade. autoContrast
  // lets Mantine pick black-or-white per shade luminance, so filled `warning`
  // gets dark text while teal/magenta/danger keep white.
  autoContrast: true,
  black: "#232d30",
  white: "#ffffff",
  colors: rewdyColors,
  // Flat and square: no radius, no shadow anywhere. Mantine still needs values
  // for these scales, so every step is 0 / none rather than left at defaults.
  defaultRadius: 0,
  radius: { xs: "0", sm: "0", md: "0", lg: "0", xl: "0" },
  shadows: { xs: "none", sm: "none", md: "none", lg: "none", xl: "none" },
  ...rewdyTypography,
  components: rewdyComponents,
});

export type RewdyTheme = typeof rewdyTheme;

export { rewdyColors } from "./colors";
export type { RewdyColorName } from "./colors";
export { rewdyCssVariablesResolver } from "./css-variables";
export { displayStack, displayWeight, karlaStack, monoStack } from "./typography";
