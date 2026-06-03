import { mkdtemp, mkdir, remove, writeFile } from "fs-extra";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  extractComponentNames,
  extractRegistered,
  scanMdxComponents,
} from "../utils/scan-mdx.js";

describe("extractComponentNames", () => {
  it("detects uppercase JSX tags", () => {
    const names = extractComponentNames(
      "<Callout>Text</Callout><Chart data={[]} />",
    );

    expect([...names].sort()).toEqual(["Callout", "Chart"]);
  });

  it("ignores lowercase HTML tags", () => {
    const names = extractComponentNames("<div><span>Text</span><Card /></div>");

    expect([...names]).toEqual(["Card"]);
  });

  it("ignores tags inside fenced code blocks", () => {
    const names = extractComponentNames(
      ["```mdx", "<HiddenCard />", "```", "<VisibleCard />"].join("\n"),
    );

    expect([...names]).toEqual(["VisibleCard"]);
  });

  it("ignores tags inside inline code", () => {
    const names = extractComponentNames(
      "Use `<InlineCard />` but render <RealCard />.",
    );

    expect([...names]).toEqual(["RealCard"]);
  });

  it("handles multiple components on one line", () => {
    const names = extractComponentNames("<Alpha /><Beta><Gamma /></Beta>");

    expect([...names].sort()).toEqual(["Alpha", "Beta", "Gamma"]);
  });
});

describe("extractRegistered", () => {
  it("parses named imports from mdx-components.tsx source", () => {
    const registered = extractRegistered(
      'import { Callout, Chart } from "./docsui";',
    );

    expect([...registered].sort()).toEqual(["Callout", "Chart"]);
  });

  it("handles multi-line import blocks and aliases", () => {
    const registered = extractRegistered(
      [
        "import {",
        "  Callout,",
        "  Chart as DataChart,",
        "} from './docsui';",
      ].join("\n"),
    );

    expect([...registered].sort()).toEqual(["Callout", "DataChart"]);
  });

  it("parses component map values", () => {
    const registered = extractRegistered(
      "export const components = { callout: Callout, chart: Chart };",
    );

    expect([...registered].sort()).toEqual(["Callout", "Chart"]);
  });
});

describe("scanMdxComponents", () => {
  const tempDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(tempDirs.map((dir) => remove(dir)));
    tempDirs.length = 0;
  });

  const createProject = async (): Promise<string> => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "docsui-scan-"));
    tempDirs.push(cwd);
    await mkdir(path.join(cwd, "src", "components", "docsui"), {
      recursive: true,
    });
    await mkdir(path.join(cwd, "content"), { recursive: true });
    return cwd;
  };

  it("returns an empty array when all components are registered", async () => {
    const cwd = await createProject();
    await writeFile(
      path.join(cwd, "src", "components", "docsui", "mdx-components.tsx"),
      'import { Callout } from "./callout";\nexport const components = { callout: Callout };',
    );
    await writeFile(
      path.join(cwd, "content", "page.mdx"),
      "<Callout>Done</Callout>",
    );

    await expect(scanMdxComponents(cwd)).resolves.toEqual([]);
  });

  it("returns warnings for unregistered components", async () => {
    const cwd = await createProject();
    await writeFile(
      path.join(cwd, "src", "components", "docsui", "mdx-components.tsx"),
      'import { Callout } from "./callout";',
    );
    await writeFile(
      path.join(cwd, "content", "page.mdx"),
      "<Callout /><MissingWidget />",
    );

    await expect(scanMdxComponents(cwd)).resolves.toEqual([
      {
        file: path.join("content", "page.mdx"),
        missing: [{ name: "MissingWidget", installAs: "missing-widget" }],
      },
    ]);
  });
});
