const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ui/ProductsPage');

test.describe('Smoke @smoke', () => {
  test('TC-UI-01 homepage loads and shows products @smoke', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.open();
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
  });

  test('TC-UI-02 search returns relevant results @smoke', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.open();
    await products.search('Hammer');
    await expect(page.locator('[data-test="product-name"]').first()).toContainText(
      /hammer/i
    );
  });
});
