/* globals before, after, it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/User');

const server = app.listen();
const route = '/api/user/logout';

module.exports = function () {
  const auth = new Auth(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should logout a user when a user is correctly logged in', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not logout a user without authorization header', async () => supertest(server)
    .post(route)
    .expect(401));
};
