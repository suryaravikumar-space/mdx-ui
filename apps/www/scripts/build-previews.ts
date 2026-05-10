/**
 * Codegen script: reads components/demos/*.tsx, highlights each with shiki,
 * and writes components/demo-sources.generated.ts.
 *
 * Run: tsx scripts/build-previews.ts
 */
import { codeToHtml } from "shiki"
import { readdirSync, readFileSync, writeFileSync } from "fs"
import { join, basename } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const root = join(__dirname, "..")
const demosDir = join(root, "components", "demos")
const outFile = join(root, "components", "demo-sources.generated.ts")

function escapeTemplateLiteral(s: string): string {
  return s
    .replace(/\\/g, "\\\\") // backslash first
    .replace(/`/g, "\\`") // backtick
    .replace(/\$\{/g, "\\${") // template expression open
}

async function main() {
  const files = readdirSync(demosDir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()

  const lines: string[] = [
    "// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.",
    "// Run `tsx scripts/build-previews.ts` to regenerate.",
    "// NOTE: This file is generated but committed to the repository.",
    "",
    "export const DEMO_SOURCES: Record<string, { source: string; highlighted: string }> = {",
  ]

  for (const file of files) {
    const name = basename(file, ".tsx")
    const source = readFileSync(join(demosDir, file), "utf-8")

    const highlighted = await codeToHtml(source, {
      lang: "tsx",
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      defaultColor: false,
    })

    lines.push(`  ${JSON.stringify(name)}: {`)
    lines.push(`    source: \`${escapeTemplateLiteral(source)}\`,`)
    lines.push(`    highlighted: \`${escapeTemplateLiteral(highlighted)}\`,`)
    lines.push(`  },`)
  }

  lines.push("}")
  lines.push("")

  writeFileSync(outFile, lines.join("\n"), "utf-8")
  console.log(`Generated ${outFile} with ${files.length} demos`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
