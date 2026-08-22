class CartApiClient {
  constructor(request) {
    this.request = request;
  }

  async createCart(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request.post('/carts', { headers });
  }

  async addItem(cartId, productId, quantity, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request.post(`/carts/${cartId}`, {
      headers,
      data: { product_id: productId, quantity },
    });
  }

  async getCart(cartId, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request.get(`/carts/${cartId}`, { headers });
  }
}

module.exports = { CartApiClient };
