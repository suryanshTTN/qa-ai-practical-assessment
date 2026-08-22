# Toolshop QA AI Capability Exercise

Prism-style Playwright framework (UI + API) for the PracticeSoftwareTesting
Toolshop app, built as part of the QA AI Capability Exercise.

## Project Structure
```
qa-ai-practical-assessment/
├── PrismStructure/
│   ├── package.json
│   ├── playwright.config.js
│   ├── pages/
│   │   ├── ui/            # Page Object Model (register, login, products, cart, checkout, invoice, profile)
│   │   └── api/            # API clients (auth, products, cart, invoice)
│   ├── utils/
│   │   └── testDataFactory.js   # Faker-based unique user/billing data
│   ├── tests/
│   │   ├── ui/              # smoke.spec.js, e2e-purchase.spec.js
│   │   └── api/              # auth-cart-invoice.spec.js
│   └── execution-report/     # HTML + JSON report, generated after a real run (not committed empty)
├── FunctionalTestCase.csv    # Manual UI/functional test cases
├── APITestCase.csv           # Manual API test scenarios
├── requirements-and-planning.md  # ACs, risks, traceability matrix
├── project-info.md
├── ai-prompts/                # Real prompt/response/validation log, by phase
└── .cursor/rules/             # Cursor rules used while building this
```

## ⚠️ First-run checklist (root cause of failures in every prior submission)
Every earlier attempt at this exercise failed in execution because Playwright
browsers were never installed before running. Do this first:

```bash
cd PrismStructure
npm install
npx playwright install --with-deps
```

## Running tests
```bash
npm run test:smoke        # @smoke only
npm run test:regression   # @regression only
npm run test:ui           # UI project only
npm run test:api          # API project only
npm test                  # everything
npm run report             # open the last HTML report
```

Reports land in `PrismStructure/execution-report/` (`html-report/` and
`results.json`). Commit the report from a real run — not an empty folder.

## Config
Base URLs default to the live Toolshop app/API. Override via env vars if
needed:
```bash
UI_BASE_URL=https://practicesoftwaretesting.com
API_BASE_URL=https://api.practicesoftwaretesting.com
```

## Known app quirks
- **Double confirm for invoice:** the checkout confirm button must be clicked
  **twice** to actually generate the invoice / invoice id. Modeled explicitly
  as `CheckoutPage.confirmInvoiceTwice()` — see the comment in that file.
- **Selectors/API fields not yet live-verified:** this framework was authored
  in a sandboxed environment without access to the live site. Every POM/API
  client file is commented where a `data-test` id or payload field should be
  double-checked against the live DOM / Swagger docs
  (`api.practicesoftwaretesting.com/api/documentation`) before the suite is
  trusted. See `ai-prompts/automation-and-debugging.md` for the fix log.

## Test tagging
Tests are tagged `@smoke` or `@regression` inline in the test title, matched
via Playwright's `--grep`. See `package.json` scripts.
