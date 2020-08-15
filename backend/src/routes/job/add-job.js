const validateJob = require('../../helpers/validateJob');
const screenshotWebsite = require('../../helpers/screenshotWebsite');

module.exports = async (req, res) => {
  const job = {
    ...req.body,
    dateApplied: parseInt(req.body.dateApplied)
  }

  validateJob(res, job);

  const {
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
  } = job;

  const { cv, coverLetter } = req.files;

  const newJob = await req.app.locals.db.models.jobs.create({
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
    ownerId: res.locals.userId,
    cvPath: cv ? cv[0].filename : '',
    coverLetterPath: coverLetter ? coverLetter[0].filename : '',
  });

  screenshotWebsite(linkToPosting)
    .catch((e) => console.log(e));

  res.json({
    jobId: newJob._id,
  });
};
