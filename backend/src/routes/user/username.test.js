/* globals before, after, it */

const supertest = require('supertest');
const app = require('../..')();
const userTestUtils = require('./utils/test');

const server = app.listen();

const route = '/api/user/username';

describe('POST /api/user/username', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  it('should return true if a user by that username already exists', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .post(route)
      .send({
        username: user.username,
      })
      .expect(200, /true/);
  });

  it('should return false if a user by that username does not exist', async () => {
    const user = userTestUtils.constructUser();

    return supertest(server)
      .post(route)
      .send({
        username: user.username,
      })
      .expect(200, /false/);
  });
});