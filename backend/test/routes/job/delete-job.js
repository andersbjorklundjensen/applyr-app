/* globals before, after, it */

const supertest = require('supertest');
const Auth = require('../../utils/User');
const Job = require('../../utils/Job');
const app = require('../../../src')();

const server = app.listen();
const route = '/api/job/';

module.exports = function () {
  const auth = new Auth(app, server);
  const job = new Job(app, server);

  before(async () => {
    await app.locals.db.dropDatabase();
  });

  after(async () => {
    app.locals.db.close();
    server.close();
  });

  it('should delete a job for a user correctly', async () => {
    const user = await auth.createUser();
    const newJob = await job.createJob(user);

    return supertest(server)
      .delete(route + newJob.id)
      .set('Authorization', user.token)
      .expect(200);
  });

  it('should not delete a job if the job does not belong to the user', async () => {
    const user = await auth.createUser();
    const user2 = await auth.createUser();
    const newJob = await job.createJob(user);

    return supertest(server)
      .delete(route + newJob.id)
      .set('Authorization', user2.token)
      .expect(401);
  });

  it('should not add a job for a user without authorization header', async () => supertest(server)
    .post(route)
    .expect(401));
};
