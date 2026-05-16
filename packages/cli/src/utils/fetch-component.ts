import axios from "axios"
import fs from "fs-extra"
import path from "path"
import { readFileSync } from "fs"
import { createHash } from "crypto"
import { fileURLToPath } from "url"

const REGISTRY_BASE = "https://raw.githubusercontent.com/suryaravikumar-space/mdx-ui"

// Read CLI version at module load — used to pin registry fetches to a git tag
function getCliVersion(): string | null {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const pkg = JSON.parse(readFileSync(path.join(__dirname, "../../package.json"), "utf-8"))
    return typeof pkg.version === "string" ? pkg.version : null
  } catch {
    return null
  }
}

const CLI_VERSION = getCliVersion()

export interface ComponentData {
  name: string
  files: Array<{
    path: string
    content: string
    integrity?: string
  }>
  dependencies?: string[]
  registryDependencies?: string[]
}

function verifyIntegrity(data: ComponentData): void {
  for (const file of data.files) {
    if (!file.integrity) continue
    const [algo, expected] = file.integrity.split("-")
    if (algo !== "sha256") continue
    const actual = createHash("sha256").update(file.content).digest("base64")
    if (actual !== expected) {
      throw new Error(
        `Integrity check failed for "${file.path}" in component "${data.name}". ` +
        `The registry may be compromised. Aborting.`
      )
    }
  }
}

export async function fetchComponent(name: string): Promise<ComponentData> {
  // 1. Try local registry first (development / monorepo)
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const possiblePaths = [
      path.join(__dirname, "../../../../registry/mdx", `${name}.json`),
      path.join(__dirname, "../../../registry/mdx", `${name}.json`),
      path.join(__dirname, "../../registry/mdx", `${name}.json`),
    ]
    for (const registryPath of possiblePaths) {
      if (await fs.pathExists(registryPath)) {
        return await fs.readJSON(registryPath)
      }
    }
  } catch {
    // fall through to remote
  }

  // 2. Remote: try versioned tag first, then fall back to main.
  //    If the tag doesn't exist yet (new publish before git tag is pushed),
  //    the versioned URL returns 404 and we transparently use main.
  const candidates: string[] = []
  if (CLI_VERSION) {
    candidates.push(`${REGISTRY_BASE}/v${CLI_VERSION}/registry/mdx/${name}.json`)
  }
  candidates.push(`${REGISTRY_BASE}/main/registry/mdx/${name}.json`)

  for (let i = 0; i < candidates.length; i++) {
    const url = candidates[i]
    const isLast = i === candidates.length - 1

    try {
      const response = await axios.get(url)
      const data: ComponentData = response.data
      verifyIntegrity(data)
      return data
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        if (!isLast) continue // tag doesn't exist yet — try main
        throw new Error(`Component "${name}" not found. Run: npx @ravikumarsurya/mdx-ui list`)
      }
      throw new Error(`Could not fetch "${name}" — check your internet connection`)
    }
  }

  // unreachable, but satisfies TypeScript
  throw new Error(`Could not fetch "${name}" — check your internet connection`)
}
