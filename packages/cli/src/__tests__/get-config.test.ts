import { describe, it, expect, vi, beforeEach } from "vitest";
import { getConfig } from "../utils/get-config.js";

vi.mock("fs-extra", () => ({
  default: {
    pathExists: vi.fn(),
    readJSON: vi.fn(),
  },
}));

import fs from "fs-extra";
const mockPathExists = vi.mocked(fs.pathExists);
const mockReadJSON = vi.mocked(fs.readJSON);

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getConfig", () => {
  it("returns null when mdx-ui.json does not exist", async () => {
    mockPathExists.mockResolvedValue(false as never);
    expect(await getConfig()).toBeNull();
  });

  it("returns the parsed config when mdx-ui.json exists", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      componentsDir: "src/components/mdx-ui",
      typescript: true,
      tailwind: true,
    } as never);

    const config = await getConfig();
    expect(config).toEqual({
      componentsDir: "src/components/mdx-ui",
      typescript: true,
      tailwind: true,
    });
  });

  it("returns null when readJSON throws", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockRejectedValue(new Error("parse error") as never);

    expect(await getConfig()).toBeNull();
  });

  it("returns config with typescript=false", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      componentsDir: "components/mdx-ui",
      typescript: false,
      tailwind: false,
    } as never);

    const config = await getConfig();
    expect(config?.typescript).toBe(false);
    expect(config?.tailwind).toBe(false);
  });

  it("returns config with custom componentsDir", async () => {
    mockPathExists.mockResolvedValue(true as never);
    mockReadJSON.mockResolvedValue({
      componentsDir: "app/ui",
      typescript: true,
      tailwind: false,
    } as never);

    const config = await getConfig();
    expect(config?.componentsDir).toBe("app/ui");
  });
});
