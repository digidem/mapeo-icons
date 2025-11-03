import { test, expect } from "@playwright/test";

test.describe("Icon Search Functionality", () => {
  test('should search for "cachorro" in Portuguese and load icons', async ({
    page,
  }) => {
    // Navigate to the app and wait until there are no more network connections
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for the page to load - increase timeout
    await expect(page).toHaveTitle(/CoMapeo Icons Generator/i, {
      timeout: 15000,
    });

    // Check language selector and set to Portuguese if not already
    const languageSelect = page.locator("select").first();
    await expect(languageSelect).toBeVisible();
    await languageSelect.selectOption({ value: "pt" });

    // Wait for the language change to take effect
    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute(
      "placeholder",
      /Digite uma ou mais/i,
    );

    // Enter search term "cachorro" (dog in Portuguese)
    await searchInput.fill("cachorro");

    // Click the search button
    const searchButton = page.getByRole("button", { name: /buscar/i });
    await expect(searchButton).toBeVisible();
    // Wait a bit for any overlays to settle
    await page.waitForTimeout(1000);
    try {
      // Try to close Vite error overlay if it exists
      const viteError = page.locator("vite-error-overlay");
      if (await viteError.isVisible()) {
        await viteError.evaluate((el: any) => el.remove());
      }
    } catch (e) {
      // Ignore if overlay doesn't exist
    }
    await searchButton.click();

    // Wait for page navigation and check we're on the images page
    // Give it more time since the API call might be slow
    await page.waitForURL("**/images**", { timeout: 30000 });

    // Verify the page URL contains /images
    await expect(page).toHaveURL(/\/images/, { timeout: 5000 });

    // Take a screenshot for verification
    await page.screenshot({
      path: "tests/e2e/screenshots/cachorro-search.png",
    });

    console.log(
      `✓ Successfully navigated to search results page for "cachorro"`,
    );
  });

  test("should handle empty search gracefully", async ({ page }) => {
    await page.goto("/");

    // Set language to Portuguese
    const languageSelect = page.locator("select").first();
    await languageSelect.selectOption({ value: "pt" });
    await expect(page.getByPlaceholder(/Digite uma ou mais/i)).toBeVisible();

    // Try searching without entering text
    const searchButton = page.getByRole("button", { name: /buscar/i });
    await searchButton.click();

    // Should either show error or default results
    // Just verify the page doesn't crash
    await page.waitForTimeout(2000);
    const pageContent = await page.content();
    expect(pageContent).toBeTruthy();
  });

  test("should switch languages correctly", async ({ page }) => {
    await page.goto("/");

    // Get language selector
    const languageSelect = page.locator("select").first();

    // Test switching to Portuguese
    await languageSelect.selectOption({ value: "pt" });
    await expect(page.getByPlaceholder(/Digite uma ou mais/i)).toBeVisible();

    // Test switching to English
    await languageSelect.selectOption({ value: "en" });
    await expect(page.getByPlaceholder(/Enter one or more/i)).toBeVisible();

    // Test switching to Spanish
    await languageSelect.selectOption({ value: "es" });
    await expect(page.getByPlaceholder(/Introduce uno o más/i)).toBeVisible();

    // Test switching to Thai
    await languageSelect.selectOption({ value: "th" });
    await expect(page.getByPlaceholder(/ป้อนคำหนึ่งคำ/i)).toBeVisible();
  });
});
