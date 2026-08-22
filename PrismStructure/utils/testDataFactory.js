const { faker } = require('@faker-js/faker');

// Generates a fresh, unique user per test run so we don't collide
// on the shared Toolshop demo DB.
function buildUser(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: '1995-05-15',

    // UI uses this as a normal text input.
    // AuthApiClient converts it to the API's expected array format.
    address: faker.location.streetAddress(),

    city: faker.location.city(),
    state: faker.location.state(),
    country: 'US',
    postcode: faker.location.zipCode('#####'),
    phone: faker.string.numeric(10),
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6)}@example.com`,
    password: 'TestPass!2345',

    ...overrides,
  };
}

function buildBillingAddress(overrides = {}) {
  return {
    // Use a geographically consistent address.
    street: 'Test street 25',
    city: 'Utrecht',
    state: 'Utrecht',
    country: 'The Netherlands',
    postalCode: '1122AB',
    paymentMethod: 'cash-on-delivery',
    ...overrides,
  };
}

module.exports = {
  buildUser,
  buildBillingAddress,
};