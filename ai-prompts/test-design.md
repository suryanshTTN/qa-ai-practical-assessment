# AI Prompts – Test Design

---
### Entry 1
**Prompt:** Asked for manual test cases (UI/functional + API) covering
positive, negative, and edge scenarios, capped at 5–8 per type per the
brief's guidance, and requested they map to the traceability matrix.

**AI Response Summary:** Drafted `FunctionalTestCase.csv` (10 rows) and
`APITestCase.csv` (7 rows) covering registration, login, multi-item cart +
quantity update, COD checkout with the double-confirm quirk, logout, invalid
login, duplicate-email registration, search, cart-to-invoice API flow, missing
auth token, and invalid cart id.

**Validation Notes:** `FunctionalTestCase.csv` was over the 5–8 guidance at
10 rows — trimmed by folding an invoice-detail case into the existing
checkout case (TC-M-04 already covers invoice creation) and dropping a
lower-value empty-cart edge case, down to 8. Re-checked IDs against
`requirements-and-planning.md`'s traceability matrix after the trim and fixed
two stale references (TC-M-08/09 had shifted).

---
### Entry 2
**Prompt:** Asked for Playwright specs matching the manual cases, split into
`@smoke` and `@regression`, with the two-step invoice confirm modeled
explicitly rather than hidden.

**AI Response Summary:** Produced `tests/ui/smoke.spec.js` (2 cases),
`tests/ui/e2e-purchase.spec.js` (4 cases: full purchase+invoice, profile
name/email check, logout, invalid-password negative), and
`tests/api/auth-cart-invoice.spec.js` (5 cases: token issuance, product
listing, full cart-to-invoice flow, invalid login, duplicate registration).
`CheckoutPage.confirmInvoiceTwice()` calls the confirm action twice by name
instead of an unlabeled double click, per the earlier feedback that this
quirk needs to be visible, not silently baked in.

**Validation Notes:** Not yet run against the live site (sandboxed
environment, no network access to practicesoftwaretesting.com) — this is the
single biggest open validation gap and is the first thing to close locally.
See `automation-and-debugging.md` for what happens once it's actually run.
