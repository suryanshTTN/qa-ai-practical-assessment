// BasePage — shared helpers for every UI Page Object.
// NOTE: selectors across this pages/ui/* set are authored from the public
// Toolshop app structure and typical `data-test` attribute conventions used
// on practicesoftwaretesting.com. They have NOT been verified against a live
// browser session from this environment (sandboxed — no network access to
// the SUT). Run in headed/debug mode locally and fix any mismatches — that
// fix is exactly the kind of real debugging entry that belongs in
// ai-prompts/automation-and-debugging.md.

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async byTestId(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async clickTestId(testId) {
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async fillTestId(testId, value) {
    await this.page.locator(`[data-test="${testId}"]`).fill(value);
  }

  async textOfTestId(testId) {
    return this.page.locator(`[data-test="${testId}"]`).innerText();
  }
}

module.exports = { BasePage };
