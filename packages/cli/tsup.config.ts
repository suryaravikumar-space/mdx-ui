import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts", "!src/__tests__/**"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: false,
  target: "node18",
  shims: true,
  splitting: false,
  bundle: false,
})
