import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registrySrc = path.resolve(__dirname, "../../../packages/registry/src");

await esbuild.build({
  entryPoints: [path.resolve(registrySrc, "webview-entry.ts")],
  bundle: true,
  outfile: path.resolve(__dirname, "../dist/webview-bundle.js"),
  format: "esm",
  platform: "browser",
  alias: {
    "@/lib/utils": path.resolve(registrySrc, "lib/utils.ts"),
    "@/lib/primitives": path.resolve(registrySrc, "lib/primitives.ts"),
    "@/lib/motion": path.resolve(registrySrc, "lib/motion.tsx"),
  },
  external: [
    "react",
    "react/jsx-runtime",
    "react-dom",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
    "mermaid",
    "katex",
  ],
  minify: true,
});

console.log("✓ webview-bundle.js built");
