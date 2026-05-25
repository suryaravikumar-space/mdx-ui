import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/__tests__/**/*.test.ts"],
    reporters: ["default", "junit"],
    outputFile: { junit: "coverage/junit.xml" },
    coverage: {
      provider: "v8",
      include: ["src/lib/**/*.ts", "src/utils/**/*.ts"],
      exclude: ["src/__tests__/**"],
      thresholds: {
        lines: 35,
        functions: 40,
        branches: 40,
        statements: 35,
      },
    },
  },
});
