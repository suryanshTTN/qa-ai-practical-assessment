# Cursor Rules — Toolshop Prism Framework

1. **Model routing (token budget):** Use Auto/lighter model for docs, CSVs,
   planning, and prompt-log writing. Switch to a stronger coding model only
   for page objects, API clients, spec files, `playwright.config.js`, and
   debugging real failures.
2. **One task per chat.** Don't mix requirement analysis, test design, and
   automation debugging in a single thread — keep them separable so each can
   be summarized cleanly into the matching `ai-prompts/*.md` file.
3. **Never silently fabricate selectors as verified.** Any `data-test`
   attribute or API field not confirmed against the live DOM/Swagger must be
   left with a `// VERIFY` comment, not asserted as correct.
4. **No hidden double-actions.** App quirks (like the two-step invoice
   confirm) get their own named method, not a bare `.click(); .click();`
   buried in a generic helper.
5. **Every failing local run gets logged**, not just passing runs — real
   failures and their fixes are what `ai-prompts/automation-and-debugging.md`
   is for.
6. **Test data is always generated, never hardcoded**, to avoid collisions on
   the shared Toolshop demo database.
