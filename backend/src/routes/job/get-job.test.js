/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('../user/utils/test');
const jobTestUtils = require('./utils/test');

const server = app.listen();
const route = '/api/job/';

describe('GET /api/job/:id', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should get a job for a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .get(route + newJob.id)
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not get a job for a user if the job does not belong to the user', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const user2 = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .get(route + newJob.id)
      .set('authorization', user2.token)
      .expect(400);
  });

  it('should not get a job for a user without authorization header', async () => {
    return supertest(server).get(`${route}asdf`).expect(401);
  });
});
