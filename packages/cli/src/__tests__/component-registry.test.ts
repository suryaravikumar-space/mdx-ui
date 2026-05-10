import { describe, it, expect } from "vitest";
import {
  COMPONENT_FILES,
  COMPONENT_DEPS,
  COMPONENT_MDX_MAP,
  FILE_TO_COMPONENT,
} from "../lib/component-registry.js";

describe("COMPONENT_FILES", () => {
  it("is a non-empty object", () => {
    expect(Object.keys(COMPONENT_FILES).length).toBeGreaterThan(0);
  });

  it("every entry is an array of strings", () => {
    for (const [name, files] of Object.entries(COMPONENT_FILES)) {
      expect(Array.isArray(files), `${name} files should be array`).toBe(true);
      for (const f of files) {
        expect(typeof f).toBe("string");
      }
    }
  });

  it("all file entries end with a valid extension", () => {
    const validExts = [".tsx", ".ts", ".js", ".css"];
    for (const files of Object.values(COMPONENT_FILES)) {
      for (const f of files) {
        expect(
          validExts.some((ext) => f.endsWith(ext)),
          `"${f}" has unexpected extension`,
        ).toBe(true);
      }
    }
  });

  it("known components are present", () => {
    const expected = ["callout", "tabs", "accordion", "code-block", "steps"];
    for (const name of expected) {
      expect(COMPONENT_FILES).toHaveProperty(name);
    }
  });
});

describe("COMPONENT_DEPS", () => {
  it("is an object", () => {
    expect(typeof COMPONENT_DEPS).toBe("object");
  });

  it("every value is an array of strings", () => {
    for (const [name, deps] of Object.entries(COMPONENT_DEPS)) {
      expect(Array.isArray(deps), `${name} deps should be array`).toBe(true);
      for (const d of deps) {
        expect(typeof d).toBe("string");
      }
    }
  });

  it("deps are valid npm package names (no empty strings)", () => {
    for (const deps of Object.values(COMPONENT_DEPS)) {
      for (const dep of deps) {
        expect(dep.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("COMPONENT_MDX_MAP", () => {
  it("is an object", () => {
    expect(typeof COMPONENT_MDX_MAP).toBe("object");
  });

  it("every entry has required shape", () => {
    for (const [name, mapping] of Object.entries(COMPONENT_MDX_MAP)) {
      expect(mapping, `${name} mapping missing importFile`).toHaveProperty(
        "importFile",
      );
      expect(mapping, `${name} mapping missing imports`).toHaveProperty(
        "imports",
      );
      expect(mapping, `${name} mapping missing elementMappings`).toHaveProperty(
        "elementMappings",
      );
      expect(
        Array.isArray(mapping.imports),
        `${name}.imports should be array`,
      ).toBe(true);
      expect(typeof mapping.elementMappings).toBe("object");
    }
  });

  it("importFile starts with ./ (relative path)", () => {
    for (const [name, mapping] of Object.entries(COMPONENT_MDX_MAP)) {
      expect(
        mapping.importFile.startsWith("./"),
        `${name}.importFile should be relative`,
      ).toBe(true);
    }
  });

  it("imports array is non-empty", () => {
    for (const [name, mapping] of Object.entries(COMPONENT_MDX_MAP)) {
      expect(
        mapping.imports.length,
        `${name}.imports should not be empty`,
      ).toBeGreaterThan(0);
    }
  });
});

describe("FILE_TO_COMPONENT", () => {
  it("is an object mapping filenames to component names", () => {
    expect(typeof FILE_TO_COMPONENT).toBe("object");
    expect(Object.keys(FILE_TO_COMPONENT).length).toBeGreaterThan(0);
  });

  it("all keys end with .tsx or .ts", () => {
    for (const key of Object.keys(FILE_TO_COMPONENT)) {
      expect(
        key.endsWith(".tsx") || key.endsWith(".ts"),
        `"${key}" should be .tsx or .ts`,
      ).toBe(true);
    }
  });

  it("all values are non-empty strings", () => {
    for (const [file, component] of Object.entries(FILE_TO_COMPONENT)) {
      expect(typeof component).toBe("string");
      expect(component.length, `${file} maps to empty string`).toBeGreaterThan(
        0,
      );
    }
  });

  it("is consistent with COMPONENT_FILES (reverse mapping)", () => {
    // Every file listed in COMPONENT_FILES should appear in FILE_TO_COMPONENT
    for (const [componentName, files] of Object.entries(COMPONENT_FILES)) {
      for (const file of files) {
        if (file.endsWith(".tsx") || file.endsWith(".ts")) {
          expect(
            FILE_TO_COMPONENT[file],
            `${file} missing from FILE_TO_COMPONENT`,
          ).toBe(componentName);
        }
      }
    }
  });
});
