import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  detectFramework,
  detectProjectStructure,
} from "../utils/detect-structure.js";

// Mock fs-extra so no real filesystem reads happen
vi.mock("fs-extra", () => ({
  default: {
    pathExists: vi.fn(),
    readJSON: vi.fn(),
  },
}));

import fs from "fs-extra";
const mockPathExists = vi.mocked(fs.pathExists);
const mockReadJSON = vi.mocked(fs.readJSON);

// Helper: reset all mocks and set a default (nothing exists)
beforeEach(() => {
  vi.resetAllMocks();
  mockPathExists.mockResolvedValue(false as never);
});

// ─── detectFramework ─────────────────────────────────────────────────────────

describe("detectFramework", () => {
  it("returns 'unknown' when package.json does not exist", async () => {
    mockPathExists.mockResolvedValue(false as never);
    expect(await detectFramework("/fake/cwd")).toBe("unknown");
  });

  it("returns 'nextjs' when 'next' is in dependencies", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { next: "15.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("nextjs");
  });

  it("returns 'nextjs' when 'next' is in devDependencies", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      devDependencies: { next: "15.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("nextjs");
  });

  it("returns 'astro' when 'astro' is in dependencies", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { astro: "4.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("astro");
  });

  it("returns 'react' when 'react' is in dependencies (no next/astro)", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { react: "18.0.0", "react-dom": "18.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("react");
  });

  it("returns 'react' when only 'react-dom' is present", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { "react-dom": "18.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("react");
  });

  it("returns 'unknown' when package.json has no recognised deps", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { lodash: "4.17.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("unknown");
  });

  it("next takes priority over react when both present", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      dependencies: { next: "15.0.0", react: "18.0.0" },
    } as never);
    expect(await detectFramework("/fake/cwd")).toBe("nextjs");
  });
});

// ─── detectProjectStructure ───────────────────────────────────────────────────

describe("detectProjectStructure", () => {
  it("detects src/ layout when src directory exists", async () => {
    mockPathExists.mockImplementation(async (p: unknown) => {
      const s = String(p);
      if (s.endsWith("/src")) return true;
      if (s.endsWith("package.json")) return true;
      return false;
    });
    mockReadJSON.mockResolvedValue({
      dependencies: { next: "15.0.0" },
    } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasSrc).toBe(true);
    expect(result.componentsDir).toContain("src/");
    expect(result.libDir).toBe("src/lib");
  });

  it("detects root-level layout when src does not exist", async () => {
    mockPathExists.mockImplementation(async (p: unknown) => {
      const s = String(p);
      if (s.endsWith("/src")) return false;
      if (s.endsWith("package.json")) return true;
      return false;
    });
    mockReadJSON.mockResolvedValue({ dependencies: {} } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasSrc).toBe(false);
    expect(result.componentsDir).not.toContain("src/");
    expect(result.libDir).toBe("lib");
  });

  it("sets hasTypeScript=true when tsconfig.json exists", async () => {
    mockPathExists.mockImplementation(
      async (p: unknown) => String(p).endsWith("tsconfig.json") as never,
    );
    mockReadJSON.mockResolvedValue({ dependencies: {} } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasTypeScript).toBe(true);
  });

  it("sets hasTypeScript=false when tsconfig.json is absent", async () => {
    mockPathExists.mockResolvedValue(false as never);
    mockReadJSON.mockResolvedValue({ dependencies: {} } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasTypeScript).toBe(false);
  });

  it("sets hasTailwind=true when tailwind.config.ts exists", async () => {
    mockPathExists.mockImplementation(
      async (p: unknown) => String(p).includes("tailwind.config.ts") as never,
    );
    mockReadJSON.mockResolvedValue({ dependencies: {} } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasTailwind).toBe(true);
  });

  it("sets hasTailwind=false when no tailwind config exists", async () => {
    mockPathExists.mockResolvedValue(false as never);
    mockReadJSON.mockResolvedValue({ dependencies: {} } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasTailwind).toBe(false);
  });

  it("astro framework forces src/ layout regardless of src directory", async () => {
    mockPathExists.mockImplementation(async (p: unknown) => {
      if (String(p).endsWith("package.json")) return true;
      return false; // no src dir
    });
    mockReadJSON.mockResolvedValue({
      dependencies: { astro: "4.0.0" },
    } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.hasSrc).toBe(true);
    expect(result.componentsDir).toBe("src/components/docsui");
  });

  it("sets correct componentsDir for Next.js without src/", async () => {
    mockPathExists.mockImplementation(async (p: unknown) => {
      if (String(p).endsWith("package.json")) return true;
      return false;
    });
    mockReadJSON.mockResolvedValue({
      dependencies: { next: "15.0.0" },
    } as never);

    const result = await detectProjectStructure("/fake/cwd");
    expect(result.componentsDir).toBe("components/docsui");
    expect(result.framework).toBe("nextjs");
  });
});
