const crypto = require('crypto');
const supertest = require('supertest');

class User {
  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  constructUser() {
    return {
      username: crypto.randomBytes(6).toString('hex'),
      password: crypto.randomBytes(6).toString('hex'),
      token: null,
    };
  }

  async createUser() {
    const user = this.constructUser();

    await supertest(this.server)
      .post('/api/user/register')
      .send(user)
      .expect(200)
      .then((response) => {
        user.token = response.body.token;
      });

    return user;
  }
}

module.exports = User;
