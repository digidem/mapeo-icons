import { test, expect } from "@playwright/test";

/**
 * Captures screenshots for the README.
 *
 * Run:
 *   npx playwright test tests/e2e/screenshots.spec.ts --headed=false
 *
 * Output: public/screenshots/*.png (compressed to .webp afterwards)
 */

const OUTPUT_DIR = "public/screenshots";

test.describe("README screenshots", () => {
  test("search results (desktop)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/?s=dog&l=en", { waitUntil: "networkidle" });

    // Wait for at least one icon image to appear
    await expect(page.locator("img").first()).toBeVisible({
      timeout: 15000,
    });
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: `${OUTPUT_DIR}/search-results.png`,
    });
  });

  test("color picker (desktop)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/images?s=dog&l=en", { waitUntil: "networkidle" });

    await expect(page.locator("img").first()).toBeVisible({
      timeout: 15000,
    });

    // Click the first icon to select it
    await page.locator("img").first().click();
    await page.waitForTimeout(500);

    // Try to change the color (green)
    const colorInput = page.locator('input[type="color"]').first();
    if (await colorInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await colorInput.fill("#22c55e");
      await page.waitForTimeout(500);
    }

    await page.screenshot({
      path: `${OUTPUT_DIR}/color-picker.png`,
    });
  });

  test("mobile color picker", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    await page.goto("/images?s=dog&l=en", { waitUntil: "networkidle" });

    await expect(page.locator("img").first()).toBeVisible({
      timeout: 15000,
    });

    // On mobile, click the COLOR button to open the modal
    const colorButton = page.getByRole("button", { name: /color/i });
    if (await colorButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await colorButton.click();
      await page.waitForTimeout(800);
    }

    await page.screenshot({
      path: `${OUTPUT_DIR}/mobile-color-picker.png`,
    });

    await context.close();
  });
});
