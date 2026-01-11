import { test, expect } from "@playwright/test";

// Mock icon URLs for testing
const mockIconUrls = [
  "https://static.thenounproject.com/png/1-200.png",
  "https://static.thenounproject.com/png/2-200.png",
  "https://static.thenounproject.com/png/3-200.png",
];

test.describe("Mobile Color Picker", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the search API to avoid dependency on external Noun Project API
    await page.route("**/api/search**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockIconUrls),
      });
    });
  });

  test("should show collapsible color picker on mobile viewport", async ({
    page,
  }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate directly to images page with query params
    await page.goto("/images?s=test&l=en", { waitUntil: "networkidle" });

    // Wait for icons to load
    await expect(page.locator("img").first()).toBeVisible({ timeout: 10000 });

    // On mobile, should see a COLOR button instead of the full picker
    const colorButton = page.getByRole("button", { name: /color/i });
    await expect(colorButton).toBeVisible();

    // The full color picker should NOT be visible initially on mobile
    // (it's hidden with md:hidden on the wrapper, shown only in modal)
    const colorPickerDialog = page.getByRole("dialog");
    await expect(colorPickerDialog).not.toBeVisible();

    // Click the color button to open the modal
    await colorButton.click();

    // Now the dialog should be visible
    await expect(colorPickerDialog).toBeVisible();

    // Check that the modal has the correct ARIA attributes
    await expect(colorPickerDialog).toHaveAttribute("aria-modal", "true");

    // The "Select Color" heading should be visible
    await expect(
      page.getByRole("heading", { name: /select color/i }),
    ).toBeVisible();

    // The "Done" button should be visible
    const doneButton = page.getByRole("button", { name: /done/i });
    await expect(doneButton).toBeVisible();

    // Click Done to close the modal
    await doneButton.click();

    // Modal should be closed
    await expect(colorPickerDialog).not.toBeVisible();
  });

  test("should close color picker modal with escape key", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate directly to images page
    await page.goto("/images?s=test&l=en", { waitUntil: "networkidle" });

    // Wait for icons to load
    await expect(page.locator("img").first()).toBeVisible({ timeout: 10000 });

    // Open the color picker
    const colorButton = page.getByRole("button", { name: /color/i });
    await colorButton.click();

    // Verify modal is open
    const colorPickerDialog = page.getByRole("dialog");
    await expect(colorPickerDialog).toBeVisible();

    // Press Escape key to close
    await page.keyboard.press("Escape");

    // Modal should be closed
    await expect(colorPickerDialog).not.toBeVisible();
  });

  test("should close color picker modal when clicking backdrop", async ({
    page,
  }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate directly to images page
    await page.goto("/images?s=test&l=en", { waitUntil: "networkidle" });

    // Wait for icons to load
    await expect(page.locator("img").first()).toBeVisible({ timeout: 10000 });

    // Open the color picker
    const colorButton = page.getByRole("button", { name: /color/i });
    await colorButton.click();

    // Verify modal is open
    const colorPickerDialog = page.getByRole("dialog");
    await expect(colorPickerDialog).toBeVisible();

    // Click on the backdrop (the semi-transparent overlay)
    // The backdrop is the first child div with bg-black/50
    await page.locator(".bg-black\\/50").click();

    // Modal should be closed
    await expect(colorPickerDialog).not.toBeVisible();
  });

  test("should show inline color picker on desktop viewport", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Navigate directly to images page
    await page.goto("/images?s=test&l=en", { waitUntil: "networkidle" });

    // Wait for icons to load
    await expect(page.locator("img").first()).toBeVisible({ timeout: 10000 });

    // On desktop, the color picker should be visible inline (not in a modal)
    // The mobile color button should be hidden
    const colorButton = page.getByRole("button", { name: /^color$/i });
    await expect(colorButton).not.toBeVisible();

    // The color picker component should be visible directly
    // Look for the hu-color-picker class from the vue-colorpicker library
    const colorPicker = page.locator(".hu-color-picker");
    await expect(colorPicker).toBeVisible({ timeout: 5000 });
  });
});
