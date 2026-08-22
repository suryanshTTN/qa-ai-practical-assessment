// AuthApiClient wraps Playwright's APIRequestContext for the Toolshop
// authentication endpoints.

class AuthApiClient {
  constructor(request) {
    this.request = request;
  }

  async register(user) {
    return this.request.post('/users/register', {
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        dob: user.dob,

        // Toolshop API expects address as an array.
        // Keep user.address as a string because the UI registration
        // form uses it directly in a text input.
        address: [user.address],

        city: user.city,
        state: user.state,
        country: user.country,
        postcode: user.postcode,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
    });
  }

  async login(email, password) {
    return this.request.post('/users/login', {
      data: {
        email,
        password,
      },
    });
  }

  async me(token) {
    return this.request.get('/account', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async logout(token) {
    return this.request.post('/users/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

module.exports = { AuthApiClient };