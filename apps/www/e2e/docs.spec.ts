import { test, expect } from "@playwright/test";

test.describe("Docs pages", () => {
  test("docs index page loads", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveURL(/\/docs/);
    await expect(
      page.locator("main, article, [role=main]").first(),
    ).toBeVisible();
  });

  test("docs page has at least one heading", async ({ page }) => {
    await page.goto("/docs");
    const headings = page.getByRole("heading");
    await expect(headings.first()).toBeVisible();
  });

  test("docs/installation page loads", async ({ page }) => {
    const response = await page.goto("/docs/installation");
    expect(response?.status()).not.toBe(404);
    await expect(page).toHaveURL(/\/docs\/installation/);
  });

  test("docs/installation has Installation heading", async ({ page }) => {
    await page.goto("/docs/installation");
    await expect(
      page.getByRole("heading", { name: /installation/i }).first(),
    ).toBeVisible();
  });

  test("docs sidebar is present", async ({ page }) => {
    await page.goto("/docs");
    const nav = page.locator("nav, aside, [role=navigation]").first();
    await expect(nav).toBeVisible();
  });

  test("docs/installation page has code blocks", async ({ page }) => {
    await page.goto("/docs/installation");
    const codeBlock = page.locator("pre, code").first();
    await expect(codeBlock).toBeVisible();
  });

  test("integration/nextjs page loads", async ({ page }) => {
    const response = await page.goto("/docs/integration/nextjs");
    expect(response?.status()).not.toBe(404);
  });

  test("integration/astro page loads", async ({ page }) => {
    const response = await page.goto("/docs/integration/astro");
    expect(response?.status()).not.toBe(404);
  });
});

test.describe("Components page", () => {
  test("components index page loads", async ({ page }) => {
    await page.goto("/components");
    await expect(page).toHaveURL(/\/components/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("components page has a heading", async ({ page }) => {
    await page.goto("/components");
    await expect(page.getByRole("heading").first()).toBeVisible();
  });
});
