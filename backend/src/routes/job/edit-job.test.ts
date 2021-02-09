/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from '../user/utils/test';
import jobTestUtils from './utils/test';
import App from '../../';
const app = App();

const server = app.listen();
const route = '/api/job/';

describe('PUT /api/job', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should edit the position title field for a job correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = await jobTestUtils.createJobInDb(server, user);
    const job2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + job.id)
      .set('authorization', user.token as unknown as string)
      .send({
        ...job,
        positionTitle: job2.positionTitle
      })
      .expect(200);
  });

  it('should not edit a job with a invalid job id', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .put(route + 'asdf')
      .set('authorization', user.token as unknown as string)
      .expect(400);
  });

  it('should not edit a job with invalid job parameters', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = await jobTestUtils.createJobInDb(server, user);
    const job2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + job.id)
      .set('authorization', user.token as unknown as string)
      .send({
        ...job2,
        positionTitle: null
      })
      .expect(400);
  });

  it('should not add a job for a user without authorization header', async () => {
    return supertest(server).post(route).expect(401);
  });
});
