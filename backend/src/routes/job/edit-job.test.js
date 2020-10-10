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

  afterAll((done) => {
    server.close(done);
  })

  it('should edit the position title field for a job correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = await jobTestUtils.createJobInDb(server, user);
    const job2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + job.id)
      .set('authorization', user.token)
      .field('positionTitle', job2.positionTitle)
      .field('location', job2.location)
      .field('linkToPosting', job2.linkToPosting)
      .field('company', job2.company)
      .field('dateApplied', job2.dateApplied)
      .field('currentStatus', job2.currentStatus)
      .field('notes', job2.notes)
      .attach('files', job2.files)
      .type('form')
      .expect(200);
  });

  it('should not edit a job with a invalid job id', async () => {
    const user = await userTestUtils.createUserInDb(server);

    return supertest(server)
      .put(route + 'asdf')
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not edit a job with invalid job parameters', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = await jobTestUtils.createJobInDb(server, user);
    const job2 = jobTestUtils.constructJob();

    return supertest(server)
      .put(route + job.id)
      .set('authorization', user.token)
      .field('positionTitle', '')
      .field('location', job2.location)
      .field('linkToPosting', job2.linkToPosting)
      .field('company', job2.company)
      .field('dateApplied', job2.dateApplied)
      .field('currentStatus', job2.currentStatus)
      .field('notes', job2.notes)
      .attach('files', job2.files)
      .type('form')
      .expect(400);
  });

  it('should delete files marked to be deleted', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = await jobTestUtils.createJobInDb(server, user);
    const job2 = jobTestUtils.constructJob();

    const file = await app.locals.db.models.files.findOne({ jobId: job.id }).lean();

    return supertest(server)
      .put(route + job.id)
      .set('authorization', user.token)
      .field('positionTitle', job2.positionTitle)
      .field('location', job2.location)
      .field('linkToPosting', job2.linkToPosting)
      .field('company', job2.company)
      .field('dateApplied', job2.dateApplied)
      .field('currentStatus', job2.currentStatus)
      .field('notes', job2.notes)
      .field('filesToBeDeleted', JSON.stringify([file._id]))
      .attach('files', job2.files)
      .type('form')
      .expect(200);
  });

  it('should not add a job for a user without authorization header', async () => {
    return supertest(server)
      .post(route)
      .expect(401)
  });
});