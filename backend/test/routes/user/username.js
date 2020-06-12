/* globals before, after, it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/User');

const server = app.listen();

const route = '/api/user/username';

module.exports = function () {
  const auth = new Auth(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should return true if a user by that username already exists', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .post(route)
      .send({
        username: user.username,
      })
      .expect(200, /true/);
  });

  it('should return false if a user by that username does not exist', async () => {
    const user = auth.constructUser();

    return supertest(server)
      .post(route)
      .send({
        username: user.username,
      })
      .expect(200, /false/);
  });
};
