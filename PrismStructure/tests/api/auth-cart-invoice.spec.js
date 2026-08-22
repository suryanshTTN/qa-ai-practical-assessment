const { test, expect } = require('@playwright/test');
const { AuthApiClient } = require('../../pages/api/AuthApiClient');
const { ProductApiClient } = require('../../pages/api/ProductApiClient');
const { CartApiClient } = require('../../pages/api/CartApiClient');
const { InvoiceApiClient } = require('../../pages/api/InvoiceApiClient');
const { buildUser, buildBillingAddress } = require('../../utils/testDataFactory');

test.describe('API Smoke @smoke', () => {
  test('TC-API-01 register then login returns a bearer token @smoke', async ({
    request,
  }) => {
    const auth = new AuthApiClient(request);
    const user = buildUser();

    const registerRes = await auth.register(user);
    expect(registerRes.status(), await registerRes.text()).toBe(201);

    const loginRes = await auth.login(user.email, user.password);
    expect(loginRes.status(), await loginRes.text()).toBe(200);
    const body = await loginRes.json();
    expect(body.access_token || body.token).toBeTruthy();
  });

  test('TC-API-02 product listing returns products @smoke', async ({ request }) => {
    const products = new ProductApiClient(request);
    const res = await products.list();
    expect(res.status()).toBe(200);
    const body = await res.json();
    const items = body.data || body;
    expect(Array.isArray(items) ? items.length : 0).toBeGreaterThan(0);
  });
});

test.describe('API Regression @regression', () => {
  test('TC-API-03 full cart-to-invoice flow with a bearer token @regression', async ({
    request,
  }) => {
    const auth = new AuthApiClient(request);
    const products = new ProductApiClient(request);
    const carts = new CartApiClient(request);
    const invoices = new InvoiceApiClient(request);
    const user = buildUser();

    await auth.register(user);
    const loginRes = await auth.login(user.email, user.password);
    const { access_token: token, token: altToken } = await loginRes.json();
    const bearer = token || altToken;

    const productRes = await products.list();
    const productBody = await productRes.json();
    const firstProduct = (productBody.data || productBody)[0];

    const cartRes = await carts.createCart(bearer);
    expect(cartRes.status(), await cartRes.text()).toBe(201);
    const { id: cartId } = await cartRes.json();

    const addItemRes = await carts.addItem(cartId, firstProduct.id, 2, bearer);
    expect(addItemRes.status(), await addItemRes.text()).toBe(200);

    const getCartRes = await carts.getCart(cartId, bearer);
    const cartBody = await getCartRes.json();
    expect(cartBody.total || cartBody.cart_items).toBeTruthy();

    const invoiceRes = await invoices.generateInvoice(
      cartId,
      buildBillingAddress(),
      bearer
    );
    expect(invoiceRes.status(), await invoiceRes.text()).toBe(201);
    const invoiceBody = await invoiceRes.json();
    expect(invoiceBody.id || invoiceBody.invoice_number).toBeTruthy();
  });

  test('TC-API-04 login with wrong password is rejected @regression', async ({
    request,
  }) => {
    const auth = new AuthApiClient(request);
    const res = await auth.login('nonexistent.user@example.com', 'WrongPassword!1');
    expect([401, 422]).toContain(res.status());
  });

  test('TC-API-05 duplicate registration email is rejected @regression', async ({
    request,
  }) => {
    const auth = new AuthApiClient(request);
    const user = buildUser();
    const first = await auth.register(user);
    expect(first.status()).toBe(201);

    const dup = await auth.register(user);
    expect([409, 422]).toContain(dup.status());
  });
});
