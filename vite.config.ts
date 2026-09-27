import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const GLOBAL_CSS = "src/styles/global.css";
const FONTS_CSS = "src/styles/fonts.css";

const asText = (source: string | Uint8Array) =>
  typeof source === "string" ? source : new TextDecoder().decode(source);

/**
 * Vite's lib mode extracts CSS-module output into an asset of its own and drops
 * the import from the emitted JavaScript. Left alone, a consumer gets components
 * with no styles.
 *
 * The usual fix is to re-attach `import "./…css"` to the JS, but that makes the
 * package unimportable outside a bundler — no SSR, no plain Node. Instead the
 * component CSS is folded into the stylesheet consumers already import:
 *
 *   styles.css = Mantine's own CSS (via @import) + theme globals + component CSS
 *
 * CSS requires `@import` to come before any rule, so the theme's globals stay
 * first and the extracted component CSS is appended. `fonts.css` is written
 * through verbatim, since it is only the font imports and is optional.
 */
function stylesheets(): Plugin {
  return {
    name: "rwd:stylesheets",
    // Vite's own CSS plugin emits its asset during `generateBundle`, so this has
    // to run after it to be able to consume and remove that asset.
    enforce: "post",
    generateBundle(_options, bundle) {
      let componentCss = "";

      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== "asset" || !fileName.endsWith(".css")) continue;

        componentCss += `${asText(output.source)}\n`;

        // Consumed into styles.css below, so it isn't emitted on its own.
        delete bundle[fileName];
        delete bundle[`${fileName}.map`];
      }

      this.emitFile({
        type: "asset",
        fileName: "styles.css",
        source: `${readFileSync(fromRoot(GLOBAL_CSS), "utf8")}\n${componentCss}`,
      });

      this.emitFile({
        type: "asset",
        fileName: "fonts.css",
        source: readFileSync(fromRoot(FONTS_CSS), "utf8"),
      });
    },
  };
}

export default defineConfig({
  plugins: [stylesheets(), dts({ include: ["src"], tsconfigPath: "./tsconfig.json" })],
  build: {
    target: "es2022",
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: fromRoot("src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Peer dependencies stay external, so consumers get one copy of React and
      // whichever Mantine they already have.
      external: [/^react(-dom)?(\/|$)/, /^@mantine\//],
    },
  },
});
