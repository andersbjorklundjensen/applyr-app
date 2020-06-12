const crypto = require('crypto');
const supertest = require('supertest');

class Job {
  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  constructJob() {
    return {
      positionTitle: crypto.randomBytes(6).toString('hex'),
      location: crypto.randomBytes(6).toString('hex'),
      linkToPosting: crypto.randomBytes(6).toString('hex'),
      company: crypto.randomBytes(6).toString('hex'),
      dateApplied: Math.floor((Math.random() * 10) + 1),
      currentStatus: 1,
      notes: crypto.randomBytes(6).toString('hex'),
      id: null,
    };
  }

  async createJob(user) {
    const job = this.constructJob();

    await supertest(this.server)
      .post('/api/job')
      .send(job)
      .set('Authorization', user.token)
      .expect(200)
      .then((response) => {
        job.id = response.body.jobId;
      });

    return job;
  }
}

module.exports = Job;
