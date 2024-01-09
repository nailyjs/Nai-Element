import swc from "unplugin-swc";
import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    globals: true,
    exclude: ["node_modules", "index.ts", "**/*.generated.ts", "**/*dist*/**", "src/main.ts", "src/metadata.ts", "**/*.module.ts", "**/*test/*/**"],
    root: "./",
    coverage: {
      provider: "v8",
      exclude: ["node_modules", "index.ts", "**/*.generated.ts", "**/*dist*/**", "src/main.ts", "src/metadata.ts", "**/*.module.ts", "**/*test/*/**"],
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
