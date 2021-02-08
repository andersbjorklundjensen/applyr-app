import crypto from 'crypto';
import supertest from 'supertest';

export const constructJob = () => {
  return {
    positionTitle: crypto.randomBytes(6).toString('hex'),
    location: crypto.randomBytes(6).toString('hex'),
    linkToPosting: 'https://www.youtube.com/',
    company: crypto.randomBytes(6).toString('hex'),
    dateApplied: Math.floor(Math.random() * 10 + 1),
    currentStatus: 1,
    notes: crypto.randomBytes(6).toString('hex'),
    id: null,
    files: './src/routes/job/utils/test/files/cv.txt',
  };
};

export const createJobInDb = async (server: any, user: any) => {
  const job = constructJob();

  await supertest(server)
    .post('/api/job')
    .set('authorization', user.token)
    .field('positionTitle', job.positionTitle)
    .field('location', job.location)
    .field('linkToPosting', job.linkToPosting)
    .field('company', job.company)
    .field('dateApplied', job.dateApplied)
    .field('currentStatus', job.currentStatus)
    .field('notes', job.notes)
    .attach('files', job.files)
    .type('form')
    .expect(200)
    .then((response) => {
      job.id = response.body.jobId;
    });

  return job;
};
