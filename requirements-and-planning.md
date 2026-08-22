# Requirements, Risks, and Traceability — Toolshop Checkout & Invoice

## Scope
UI: registration, login, profile verification, browse/search, cart (add + update
quantity), checkout (Cash on Delivery), invoice generation and retrieval, logout.
API: registration, login/token, product listing, cart creation and item add,
invoice generation from cart, negative auth cases.

## Acceptance Criteria

**AC1 — User Registration & Login (UI)**
Given a new visitor, when they register with valid details and then log in with
those credentials, then their profile page shows the same first name, last name,
and email they registered with.

**AC2 — End-to-End Purchase Flow (UI)**
Given a logged-in user, when they add multiple products to the cart, update the
quantity of at least one item, and complete checkout with Cash on Delivery
(pressing Confirm **twice**, per the app's known quirk), then an invoice is
created and visible under My Invoices.

**AC3 — Session Termination (UI)**
Given a logged-in user, when they log out, then subsequent access to a
protected page (e.g. profile) redirects to login.

**AC4 — Invalid Credentials (UI, negative)**
Given an unregistered or mistyped email/password, when the user attempts login,
then a visible error is shown and no session is created.

**AC5 — User Authentication & Cart Creation (API)**
Given a new user, when they register via API and log in, then a valid bearer
token is returned, and that token can be used to create a cart.

**AC6 — Product Selection & Invoice Generation (API)**
Given a valid bearer token and cart, when products are added to the cart and
an invoice is requested with billing + `cash-on-delivery` payment details, then
the API returns a created invoice with an id/invoice number.

**AC7 — Duplicate Registration (API, negative)**
Given an email already registered, when registration is attempted again with
the same email, then the API rejects it (409/422), not 201.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Toolshop demo DB is shared across all candidates/test runs — duplicate email collisions | High | Medium | Faker-generated unique email+timestamp per run (`testDataFactory.js`) |
| `data-test` selectors authored without live DOM access may not match production markup | High | High | Selectors marked for verification; run locally in headed/debug mode first, fix before trusting results |
| Two-step "confirm" invoice quirk is easy to silently mis-model as a single click | Medium | High | Modeled explicitly as `confirmInvoiceTwice()` in `CheckoutPage.js`, not hidden inside a generic click helper |
| API payload field names may drift from what's in Swagger vs the assignment's example | Medium | Medium | Register/login/product endpoints marked as needing verification against `/api/documentation`; invoice payload copied verbatim from the assignment brief |
| Playwright browsers not installed before a CI/local run (root cause of failures in prior attempts) | High | High | README calls out `npx playwright install --with-deps` as the first mandatory step |

## Traceability Matrix

| Requirement | Manual Case(s) | UI Automation | API Automation |
|---|---|---|---|
| AC1 Registration & Login | TC-M-01, TC-M-02 | TC-UI-04 | TC-API-01 |
| AC2 E2E Purchase + Invoice | TC-M-03, TC-M-04 | TC-UI-03 | TC-API-03 |
| AC3 Logout | TC-M-05 | TC-UI-05 | — |
| AC4 Invalid login (negative) | TC-M-06 | TC-UI-06 | TC-API-04 |
| AC5 API auth + cart | TC-M-01, TC-M-02 | — | TC-API-01, TC-API-03 |
| AC6 API invoice generation | TC-M-04 | — | TC-API-03 |
| AC7 Duplicate registration (negative) | TC-M-07 | — | TC-API-05 |
| Product search/browse | TC-M-08 | TC-UI-01, TC-UI-02 | TC-API-02 |
