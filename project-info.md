# Project Info

**Primary AI Tool(s) Used:** Claude (Sonnet), used interactively for planning, code
scaffolding, and reviewing prior evaluation feedback; Cursor for in-editor
completion and local debugging once selectors/payloads are verified against the
live app.

**Application Under Test:** PracticeSoftwareTesting Toolshop — Checkout &
Application Flow (UI: practicesoftwaretesting.com, API:
api.practicesoftwaretesting.com)

**Assessment Start Date:** 22 Aug 2026 (rebuild after prior attempts scored
28 → 42 → 61)

## Project Summary
Automated the core Toolshop journey end to end: registration and login, adding
multiple products to the cart with a quantity update, checkout via Cash on
Delivery (including the app's known two-step "confirm" quirk), and invoice
verification under My Invoices — mirrored at the API layer with bearer-token
auth, cart creation, and invoice generation. Focus this round was closing the
two gaps every prior evaluation flagged: (1) prompt/debug logs that were
unfilled templates instead of real iteration, and (2) no committed evidence
that the suite actually runs.

## Tools Used
- Browser: Chromium (Playwright's bundled browser)
- Automation: Playwright Test (JS), Prism-style Page Object Model
- API: Playwright's built-in `request` fixture (no separate Postman collection)
- Data: `@faker-js/faker` for unique, collision-free test users per run
- AI: Claude for design/scaffolding/debugging conversations, Cursor for
  in-editor edits

## Setup Summary

**1. How I provide project and system-under-test context to the AI**
I gave the AI the full assignment brief (participant guide) and the launch
email verbatim, plus the exact invoice-payload example from the brief, rather
than describing the task from memory. That's what let the API client for
invoice generation match the assignment's example field-for-field instead of
guessing field names.

**2. How I use AI for requirement analysis**
I asked the AI to turn the two example ACs in the brief into a fuller set
(registration/login, E2E purchase, logout, negative login, API auth+cart, API
invoice, duplicate registration) and build a traceability matrix mapping each
AC to manual/UI/API cases — see `requirements-and-planning.md`. I reviewed
this against the brief's stated flows before accepting it.

**3. How I use AI for test planning and strategy**
Split scope explicitly into UI vs API and smoke vs regression up front, sized
to the brief's "5–8 cases per type" guidance, so automation didn't balloon
past what the manual suite and prompt logs could keep pace with (a gap in
earlier attempts — thin logs and evidence relative to the code surface).

**4. How I use AI for manual test case design**
Had the AI draft `FunctionalTestCase.csv` and `APITestCase.csv` covering
positive, negative, and edge scenarios (invalid login, duplicate email,
missing auth token, invalid cart id), then trimmed/renumbered them so IDs line
up with the traceability matrix and the automated spec test IDs.

**5. How I use AI for automation design**
Reused the Prism-style POM split (pages/ui, pages/api, tests, utils) that
scored well structurally in every prior evaluation, and kept it — that part
wasn't the problem. New this round: the two-step invoice confirm is modeled as
its own named method (`confirmInvoiceTwice()`) instead of a silent double
click, so it's visible in code review and in any failure trace.

**6. How I validate and refine AI-generated test cases and scripts**
This is the step still in progress as of committing this scaffold: the AI
authored selectors and API field names from the brief and general Toolshop
conventions, **without live browser/API access** (sandboxed environment).
Every page object and API client is commented to flag this. The real
validation step — running `npx playwright install` and the suite locally,
then fixing whatever breaks — happens next, and that debugging session is
logged in `ai-prompts/automation-and-debugging.md` as it happens, not written
up in advance.

**7. How I use AI for test data generation, environment assumptions, and API
payloads**
`testDataFactory.js` generates a unique email (timestamp + random suffix) per
run specifically to avoid duplicate-registration collisions on the shared demo
DB. The invoice payload shape was copied directly from the assignment brief's
example rather than invented.

**8. How I use AI for debugging failing tests and interpreting logs**
Plan: run the suite locally, paste the real Playwright output (pass/fail,
stack traces, HTTP status codes) back into the AI conversation, and iterate
fixes from there — the same loop used in the prior attempt's PowerShell run
(12 failures / 7 passed) that surfaced real issues instead of assumed ones.

**9. What I avoid sharing with AI tools**
No real user credentials, no production data, no internal company info beyond
what's in the public assignment brief. Test data is synthetic (Faker-
generated) end to end.

**10. How I'd reuse this QA workflow in a real project**
Same shape: pull actual requirements/docs into the AI conversation instead of
paraphrasing from memory, keep prompt/debug logs as a running record during
the work rather than backfilled afterward, and treat AI-authored
selectors/payloads as a first draft that must be checked against the live
system before being trusted in a suite that gates a release.
