import { createTheme, type MantineTheme } from "@mantine/core";
import { describe, expect, it } from "vitest";

import { rewdyColors, rewdyCssVariablesResolver, rewdyTheme } from "../src/index";

// `createTheme` is typed as returning a deep-partial override, not a full theme.
// The resolver wants a complete `MantineTheme`, hence the widening cast.
const theme = createTheme(rewdyTheme) as MantineTheme;

const resolved = rewdyCssVariablesResolver(theme);

const blockOf = (scheme: "light" | "dark") =>
  (resolved[scheme] ?? {}) as Record<string, string | undefined>;

describe("theme", () => {
  it("makes the brand teal the primary color", () => {
    expect(theme.primaryColor).toBe("primary");
    expect(theme.colors.primary[6]).toBe("#1292af");
  });

  it("brightens the primary two steps in dark so it holds contrast", () => {
    expect(theme.primaryShade).toEqual({ light: 6, dark: 4 });
  });

  it("bans radius and shadow everywhere, including at the scale level", () => {
    expect(theme.defaultRadius).toBe(0);
    expect(Object.values(theme.radius)).toEqual(["0", "0", "0", "0", "0"]);
    expect(Object.values(theme.shadows).every((shadow) => shadow === "none")).toBe(true);
  });

  it("aliases gray to the teal-tinted neutral so stock components inherit the cast", () => {
    expect(theme.colors.gray).toEqual(theme.colors.slate);
  });

  it("defines the dark scheme's neutral as a tuned ramp, not Mantine's warm gray", () => {
    expect(theme.colors.dark).toEqual(rewdyColors.dark);
    expect(theme.colors.dark).toHaveLength(10);
  });

  it("ships every palette as a full 10-step ramp", () => {
    for (const [name, ramp] of Object.entries(theme.colors)) {
      expect(ramp, `${name} should be a 10-step ramp`).toHaveLength(10);
    }
  });

  it("enables autoContrast so filled warning gets dark text", () => {
    expect(theme.autoContrast).toBe(true);
  });
});

describe("css variables resolver", () => {
  it("emits all four band surfaces in both schemes", () => {
    const keys = ["--rwd-band-base", "--rwd-band-tint", "--rwd-band-muted", "--rwd-band-deep"];

    for (const scheme of ["light", "dark"] as const) {
      const block = blockOf(scheme);

      for (const key of keys) {
        expect(block[key], `${scheme} ${key}`).toBeTruthy();
      }
    }
  });

  it("gives each texture its own ink, so none of them share a stroke", () => {
    for (const scheme of ["light", "dark"] as const) {
      const block = blockOf(scheme);

      for (const key of ["--rwd-texture-wave", "--rwd-texture-dots", "--rwd-texture-hatch"]) {
        expect(block[key], `${scheme} ${key}`).toBeTruthy();
      }

      // Every texture needs a deep-band counterpart: a deep band is dark in both
      // schemes, so the light-scheme ink strobes on top of it.
      for (const key of [
        "--rwd-band-deep-texture-wave",
        "--rwd-band-deep-texture-dots",
        "--rwd-band-deep-texture-hatch",
      ]) {
        expect(block[key], `${scheme} ${key}`).toBeTruthy();
      }
    }
  });

  it("re-points the semantic colors Mantine would take from unused palettes", () => {
    for (const scheme of ["light", "dark"] as const) {
      const block = blockOf(scheme);

      expect(block["--mantine-color-error"]).toBeTruthy();
      expect(block["--mantine-color-success"]).toBeTruthy();
      expect(block["--mantine-color-default-border"]).toBe("var(--rwd-border-strong)");
    }
  });

  it("takes selection from the success family, not the rationed accent", () => {
    expect(blockOf("light")["--rwd-selection-bg"]).toBe(theme.colors.success[2]);
    expect(blockOf("dark")["--rwd-selection-bg"]).toBe(theme.colors.success[8]);
  });
});
