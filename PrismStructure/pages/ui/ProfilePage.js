const { BasePage } = require('./BasePage');

class ProfilePage extends BasePage {
  async open() {
    await this.goto('/account/profile');
  }

  async getFullName() {
    const first = await this.textOfTestId('first-name');
    const last = await this.textOfTestId('last-name');
    return `${first} ${last}`.trim();
  }

  async getEmail() {
    return this.textOfTestId('email');
  }

  async logout() {
    await this.clickTestId('nav-logout');
  }
}

module.exports = { ProfilePage };
