const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/ui/RegisterPage');
const { LoginPage } = require('../../pages/ui/LoginPage');
const { ProductsPage } = require('../../pages/ui/ProductsPage');
const { CartPage } = require('../../pages/ui/CartPage');
const { CheckoutPage } = require('../../pages/ui/CheckoutPage');
const { InvoicePage } = require('../../pages/ui/InvoicePage');
const { ProfilePage } = require('../../pages/ui/ProfilePage');
const { buildUser, buildBillingAddress } = require('../../utils/testDataFactory');

test.describe('Regression @regression', () => {
  test('TC-UI-03 register, purchase via COD, invoice is generated @regression', async ({
    page,
  }) => {
    const user = buildUser();
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const invoice = new InvoicePage(page);

    await register.open();
    await register.register(user);

    await login.open();
    await login.login(user.email, user.password);

    await products.open();
    await products.addToCartFromListing(0);
    await products.addToCartFromListing(1);

    await cart.open();
    await cart.updateQuantity(0, 2);
    await cart.proceedToCheckout();

    await checkout.signInStep();
    await checkout.fillBillingAddress(buildBillingAddress());
    await checkout.choosePaymentMethod('cash-on-delivery');
    // Known quirk: confirm must be pressed twice to actually create the invoice.
    await checkout.confirmInvoiceTwice();

    await invoice.openMyInvoices();
    const count = await invoice.invoiceRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-UI-04 profile shows the name/email used at registration @regression', async ({
    page,
  }) => {
    const user = buildUser();
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await register.open();
    await register.register(user);
    await login.open();
    await login.login(user.email, user.password);

    await profile.open();
    await expect.poll(() => profile.getFullName()).toContain(user.firstName);
    await expect.poll(() => profile.getEmail()).toContain(user.email);
  });

  test('TC-UI-05 logout ends the session @regression', async ({ page }) => {
    const user = buildUser();
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await register.open();
    await register.register(user);
    await login.open();
    await login.login(user.email, user.password);

    await profile.open();
    await profile.logout();

    await profile.open();
    // After logout, a protected route should bounce back to login.
    await expect(page).toHaveURL(/login/);
  });

  test('TC-UI-06 invalid password is rejected with a visible error @regression', async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('nonexistent.user@example.com', 'WrongPassword!1');
    await expect(await login.expectLoginError()).toBeVisible();
  });
});
