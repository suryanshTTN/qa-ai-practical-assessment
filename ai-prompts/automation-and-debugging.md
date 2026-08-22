# AI Prompts – Automation and Debugging

This file is the one every prior evaluation flagged hardest ("no visible
debugging iteration chains" / "shallow prompt iteration" / "Testing,
Debugging, and Review — 5/20" across three separate attempts). It stays
genuinely incomplete right now rather than pre-filled with invented failures
— the real entries get added below as the suite is actually run locally,
because that is the entire point of this section.

---
### Entry 1 — framework/config decisions
**Prompt:** Asked for a Playwright config that reports both HTML and JSON,
retains traces only on failure, and separates UI vs API into projects so
`npm run test:ui` / `npm run test:api` can be scoped independently.

**AI Response Summary:** `playwright.config.js` defines `ui` and `api`
projects with separate `testDir`/`baseURL`, `fullyParallel: false` (shared
demo DB risk), and `trace: 'retain-on-failure'` so failures are debuggable
without bloating passing runs.

**Debugging Outcome:** N/A yet — config has not been exercised against a real
run.

---
### Entry 2 — known root cause from prior attempts
**Prompt:** Asked why every previous attempt's execution report showed
failures, based on the four evaluation reports (browsers not installed
consistently across all four; API calls returning 422).

**AI Response Summary:** Called out `npx playwright install --with-deps` as
the very first command in the README, ahead of any test run instructions,
specifically because this was the one issue every single prior attempt shared
regardless of score. For the API 422s, flagged that register/login/cart
payload field names in this scaffold are inferred from typical Toolshop API
conventions and need to be checked against the live Swagger docs before
trusting them — a mismatch there is the most likely next 422.

**Debugging Outcome:** Preventive, not reactive — this hasn't been tested
against a real run yet, it's addressing the failure pattern visible in past
evaluation reports.

---
### ⏳ Next real entry (fill in after running locally)
Run:
```bash
cd PrismStructure
npm install
npx playwright install --with-deps
npm test
```
Then add an entry here with: the actual pass/fail count, the actual error
message(s) for any failure, what was pasted back into the AI conversation to
debug it, what the AI suggested, what was actually changed in the code, and
whether that fixed it. That real back-and-forth — not this scaffold note — is
what should close the gap in this section.
