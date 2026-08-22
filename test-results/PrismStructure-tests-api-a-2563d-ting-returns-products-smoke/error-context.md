# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: PrismStructure\tests\api\auth-cart-invoice.spec.js >> API Smoke @smoke >> TC-API-02 product listing returns products @smoke
- Location: PrismStructure\tests\api\auth-cart-invoice.spec.js:24:3

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | class ProductApiClient {
  2  |   constructor(request) {
  3  |     this.request = request;
  4  |   }
  5  | 
  6  |   async list() {
> 7  |     return this.request.get('/products');
     |                         ^ TypeError: apiRequestContext.get: Invalid URL
  8  |   }
  9  | 
  10 |   async search(query) {
  11 |     return this.request.get(`/products/search?q=${encodeURIComponent(query)}`);
  12 |   }
  13 | 
  14 |   async getById(productId) {
  15 |     return this.request.get(`/products/${productId}`);
  16 |   }
  17 | }
  18 | 
  19 | module.exports = { ProductApiClient };
  20 | 
```