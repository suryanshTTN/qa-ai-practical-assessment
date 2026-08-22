# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\auth-cart-invoice.spec.js >> API Regression @regression >> TC-API-03 full cart-to-invoice flow with a bearer token @regression
- Location: tests\api\auth-cart-invoice.spec.js:35:3

# Error details

```
Error: {"billing_country":["The billing_country does not match the entered address. The city does not belong to the selected country."]}

expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 422
```