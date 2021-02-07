/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('./utils/test');

const server = app.listen();
const route = '/api/user/logout';

describe('POST /api/user/logout', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should logout a user when a user is correctly logged in', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .post(route)
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not logout a user without authorization header', async () =>
    supertest(server).post(route).expect(401));
});
