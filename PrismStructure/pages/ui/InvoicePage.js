const { BasePage } = require('./BasePage');

class InvoicePage extends BasePage {
  async openMyInvoices() {
    await this.goto('/account/invoices');
  }

  async invoiceRowCount() {
    return this.page.locator('[data-test="invoice-row"]').count();
  }

  async openInvoice(index = 0) {
    await this.page.locator('[data-test="invoice-row"]').nth(index).click();
  }

  async getInvoiceTotal() {
    return this.textOfTestId('invoice-total');
  }
}

module.exports = { InvoicePage };
