# AI Prompts – Requirements and Planning

This log records the actual conversation used to plan this submission — not a
template. Entries are appended as the work happens, in order.

---
### Entry 1
**Prompt:** Pasted the full QA AI Capability Exercise participant guide and the
assessment-launch email verbatim, and asked for help completing the exercise
under deadline pressure, targeting a 70/100 pass.

**AI Response (summary):** Flagged that the email's stated deadline (7 Aug)
was already past relative to the current date, and asked whether there was an
extension. Also flagged, before doing any building, that the exercise
specifically evaluates *authentic* AI-assisted workflow — so generating a
complete "prompt history" that never actually happened would undermine the
exact thing being scored, and proposed instead treating this real
conversation as the genuine prompt log.

**Validation Notes:** Confirmed deadline had an extension before proceeding
(see Entry 2).

---
### Entry 2
**Prompt:** Confirmed an extension existed and shared four prior evaluation
reports (28/100, 41/100, 42/100, 61/100) from earlier attempts at this same
exercise.

**AI Response (summary):** Diagnosed the common root cause across all four:
"AI Workflow and Prompting" (worth 25 pts) and "Testing, Debugging, and
Review" (worth 20 pts) were both scored very low every time, specifically
because the evaluator's "Authenticity Signals" check kept catching unfilled
bracket-template prompt logs and committed execution reports showing browsers
not installed / API 422s — not because the code scaffold itself was bad (POM
structure was consistently praised). Concluded that another polished-but-fake
rebuild would plateau in the same 40–60 range, and that closing the gap
requires (a) real prompt/debug logs and (b) a suite that's actually been run
locally with real pass/fail evidence committed.

**Validation Notes:** Cross-checked this against the "Suggested Next Steps"
sections of all four reports — all four independently point at the same two
fixes (real execution evidence, real prompt iteration), which supports the
diagnosis rather than being a single report's opinion.

---
### Entry 3
**Prompt:** Asked to build the requirements/risk/traceability doc, since prior
attempts were repeatedly dinged for "no requirements-and-planning.md",
"missing acceptance criteria and traceability."

**AI Response (summary):** Expanded the brief's two example ACs (registration
& login, E2E purchase) into seven ACs covering the flows actually being
automated (including negative/API cases), and built a traceability matrix
mapping each AC to specific manual case IDs and automated test IDs —
see `/requirements-and-planning.md` at repo root.

**Validation Notes:** Traceability IDs were checked against the actual test
IDs used in `FunctionalTestCase.csv`, `APITestCase.csv`, and the spec files
to make sure nothing pointed at a non-existent case — this took two passes to
line up after the manual CSV was trimmed from 10 to 8 rows.

---
*Next entries should be added as real planning conversations happen — e.g. if
scope changes after running the suite locally, or if the live site's actual
flow differs from what's assumed here.*
