/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from './utils/test';
import App from '../../';
const app = App();

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
      .set('authorization', user.token as unknown as string)
      .expect(200);
  });

  it('should not logout a user without authorization header', async () =>
    supertest(server).post(route).expect(401));
});
