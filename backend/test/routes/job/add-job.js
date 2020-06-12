/* globals before, after, it */

const supertest = require('supertest');
const Auth = require('../../utils/User');
const Job = require('../../utils/Job');
const app = require('../../../src')();

const server = app.listen();
const route = '/api/job';

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

  it('should add a job for a user correctly', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send(newJob)
      .expect(200);
  });

  it('should not add a job for a user with invalid position title', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        positionTitle: 1234,
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid location', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        location: 1234,
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid link', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        linkToPosting: 1234,
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid company name', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        company: 1234,
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid application date', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        dateApplied: 'asdf',
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid current status', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        currentStatus: 1234,
      })
      .expect(400);
  });

  it('should not add a job for a user with invalid notes', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        notes: 1234,
      })
      .expect(400);
  });

  it('should add a job for a user with no notes', async () => {
    const user = await auth.createUser();
    const newJob = job.constructJob();

    return supertest(server)
      .post(route)
      .set('Authorization', user.token)
      .send({
        ...newJob,
        notes: null,
      })
      .expect(200);
  });

  it('should not add a job for a user without authorization header', async () => supertest(server)
    .post(route)
    .expect(401));
};
