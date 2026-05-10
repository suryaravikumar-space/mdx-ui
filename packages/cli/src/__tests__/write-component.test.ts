import { describe, it, expect, vi, beforeEach } from "vitest"
import { writeComponent } from "../utils/write-component.js"
import type { ComponentData } from "../utils/fetch-component.js"
import type { Config } from "../utils/get-config.js"

vi.mock("fs-extra", () => ({
  default: {
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
  },
}))

import fs from "fs-extra"
const mockEnsureDir = vi.mocked(fs.ensureDir)
const mockWriteFile = vi.mocked(fs.writeFile)

beforeEach(() => {
  vi.resetAllMocks()
  mockEnsureDir.mockResolvedValue(undefined as never)
  mockWriteFile.mockResolvedValue(undefined as never)
})

const baseConfig: Config = {
  componentsDir: "src/components/mdx-ui",
  typescript: true,
  tailwind: true,
}

const baseComponent: ComponentData = {
  name: "callout",
  files: [
    { path: "callout.tsx", content: '"use client"\n\nexport function Callout() {}' },
  ],
}

describe("writeComponent", () => {
  it("writes each file to the componentsDir", async () => {
    await writeComponent(baseComponent, baseConfig)
    expect(mockWriteFile).toHaveBeenCalledTimes(1)
    const [filePath] = mockWriteFile.mock.calls[0] as [string, ...unknown[]]
    expect(filePath).toContain("src/components/mdx-ui")
    expect(filePath).toContain("callout.tsx")
  })

  it("calls ensureDir before writing", async () => {
    await writeComponent(baseComponent, baseConfig)
    expect(mockEnsureDir).toHaveBeenCalledTimes(1)
  })

  it("preserves 'use client' directive for non-react frameworks", async () => {
    await writeComponent(baseComponent, baseConfig)
    const [, content] = mockWriteFile.mock.calls[0] as [string, string, ...unknown[]]
    expect(content).toContain('"use client"')
  })

  it("strips 'use client' directive when framework is react", async () => {
    const reactConfig = { ...baseConfig, framework: "react" } as Config & { framework: string }
    await writeComponent(baseComponent, reactConfig)
    const [, content] = mockWriteFile.mock.calls[0] as [string, string, ...unknown[]]
    expect(content).not.toContain('"use client"')
    expect(content).toContain("export function Callout")
  })

  it("writes multiple files for a component with multiple sources", async () => {
    const multiFile: ComponentData = {
      name: "tabs",
      files: [
        { path: "tabs.tsx", content: "export function Tabs() {}" },
        { path: "tabs-list.tsx", content: "export function TabsList() {}" },
      ],
    }
    await writeComponent(multiFile, baseConfig)
    expect(mockWriteFile).toHaveBeenCalledTimes(2)
  })

  it("does nothing when files array is empty", async () => {
    const empty: ComponentData = { name: "empty", files: [] }
    await writeComponent(empty, baseConfig)
    expect(mockWriteFile).not.toHaveBeenCalled()
    expect(mockEnsureDir).not.toHaveBeenCalled()
  })

  it("writes file content as utf-8", async () => {
    await writeComponent(baseComponent, baseConfig)
    const [, , encoding] = mockWriteFile.mock.calls[0] as [string, string, string]
    expect(encoding).toBe("utf-8")
  })
})
