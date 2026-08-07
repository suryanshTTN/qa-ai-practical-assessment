# AI Prompts – Test Data

## Entry 1 – Test Data Strategy

### Prompt

For the Practice Software Testing Toolshop assessment, suggest a safe and maintainable test data strategy for UI and API testing.

Focus on:

- Dynamic product selection
- In-stock product selection
- Dynamic cart IDs
- Search terms
- Negative search data
- Checkout data
- API request payloads
- Authentication credentials
- Persistent invoice data

Do not provide real credentials or secrets.
Prefer runtime-generated or dynamically discovered data.
Identify which data can be safely reused and which data should be unique.

### AI Response Summary

The test data strategy should avoid hardcoded product and cart identifiers where possible.

Products should be discovered dynamically from the application or API, with in-stock products selected for purchase flows.

Cart IDs should be generated during execution and used only within the relevant test flow.

Negative search scenarios should use unique terms that are extremely unlikely to match an existing product.

Checkout data should use approved non-sensitive test information.

Authentication credentials should be stored securely through environment configuration and must not be committed to GitHub or included in AI prompt history.

Persistent invoice creation should use controlled assessment data because invoices may affect inventory or create persistent application records.

### Validation Notes

The proposed strategy was reviewed against the live application's behavior and the assessment requirements.

Dynamic identifiers were preferred because product and cart identifiers may change in the shared environment.

Sensitive values will not be stored in source code, CSV files, prompt history, screenshots, or reports.