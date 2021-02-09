/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from './utils/test';
import App from '../../';
const app = App();

const server = app.listen();
const route = '/api/user/login';

describe('POST /api/user/login', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should login a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server).post(route).send(user).expect(200);
  });

  it('should not login a user without a supplied username', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .post(route)
      .send({
        ...user,
        username: null,
      })
      .expect(400);
  });

  it('should not login a user without a supplied password', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: null,
      })
      .expect(400);
  });

  it('should not login a user which doesnt exist', async () => {
    const user = userTestUtils.constructUser();

    return supertest(server).post(route).send(user).expect(400);
  });

  it('should not login a user with invalid login credentials', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .post(route)
      .send({
        ...user,
        password: 'wrongpassword',
      })
      .expect(400);
  });
});
