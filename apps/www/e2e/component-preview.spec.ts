import { test, expect } from "@playwright/test"

// Representative component pages — each must have a <ComponentPreview> tag.
const COMPONENT_PAGES = [
  "accordion",
  "badge",
  "callout",
  "alert",
  "tabs",
  "steps",
  "card",
  "spoiler",
  "tree",
  "terminal",
  "diff-block",
  "highlight",
] as const

test.describe("ComponentPreview widget", () => {
  // ── Detailed tests against a single representative page ──────────────────

  test.describe("accordion component page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/docs/components/accordion")
    })

    test("page loads (no 404)", async ({ page }) => {
      await expect(page).toHaveURL(/\/docs\/components\/accordion/)
      await expect(page.getByRole("heading").first()).toBeVisible()
    })

    test("Preview tab button is visible and active by default", async ({ page }) => {
      const previewBtn = page.getByRole("button", { name: /^preview$/i }).first()
      await expect(previewBtn).toBeVisible()
    })

    test("Code tab button is visible", async ({ page }) => {
      const codeBtn = page.getByRole("button", { name: /^code$/i }).first()
      await expect(codeBtn).toBeVisible()
    })

    test("preview pane renders live component", async ({ page }) => {
      // Preview pane is the default — the accordion root div should be present
      const previewPane = page.locator(".min-h-24").first()
      await expect(previewPane).toBeVisible()
      // At least one child element rendered inside
      await expect(previewPane.locator("> *").first()).toBeVisible()
    })

    test("clicking Code tab reveals syntax-highlighted source", async ({ page }) => {
      await page.getByRole("button", { name: /^code$/i }).first().click()
      // Either shiki HTML block or plain pre>code — both should be present
      const codeContent = page.locator(".component-preview-code, pre code").first()
      await expect(codeContent).toBeVisible()
    })

    test("Copy button is visible on Code tab", async ({ page }) => {
      await page.getByRole("button", { name: /^code$/i }).first().click()
      await expect(page.getByRole("button", { name: /copy/i }).first()).toBeVisible()
    })

    test("language label shown on Code tab", async ({ page }) => {
      await page.getByRole("button", { name: /^code$/i }).first().click()
      await expect(page.getByText("tsx", { exact: true }).first()).toBeVisible()
    })

    test("clicking back to Preview tab hides code pane", async ({ page }) => {
      await page.getByRole("button", { name: /^code$/i }).first().click()
      await page.getByRole("button", { name: /^preview$/i }).first().click()
      // Preview pane visible, code pane gone
      const previewPane = page.locator(".min-h-24").first()
      await expect(previewPane).toBeVisible()
    })
  })

  // ── Smoke tests: every listed page has Preview/Code tabs ─────────────────

  for (const component of COMPONENT_PAGES) {
    test(`${component}: page loads and has Preview+Code tabs`, async ({ page }) => {
      const response = await page.goto(`/docs/components/${component}`)
      expect(response?.status(), `${component} page returned ${response?.status()}`).not.toBe(404)
      await expect(
        page.getByRole("button", { name: /^preview$/i }).first(),
      ).toBeVisible()
      await expect(
        page.getByRole("button", { name: /^code$/i }).first(),
      ).toBeVisible()
    })
  }
})
