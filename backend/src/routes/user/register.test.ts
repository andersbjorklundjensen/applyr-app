/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from './utils/test';
import App from '../../';

const app = App();

const server = app.listen();

const route = '/api/user/register';

describe('POST /api/user/register', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should register a user with all information correctly supplied', async () => {
    const user = userTestUtils.constructUser();

    return supertest(server).post(route).send(user).expect(200);
  });

  it('should not register a user with invalid username', async () => {
    const user = userTestUtils.constructUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        username: null,
      })
      .expect(400);
  });

  it('should not register a user with invalid password', async () => {
    const user = userTestUtils.constructUser();

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: null,
      })
      .expect(400);
  });

  it('should not register a user which already exists', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server).post(route).send(user).expect(400);
  });
});
