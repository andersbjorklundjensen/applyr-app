import crypto from 'crypto';
import supertest from 'supertest';

const constructUser = () => {
  return {
    username: crypto.randomBytes(6).toString('hex'),
    password: crypto.randomBytes(6).toString('hex'),
    token: null,
  };
};

const createUserInDb = async (server: any) => {
  const user = constructUser();

  await supertest(server)
    .post('/api/user/register')
    .send(user)
    .expect(200)
    .then((response) => {
      user.token = response.body.token;
    });

  return user;
};

export default {
  constructUser,
  createUserInDb
}
