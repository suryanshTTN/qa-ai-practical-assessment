# AI Prompts – Test Data

---
### Entry 1
**Prompt:** Asked for a test-data strategy that avoids duplicate-registration
collisions on the shared Toolshop demo database — a real risk since many
candidates hit the same environment.

**AI Response Summary:** Built `utils/testDataFactory.js` using
`@faker-js/faker`: `buildUser()` generates a unique email per run
(`timestamp + random alphanumeric suffix`) plus realistic name/address/DOB
fields, and `buildBillingAddress()` generates a fresh billing address per
checkout, defaulting `payment_method` to `cash-on-delivery` per the brief.

**Validation Notes:** DOB is currently hardcoded to a fixed valid adult date
(`1995-05-15`) rather than fully randomized, to avoid generating an
under-18 or malformed date that the registration form might reject — flagged
for confirmation once registration is actually run against the live form.

---
### Entry 2
**Prompt:** Asked for the exact invoice request payload shape, since the
brief includes a concrete example (`billing_street`, `billing_city`,
`billing_state`, `billing_country`, `billing_postal_code`, `payment_method`,
`cart_id`, `payment_details`).

**AI Response Summary:** `InvoiceApiClient.generateInvoice()` uses that exact
field set, copied from the assignment brief rather than guessed, with
`buildBillingAddress()` supplying matching values.

**Validation Notes:** This is the one payload shape confirmed directly from
the assignment doc rather than inferred from general Toolshop API
conventions — register/login/cart payload field names still need to be
checked against the live Swagger UI (`/api/documentation`).
