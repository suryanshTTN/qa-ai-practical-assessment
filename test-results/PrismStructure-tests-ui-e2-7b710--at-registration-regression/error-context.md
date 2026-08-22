# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: PrismStructure\tests\ui\e2e-purchase.spec.js >> Regression @regression >> TC-UI-04 profile shows the name/email used at registration @regression
- Location: PrismStructure\tests\ui\e2e-purchase.spec.js:48:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/auth/register", waiting until "load"

```

# Test source

```ts
  1  | // BasePage — shared helpers for every UI Page Object.
  2  | // NOTE: selectors across this pages/ui/* set are authored from the public
  3  | // Toolshop app structure and typical `data-test` attribute conventions used
  4  | // on practicesoftwaretesting.com. They have NOT been verified against a live
  5  | // browser session from this environment (sandboxed — no network access to
  6  | // the SUT). Run in headed/debug mode locally and fix any mismatches — that
  7  | // fix is exactly the kind of real debugging entry that belongs in
  8  | // ai-prompts/automation-and-debugging.md.
  9  | 
  10 | class BasePage {
  11 |   constructor(page) {
  12 |     this.page = page;
  13 |   }
  14 | 
  15 |   async goto(path = '/') {
> 16 |     await this.page.goto(path);
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  17 |   }
  18 | 
  19 |   async byTestId(testId) {
  20 |     return this.page.locator(`[data-test="${testId}"]`);
  21 |   }
  22 | 
  23 |   async clickTestId(testId) {
  24 |     await this.page.locator(`[data-test="${testId}"]`).click();
  25 |   }
  26 | 
  27 |   async fillTestId(testId, value) {
  28 |     await this.page.locator(`[data-test="${testId}"]`).fill(value);
  29 |   }
  30 | 
  31 |   async textOfTestId(testId) {
  32 |     return this.page.locator(`[data-test="${testId}"]`).innerText();
  33 |   }
  34 | }
  35 | 
  36 | module.exports = { BasePage };
  37 | 
```