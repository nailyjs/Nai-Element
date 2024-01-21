/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import swc from "unplugin-swc";
import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    globals: true,
    exclude: ["node_modules", "index.ts", "**/*dist*/**", "src/main.ts", "src/metadata.ts", "**/*.module.ts", "**/*test/*/**"],
    root: "./",
    coverage: {
      provider: "v8",
      exclude: ["node_modules", "index.ts", "**/*dist*/**", "src/main.ts", "src/metadata.ts", "**/*.module.ts", "**/*test/*/**"],
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
