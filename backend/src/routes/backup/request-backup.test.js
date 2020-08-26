/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('../user/utils/test');
const jobTestUtils = require('../job/utils/test');

const server = app.listen();
const route = '/api/backup/request';

describe('POST /api/backup/request', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  })

  it('Request a backup correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    await jobTestUtils.createJobInDb(server, user);

    return supertest(server)
      .post(route)
      .set('authorization', user.token)
      .expect(200, /success/);
  });
});