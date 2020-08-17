/* globals before, after, it */

const supertest = require('supertest');
const Auth = require('../../utils/User');
const app = require('../..')();

const server = app.listen();
const route = '/api/job/all';

module.exports = function () {
  const auth = new Auth(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should get all jobs for a user correctly', async () => {
    const user = await auth.createUser();

    return supertest(server)
      .get(route)
      .set('Authorization', user.token)
      .expect(200);
  });

  it('should not get all jobs for a user without authorization header', async () => supertest(server)
    .get(route)
    .expect(401));
};
