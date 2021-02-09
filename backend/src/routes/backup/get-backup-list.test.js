/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('../user/utils/test');

const server = app.listen();
const route = '/api/backup/list';

describe('GET /api/backup/list', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should get a list of backups', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .get(route)
      .set('authorization', user.token)
      .expect(200);
  });
});
