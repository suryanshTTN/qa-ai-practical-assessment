const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  async open() {
    await this.goto('/auth/login');
  }

  async login(email, password) {
    await this.fillTestId('email', email);
    await this.fillTestId('password', password);
    await this.clickTestId('login-submit');
  }

  async expectLoginError() {
    return this.byTestId('login-error');
  }
}

module.exports = { LoginPage };
