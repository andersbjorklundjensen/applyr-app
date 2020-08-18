/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('../user/utils/test');
const jobTestUtils = require('./utils/test');

const server = app.listen();
const route = '/api/job/';

describe('DELETE /api/job', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  })

  it('should delete a job for a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .delete(route + newJob.id)
      .set('Authorization', user.token)
      .expect(200);
  });

  it('should not delete a job if the job does not belong to the user', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const user2 = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .delete(route + newJob.id)
      .set('Authorization', user2.token)
      .expect(400);
  });

  it('should not add a job for a user without authorization header', async () => {
    supertest(server)
      .post(route)
      .expect(401);
  });
});