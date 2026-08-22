const { BasePage } = require('./BasePage');

// Known app quirk (per assessment doc): the invoice confirm button must be
// pressed TWICE to actually generate the invoice / invoice id. This is
// modeled explicitly in confirmInvoiceTwice() instead of being buried as a
// silent double-click, so it's visible in test reports and in this file.
class CheckoutPage extends BasePage {
  async signInStep() {
    // Step where the app confirms you're logged in before address step
    await this.clickTestId('proceed-2');
  }

  async fillBillingAddress(address) {
    await this.fillTestId('address', address.street);
    await this.fillTestId('city', address.city);
    await this.fillTestId('state', address.state);
    await this.fillTestId('country', address.country);
    await this.fillTestId('postcode', address.postcode);
    await this.clickTestId('proceed-3');
  }

  async choosePaymentMethod(method = 'cash-on-delivery') {
    await this.page.locator('[data-test="payment-method"]').selectOption(method);
    await this.clickTestId('confirm');
  }

  // KNOWN QUIRK: press confirm twice to generate the invoice.
  async confirmInvoiceTwice() {
    await this.clickTestId('confirm');
    await this.clickTestId('confirm');
  }
}

module.exports = { CheckoutPage };
