/* globals before, after, it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/User');

const server = app.listen();

const route = '/api/user/register';

module.exports = function () {
  const auth = new Auth(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should register a user with all information correctly supplied', async () => {
    const user = auth.constructUser();

    return supertest(server)
      .post(route)
      .send(user)
      .expect(200);
  });

  it('should not register a user with invalid username', async () => {
    const user = auth.constructUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        username: null,
      })
      .expect(400);
  });

  it('should not register a user with invalid password', async () => {
    const user = auth.constructUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: null,
      })
      .expect(400);
  });

  it('should not register a user which already exists', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send(user)
      .expect(400);
  });
};
