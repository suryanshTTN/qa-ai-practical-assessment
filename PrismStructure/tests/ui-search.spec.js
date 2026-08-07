const { test, expect } = require('@playwright/test');

test('@Smoke TC-UI-01 - Search for an existing product', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.locator('[data-test="search-query"]');
  const searchButton = page.locator('[data-test="search-submit"]');

  await expect(searchInput).toBeVisible();

  await searchInput.fill('pliers');
  await searchButton.click();

  await expect(
    page.locator('[data-test^="product-"]').filter({ hasText: /pliers/i }).first()
  ).toBeVisible();

  await searchInput.fill('');
  await searchButton.click();

  await expect(searchInput).toHaveValue('');
});

test('@Regression TC-UI-02 - Search with no matching results', async ({ page }) => {
    await page.goto('/');
  
    const searchInput = page.locator('[data-test="search-query"]');
    const searchButton = page.locator('[data-test="search-submit"]');
  
    const invalidSearchTerm = `zz-no-such-tool-${Date.now()}`;
  
    await searchInput.fill(invalidSearchTerm);
    await searchButton.click();
  
    await expect(page.locator('body')).toContainText(/no products|no results|nothing/i);
  
    await searchInput.fill('');
    await searchButton.click();
  
    await expect(searchInput).toHaveValue('');
  });