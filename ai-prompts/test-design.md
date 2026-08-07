# AI Prompts – Test Design

## Entry 1 – UI Test Suite Refinement

### Prompt

I manually validated the live Toolshop UI after your previous analysis.

The following flows are available without login:
- Product search
- Product filtering
- Product details
- Add product to cart
- Cart operations
- Checkout

Do not assume authentication is required for these flows.

Now refine the proposed UI test suite based on this actual observation.

Requirements:
- Maximum 8 UI test cases.
- Each test must be classified as Smoke or Regression.
- Prefer business-critical and stable scenarios.
- Avoid duplicate coverage.
- Include positive and negative coverage where valuable.
- Include the assessment-specific invoice requirement: the Confirm button must be pressed twice to generate the invoice.
- Do not include an authentication prerequisite unless the actual application requires it for that particular flow.
- Do not create or modify files.

Return a final table with:
Test ID | Scenario | Preconditions | Steps Summary | Expected Result | Smoke/Regression | Priority | Data Required | Risk Covered

Also explain which previously proposed scenarios you removed or changed and why.

### AI Response Summary

The refined UI suite contains 8 scenarios:

| ID | Scenario | Type | Priority |
|---|---|---|---|
| UI-01 | Search for an existing product | Smoke | P0 |
| UI-02 | Search with no matching results | Regression | P1 |
| UI-03 | Filter products by category | Regression | P1 |
| UI-04 | View product details | Smoke | P0 |
| UI-05 | Add an in-stock product to cart | Smoke | P0 |
| UI-06 | Update quantity and remove cart item | Regression | P0 |
| UI-07 | Prevent checkout progression with missing required data | Regression | P0 |
| UI-08 | Complete guest checkout and generate invoice by confirming twice | Smoke | P0 |

### Validation Notes

The participant manually verified that the main catalog, filtering, product, cart and checkout flows are accessible without login.

The suite was refined to:
- Remove authentication cases from the limited UI suite.
- Use guest checkout.
- Include negative checkout validation.
- Include no-result search coverage.
- Avoid unstable brand-dependent filtering.
- Include the assessment-specific double-confirm invoice behavior.
- Keep invoice verification within the checkout flow to avoid duplicate persistent purchases.

UI-08 creates persistent invoice/order data and should therefore be executed only with appropriate authorization and preferably once per execution.


## Entry 2 – API Test Design

### Prompt

We have finalized the UI manual test suite for the Practice Software Testing Toolshop.

Now switch to API testing.

API documentation:
https://api.practicesoftwaretesting.com/api/documentation

Do not create or modify files.
Do not write automation code yet.

Focus on the core customer lifecycle:
1. Authentication
2. Product retrieval/search
3. Cart creation
4. Adding products to cart
5. Cart retrieval/update
6. Checkout/invoice generation
7. Error handling
8. Authorization

Identify the most valuable 5–8 API test scenarios.

For each scenario provide:
- Test ID
- API endpoint and HTTP method
- Scenario
- Preconditions
- Request data
- Expected status code
- Important response validations
- Smoke/Regression
- Priority
- Risk covered
- Whether the test creates persistent data
- Cleanup requirement

Important:
- Do not invent endpoint paths or request schemas.
- Use the current API documentation.
- Do not expose real credentials or sensitive data.
- Prefer dynamically generated test data.
- Avoid destructive admin operations unless required.
- Consider token/authentication dependencies.
- Include at least one negative/error-handling scenario.
- Keep the final suite within 5–8 API cases.

Return only the proposed API test suite and your reasoning for selecting/removing scenarios.

### AI Response Summary

Cursor proposed 8 API scenarios covering the customer lifecycle:

- TC-API-01: Valid customer authentication
- TC-API-02: Product retrieval and search
- TC-API-03: Cart creation
- TC-API-04: Add an in-stock product to cart
- TC-API-05: Update cart quantity and retrieve cart
- TC-API-06: Guest checkout and invoice generation
- TC-API-07: Reject invalid cart quantity
- TC-API-08: Authorization and token validation

The suite uses dynamically obtained product and cart identifiers instead of hardcoded IDs and includes both positive and negative coverage.

Registration and destructive/admin operations were excluded to avoid unnecessary persistent data and to keep the suite focused on the core purchase lifecycle.

### Validation Notes

The API scenarios will be validated against the current API documentation and live API behavior before automation.

Special attention will be given to:
- Actual endpoint paths and methods
- Expected status codes
- Authentication requirements
- Request and response schemas
- Cleanup operations
- Persistent invoice creation
- Token handling and sensitive-data protection

## Entry 3 – API Validation

### Prompt

Validate the planned API test scenarios against the current Practice Software Testing API documentation and live API where safe.

Do not invent undocumented request fields, response fields, status codes, or cleanup operations.

Identify differences between the planned test cases and the actual API contract.

### AI Response Summary

The validation confirmed the documented endpoint paths and identified several areas requiring refinement.

TC-API-04 was refined because the POST cart response documents only a result field. Product and quantity verification will be performed through subsequent cart retrieval.

TC-API-05 was refined because the current API specification does not fully document cart-item quantity and total fields in the GET cart response. These fields will only be asserted after confirming their actual live response structure.

TC-API-06 was marked as requiring controlled live execution because invoice creation is persistent and no invoice deletion endpoint is documented.

TC-API-07 was marked for exploratory validation because the specification documents a 422 response but does not explicitly define a minimum quantity of 1.

TC-API-08 confirmed that unauthenticated access to /users/me returns 401. The authenticated 200 flow will be executed using secure credentials without exposing the token.

### Validation Notes

The AI output was reviewed rather than copied directly into the final test suite.

The final API cases were updated to avoid asserting undocumented response fields and to distinguish verified behavior from assumptions that still require live execution.