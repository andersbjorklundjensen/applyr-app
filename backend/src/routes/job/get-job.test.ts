/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from '../user/utils/test';
import jobTestUtils from './utils/test';
import App from '../../';
const app = App();

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
      .set('authorization', user.token as unknown as string)
      .expect(200);
  });

  it('should not get a job for a user if the job does not belong to the user', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const user2 = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .get(route + newJob.id)
      .set('authorization', user2.token as unknown as string)
      .expect(400);
  });

  it('should not get a job for a user without authorization header', async () => {
    return supertest(server).get(`${route}asdf`).expect(401);
  });
});
