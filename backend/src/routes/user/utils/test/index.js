const crypto = require('crypto');
const supertest = require('supertest');

const constructUser = () => {
  return {
    username: crypto.randomBytes(6).toString('hex'),
    password: crypto.randomBytes(6).toString('hex'),
    token: null,
  };
};

const createUserInDb = async (server) => {
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

exports.constructUser = constructUser;
exports.createUserInDb = createUserInDb;
