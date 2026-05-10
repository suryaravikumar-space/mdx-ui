import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "^@/lib/utils$": "<rootDir>/src/lib/utils.ts",
    "^@/lib/primitives$": "<rootDir>/src/lib/primitives.ts",
    "^@/lib/motion$": "<rootDir>/src/lib/motion.tsx",
    "\\.css$": "<rootDir>/src/__mocks__/fileMock.ts",
    "^mermaid$": "<rootDir>/src/__mocks__/mermaid.ts",
    "^katex$": "<rootDir>/src/__mocks__/katex.ts",
  },
  testMatch: ["**/src/__tests__/**/*.test.tsx"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/__tests__/**",
    "!src/__mocks__/**",
    "!src/mdx/**",
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80,
    },
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "coverage",
        outputName: "junit.xml",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
      },
    ],
  ],
};

export default config;
