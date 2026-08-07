const { test, expect } = require('@playwright/test');

test('@Smoke - Toolshop homepage loads successfully', async ({ page }) => {
  const response = await page.goto('/');

  expect(response).not.toBeNull();
  expect(response.ok()).toBeTruthy();

  await expect(page.locator('body')).toContainText('Products');
});