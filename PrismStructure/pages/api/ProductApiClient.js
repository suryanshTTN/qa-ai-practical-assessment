class ProductApiClient {
  constructor(request) {
    this.request = request;
  }

  async list() {
    return this.request.get('/products');
  }

  async search(query) {
    return this.request.get(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getById(productId) {
    return this.request.get(`/products/${productId}`);
  }
}

module.exports = { ProductApiClient };
