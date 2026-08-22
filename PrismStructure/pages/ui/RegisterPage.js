const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  async open() {
    await this.goto('/auth/register');
  }

  // VERIFY: confirm these data-test ids against the live registration form.
  async register(user) {
    await this.fillTestId('first-name', user.firstName);
    await this.fillTestId('last-name', user.lastName);
    await this.fillTestId('dob', user.dob); // format expected: YYYY-MM-DD
    await this.fillTestId('address', user.address);
    await this.fillTestId('city', user.city);
    await this.fillTestId('state', user.state);
    await this.fillTestId('country', user.country);
    await this.fillTestId('postcode', user.postcode);
    await this.fillTestId('phone', user.phone);
    await this.fillTestId('email', user.email);
    await this.fillTestId('password', user.password);
    await this.clickTestId('register-submit');
  }

  async expectSuccessBanner() {
    const banner = await this.byTestId('register-success');
    return banner;
  }
}

module.exports = { RegisterPage };
