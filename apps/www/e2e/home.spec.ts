import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the main heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Beautiful MDX Components",
    );
  });

  test("renders the Get Started CTA link", async ({ page }) => {
    const cta = page.getByRole("link", { name: /get started/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/docs");
  });

  test("renders the Browse Components link", async ({ page }) => {
    const link = page.getByRole("link", { name: /browse components/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/components");
  });

  test("renders the three feature cards", async ({ page }) => {
    await expect(page.getByText("Beautiful by Default")).toBeVisible();
    await expect(page.getByText("Copy & Paste")).toBeVisible();
    await expect(page.getByText("Fully Customizable")).toBeVisible();
  });

  test("Installation Guide link points to correct path", async ({ page }) => {
    const link = page.getByRole("link", { name: /installation guide/i });
    await expect(link).toHaveAttribute("href", "/docs/installation");
  });

  test("navigates to /docs when Get Started is clicked", async ({ page }) => {
    await page.getByRole("link", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test("navigates to /components when Browse Components is clicked", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /browse components/i }).click();
    await expect(page).toHaveURL(/\/components/);
  });

  test("page title is set", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });
});
