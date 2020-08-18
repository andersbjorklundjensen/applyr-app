const crypto = require('crypto');
const supertest = require('supertest');
const { createUserInDb } = require('../../../user/utils/test');

const constructJob = () => {
  return {
    positionTitle: crypto.randomBytes(6).toString('hex'),
    location: crypto.randomBytes(6).toString('hex'),
    linkToPosting: 'https://www.youtube.com/',
    company: crypto.randomBytes(6).toString('hex'),
    dateApplied: Math.floor((Math.random() * 10) + 1),
    currentStatus: 1,
    notes: crypto.randomBytes(6).toString('hex'),
    id: null,
    cv: './src/routes/job/utils/test/files/cv.txt',
    coverLetter: './src/routes/job/utils/test/files/cv.txt',
  };
}

const createJobInDb = async (server, user) => {
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
    .attach('cv', job.cv)
    .attach('coverLetter', job.coverLetter)
    .type('form')
    .expect(200)
    .then((response) => {
      job.id = response.body.jobId;
    });

  return job;
}

exports.constructJob = constructJob;
exports.createJobInDb = createJobInDb;