/* globals before, after, it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/User');

const server = app.listen();
const route = '/api/user/login';

module.exports = function () {
  const auth = new Auth(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should login a user correctly', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send(user)
      .expect(200);
  });

  it('should not login a user without a supplied username', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        username: null,
      })
      .expect(400);
  });

  it('should not login a user without a supplied password', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: null,
      })
      .expect(400);
  });

  it('should not login a user which doesnt exist', async () => {
    const user = auth.constructUser();

    return supertest(server)
      .post(route)
      .send(user)
      .expect(400);
  });

  it('should not login a user with invalid login credentials', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: 'wrongpassword',
      })
      .expect(400);
  });
};
