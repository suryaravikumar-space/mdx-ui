import { test, expect } from "@playwright/test"

test.describe("Site navigation", () => {
  test("page returns 200 for home route", async ({ page }) => {
    const response = await page.goto("/")
    expect(response?.status()).toBe(200)
  })

  test("page returns 200 for /docs", async ({ page }) => {
    const response = await page.goto("/docs")
    expect(response?.status()).toBe(200)
  })

  test("page returns 200 for /components", async ({ page }) => {
    const response = await page.goto("/components")
    expect(response?.status()).toBe(200)
  })

  test("no console errors on home page", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    expect(errors).toHaveLength(0)
  })

  test("no broken internal links on home page", async ({ page }) => {
    await page.goto("/")
    const links = page.getByRole("link")
    const count = await links.count()

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href")
      if (href && href.startsWith("/")) {
        const response = await page.request.get(href)
        expect(response.status(), `Link ${href} returned ${response.status()}`).not.toBe(404)
      }
    }
  })

  test("header/navbar is visible on all main pages", async ({ page }) => {
    const pages = ["/", "/docs", "/components"]
    for (const path of pages) {
      await page.goto(path)
      const header = page.locator("header, nav").first()
      await expect(header).toBeVisible()
    }
  })
})
