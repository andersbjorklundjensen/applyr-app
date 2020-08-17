/* globals before, after, it */

const supertest = require('supertest');
const userTestUtils = require('../user/utils/test');
const jobTestUtils = require('./utils/test');
const app = require('../..')();

const server = app.listen();
const route = '/api/job/';

describe('PUT /api/job', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  it('should edit the position title field for a job correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send(newJob2)
      .expect(200);
  });

  it('should not edit the position title field with invalid position title', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        positionTitle: 1234,
      })
      .expect(400);
  });

  it('should not edit the location field with an invalid location', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        location: 1234,
      })
      .expect(400);
  });

  it('should not edit the link to posting field with an invalid link', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        linkToPosting: 1234,
      })
      .expect(400);
  });

  it('should not edit the company field with an invalid company', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        company: 1234,
      })
      .expect(400);
  });

  it('should not edit the date applied field with an invalid date', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        dateApplied: '1234',
      })
      .expect(400);
  });

  it('should not edit the current status field with an invalid status', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        currentStatus: 10,
      })
      .expect(400);
  });

  it('should not edit the notes field with an invalid notes', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const newJob = await jobTestUtils.createJobInDb(server, user);
    const newJob2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + newJob.id)
      .set('Authorization', user.token)
      .send({
        ...newJob2,
        notes: 10,
      })
      .expect(400);
  });

  it('should not add a job for a user without authorization header', async () => {
    supertest(server)
    .post(route)
    .expect(401)
  });
});