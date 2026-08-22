const { BasePage } = require('./BasePage');

class ProductsPage extends BasePage {
  async open() {
    await this.goto('/');
  }

  async search(term) {
    await this.fillTestId('search-query', term);
    await this.clickTestId('search-submit');
  }

  async openFirstProduct() {
    await this.page.locator('[data-test="product-name"]').first().click();
  }

  async addToCartFromListing(index = 0) {
    await this.page.locator('[data-test="add-to-cart"]').nth(index).click();
  }

  // On the product detail page
  async setQuantity(qty) {
    const qtyInput = await this.byTestId('quantity');
    await qtyInput.fill(String(qty));
  }

  async addToCartFromDetail() {
    await this.clickTestId('add-to-cart');
  }

  async goToCart() {
    await this.clickTestId('nav-cart');
  }
}

module.exports = { ProductsPage };
