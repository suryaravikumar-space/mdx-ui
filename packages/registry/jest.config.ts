import type { Config } from "jest"

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  moduleNameMapper: {
    "^@/lib/utils$": "<rootDir>/src/lib/utils.ts",
    "\\.css$": "<rootDir>/src/__mocks__/fileMock.ts",
    "^mermaid$": "<rootDir>/src/__mocks__/mermaid.ts",
    "^katex$": "<rootDir>/src/__mocks__/katex.ts",
  },
  testMatch: ["**/src/__tests__/**/*.test.tsx"],
}

export default config
