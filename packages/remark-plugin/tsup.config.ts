import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  clean: true,
  minify: false,
  target: "node18",
  shims: true,
  splitting: false,
});
