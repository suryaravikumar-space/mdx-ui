import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
  "packages/cli/vitest.config.ts",
  "packages/remark-plugin/vitest.config.ts",
])
