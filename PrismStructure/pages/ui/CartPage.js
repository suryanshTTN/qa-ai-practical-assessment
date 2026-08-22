const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  async open() {
    await this.goto('/checkout');
  }

  async updateQuantity(rowIndex, qty) {
    await this.page.locator('[data-test="cart-quantity"]').nth(rowIndex).fill(String(qty));
  }

  async cartItemCount() {
    return this.page.locator('[data-test="cart-quantity"]').count();
  }

  async proceedToCheckout() {
    // Step 1 of the Toolshop checkout wizard
    await this.clickTestId('proceed-1');
  }
}

module.exports = { CartPage };
