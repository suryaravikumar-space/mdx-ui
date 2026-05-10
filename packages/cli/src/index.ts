#!/usr/bin/env node

import { Command } from "commander"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import prompts from "prompts"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"
import { update } from "./commands/update.js"
import { remove } from "./commands/remove.js"
import { doctor } from "./commands/doctor.js"
import { save } from "./commands/save.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8")
)

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("mdx-ui")
    .description("Add beautiful MDX components to your project")
    .version(
      packageJson.version || "0.0.1",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init).addCommand(add).addCommand(list).addCommand(update).addCommand(remove).addCommand(doctor).addCommand(save)

  // Interactive menu when run with no subcommand
  if (process.argv.length <= 2) {
    console.log()
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { title: "Add components", value: "add", description: "Add MDX components to your project" },
        { title: "Update components", value: "update", description: "Update installed components to latest" },
        { title: "Initialize project", value: "init", description: "Set up mdx-ui in your project" },
        { title: "Remove components", value: "remove", description: "Remove installed components from your project" },
        { title: "List components", value: "list", description: "Show all available components" },
        { title: "Doctor", value: "doctor", description: "Check project health — missing deps, broken imports" },
        { title: "Save MDX", value: "save", description: "Save an MDX string to a structured .ai.mdx file" },
      ],
    })
    if (!action) process.exit(0)
    process.argv.push(action)
  }

  program.parse()
}

main()
