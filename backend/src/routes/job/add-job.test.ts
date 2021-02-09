/* globals before, after, it */

import supertest from 'supertest';
import userTestUtils from '../user/utils/test';
import jobTestUtils from './utils/test';
import App from '../../';
const app = App();

const server = app.listen();
const route = '/api/job';

describe('POST /api/job', () => {
  beforeEach(async () => {
    await app.locals.db.dropDatabase();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should add a job for a user correctly', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(200);
  });

  it('should not add a job for a user with invalid position title', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', '')
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should not add a job for a user with invalid location', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', '')
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should not add a job for a user with invalid link', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', '')
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should not add a job for a user with invalid company name', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', '')
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should not add a job for a user with invalid application date', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', '')
      .field('currentStatus', job.currentStatus)
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should not add a job for a user with invalid current status', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', '')
      .field('notes', job.notes)
      .attach('files', job.files)
      .type('form')
      .expect(400);
  });

  it('should add a job for a user with no notes', async () => {
    const user = await userTestUtils.createUserInDb(server);
    const job = jobTestUtils.constructJob();

    return supertest(server)
      .post('/api/job')
      .set('authorization', user.token as unknown as string)
      .field('positionTitle', job.positionTitle)
      .field('location', job.location)
      .field('linkToPosting', job.linkToPosting)
      .field('company', job.company)
      .field('dateApplied', job.dateApplied)
      .field('currentStatus', job.currentStatus)
      .field('notes', '')
      .attach('files', job.files)
      .type('form')
      .expect(200);
  });

  it('should add a job for a user with no notes', async () => {
    return supertest(server).post('/api/job').expect(401);
  });
});
