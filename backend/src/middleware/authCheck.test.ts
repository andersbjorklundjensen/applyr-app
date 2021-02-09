/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from '../routes/user/utils/test';
import App from '../';
const app = App();

const server = app.listen();

describe('POST /api/job', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should not add a job without a auth header', async () =>
    supertest(server).post('/api/job').expect(401));

  it('should not allow someone with deleted account to perform a action', async () => {
    const user = await userTestUtils.createUserInDb(server);
    await app.locals.db.models.users.deleteOne({ username: user.username });

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .expect(401);
  });

  it('should not logout if already logged out', async () => {
    const user = await userTestUtils.createUserInDb(server);

    await supertest(server)
      .post('/api/user/logout')
      .set('authorization', user.token as unknown as string)
      .expect(200);

    return supertest(server)
      .post('/api/user/logout')
      .set('authorization', user.token as unknown as string)
      .expect(401);
  });
});
