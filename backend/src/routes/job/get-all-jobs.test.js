/* globals before, after, it */

const supertest = require('supertest');
const userTestUtils = require('../user/utils/test');
const jobTestUtils = require('./utils/test');
const app = require('../../../src')();

const server = app.listen();
const route = '/api/job/all';

describe('GET /api/job/all', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  })

  it('should get all jobs for a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .get(route)
      .set('Authorization', user.token)
      .expect(200);
  });

  it('should not get all jobs for a user without authorization header', async () => supertest(server)
    .get(route)
    .expect(401));
})