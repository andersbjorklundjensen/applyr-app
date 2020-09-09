const utils = require('./utils');

module.exports = async (req, res) => {
  const job = {
    ...req.body,
    currentStatus: parseInt(req.body.currentStatus),
    dateApplied: parseInt(req.body.dateApplied)
  }

  if (!utils.isJobValid(job)) {
    return res.status(400).send('invalid job parameters');
  }

  const {
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
  } = job;

  const newJob = await req.app.locals.db.models.jobs.create({
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
    ownerId: res.locals.userId,
  });

  await Promise.all(req.files.files.map(async (file) => {
    await req.app.locals.db.models.files.create({
      jobId: newJob._id,
      filename: file.originalname,
      path: file.filename,
    });
  }));

  utils.screenshotWebsite(linkToPosting)
    .catch((e) => console.log(e));

  res.json({
    jobId: newJob._id,
  });
};
