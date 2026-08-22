class InvoiceApiClient {
  constructor(request) {
    this.request = request;
  }

  async generateInvoice(cartId, billing, token) {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    return this.request.post('/invoices', {
      headers,
      data: {
        billing_street: billing.street,
        billing_city: billing.city,
        billing_state: billing.state,
        billing_country: billing.country,
        billing_postal_code: billing.postalCode,
        payment_method: billing.paymentMethod || 'cash-on-delivery',
        cart_id: cartId,
        payment_details: {},
      },
    });
  }
}

module.exports = { InvoiceApiClient };