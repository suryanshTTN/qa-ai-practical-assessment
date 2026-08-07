# AI Prompts – Requirements and Planning

## Entry 1 – Initial Application and Requirement Analysis

### Prompt

We are starting a QA AI capability assessment for the Practice Software Testing Toolshop application.

Project:
- Application: https://practicesoftwaretesting.com/
- API documentation: https://api.practicesoftwaretesting.com/api/documentation
- Automation framework: Playwright
- AI tool: Cursor
- Repository: qa-ai-practical-assessment

Assessment requirements:
- Perform requirement and risk analysis.
- Identify testable UI and API flows.
- Create a small but meaningful manual test suite.
- Categorize tests as Smoke or Regression.
- Automate selected UI and API scenarios using Playwright.
- Keep the automation maintainable and reusable.
- Use AI iteratively and validate all AI-generated suggestions against the actual application.
- Maintain prompt history in ai-prompts/.
- Keep the project within the requested 5–8 test cases per type.
- Generate execution evidence and documentation.
- Do not make assumptions about application behavior without verification.

For this first task, DO NOT create or modify any files.

Instead, inspect the provided assessment context and give me:
1. The major functional areas of the Toolshop application that should be tested.
2. The important user/business flows.
3. Potential risks.
4. Candidate UI test scenarios.
5. Candidate API test scenarios.
6. Questions or ambiguities that should be verified against the actual application.

Do not write automation code yet.

### AI Response Summary

Cursor inspected the live Toolshop application and API endpoints and identified the following major areas:

- Product catalog, pagination, search, sorting and filtering
- Product details
- Cart management
- Authentication and registration
- Customer account, favorites and invoices/orders
- Checkout and payment
- Contact/customer messaging
- API authorization and role-based access
- Administrative API resources

Important candidate business flows included:

- Browse/search/filter products and view product details
- Add and manage products in the cart
- User registration and authentication
- Favorites and customer account access
- Checkout and invoice/order generation
- API authentication and protected resources
- Customer versus administrator authorization

Cursor also identified risks around shared test data, changing product identifiers, inventory changes, checkout/payment validation, authorization, price calculations, filtering, session persistence, public-environment instability, API contract drift and destructive API testing.

It proposed eight candidate UI scenarios and eight candidate API scenarios, classified as Smoke or Regression.

### Validation Notes

The AI output will not be accepted blindly. Candidate scenarios and assumptions will be validated against the actual Toolshop UI and API before finalizing the test suite.

The final test selection will remain within the assessment limit of approximately 5–8 test cases per test type and will prioritize business-critical customer flows.

The questions raised by AI regarding authentication, checkout, payment methods, test accounts, API permissions, test-data cleanup and environment behavior will be verified before automation.


## Participant Validation

I manually validated the main customer-facing flows on the live Toolshop application.

The following flows were accessible without logging in:
- Product search
- Product filtering
- Product details
- Add product to cart
- Cart operations
- Checkout flow

This observation was used to challenge/validate the AI-generated assumptions rather than accepting them blindly.

Authentication should therefore be treated as a separate functional area rather than automatically assumed to be a prerequisite for every customer flow.

Further validation is required for:
- Whether invoice generation requires authentication
- Whether the generated invoice is accessible to a guest user
- Whether checkout creates persistent order/invoice records
- Whether the application's "Confirm" action must be performed twice to generate the invoice, as specified in the assessment