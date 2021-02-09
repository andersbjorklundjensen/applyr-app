/* globals before, after, it */

import supertest from 'supertest';
import jobTestUtils from './utils/test';
import userTestUtils from '../user/utils/test';
import App from '../../';
const app = App();

const server = app.listen();
const route = '/api/job/all';

describe('GET /api/job/all', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should get all jobs for a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .get(route)
      .set('Authorization', user.token as unknown as string)
      .expect(200);
  });

  it('should not get all jobs for a user without authorization header', async () =>
    supertest(server).get(route).expect(401));
});
