# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added

- MCP server: Resources (`registry://components`, `registry://component/{name}`, `registry://standard`), Prompts (`generate_mdx`, `review_mdx`), and `validate_mdx` tool
- MCP server: `list_categories` tool for grouped component discovery
- MCP server: Levenshtein-based "did you mean?" suggestions for unknown component names
- MCP server: cache TTL (5 min), local registry fallback, version from `package.json`
- `get_output_standard` MCP tool exposing the AI Output Standard system prompt
- Comprehensive MDX validator with code-fence awareness and currency false-positive avoidance
- `framework` field added to `Config` interface — removes runtime casts
- All `any` types replaced with proper TypeScript types across CLI, registry, remark-plugin, and docs site
- `LICENSE`, `SECURITY.md`, `.editorconfig`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` added
- GitHub issue templates and PR template
- `engines` and `sideEffects` fields in published packages
- Root ESLint config covering all packages
- Changesets for automated versioning and changelog

### Fixed

- `validate_mdx` no longer flags code inside fenced blocks as violations
- `search_components` vacuous-truth bug when query words are all single characters
- `loadLocalRegistry` now logs parse errors to stderr instead of silently swallowing them
- Dollar-sign math regex no longer fires on currency values like `$10`

---

## [0.0.51] — CLI / [0.0.5] — remark-plugin

Initial public release of `docsui` and `@docsui-io/remark-plugin`.
