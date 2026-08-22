# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: PrismStructure\tests\api\auth-cart-invoice.spec.js >> API Regression @regression >> TC-API-03 full cart-to-invoice flow with a bearer token @regression
- Location: PrismStructure\tests\api\auth-cart-invoice.spec.js:35:3

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1  | // AuthApiClient wraps Playwright's APIRequestContext for the Toolshop
  2  | // auth endpoints. Field names below follow the Toolshop Swagger docs
  3  | // (https://api.practicesoftwaretesting.com/api/documentation) as of the
  4  | // assignment brief — VERIFY against the live Swagger UI before relying on
  5  | // them; the assignment's own example payload (see InvoiceApiClient) is the
  6  | // one piece confirmed directly from the doc.
  7  | 
  8  | class AuthApiClient {
  9  |   constructor(request) {
  10 |     this.request = request;
  11 |   }
  12 | 
  13 |   async register(user) {
> 14 |     return this.request.post('/users/register', {
     |                         ^ TypeError: apiRequestContext.post: Invalid URL
  15 |       data: {
  16 |         first_name: user.firstName,
  17 |         last_name: user.lastName,
  18 |         dob: user.dob,
  19 |         address: user.address,
  20 |         city: user.city,
  21 |         state: user.state,
  22 |         country: user.country,
  23 |         postcode: user.postcode,
  24 |         phone: user.phone,
  25 |         email: user.email,
  26 |         password: user.password,
  27 |       },
  28 |     });
  29 |   }
  30 | 
  31 |   async login(email, password) {
  32 |     return this.request.post('/users/login', {
  33 |       data: { email, password },
  34 |     });
  35 |   }
  36 | 
  37 |   async me(token) {
  38 |     return this.request.get('/account', {
  39 |       headers: { Authorization: `Bearer ${token}` },
  40 |     });
  41 |   }
  42 | 
  43 |   async logout(token) {
  44 |     return this.request.post('/users/logout', {
  45 |       headers: { Authorization: `Bearer ${token}` },
  46 |     });
  47 |   }
  48 | }
  49 | 
  50 | module.exports = { AuthApiClient };
  51 | 
```