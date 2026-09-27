import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Component tests render to a string with `react-dom/server`, so no DOM
    // environment is needed.
    environment: "node",
    include: ["test/**/*.test.{ts,tsx}"],
  },
});
