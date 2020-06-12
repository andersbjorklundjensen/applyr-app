
const validateJob = require('../../helpers/validateJob');
const screenshotWebsite = require('../../helpers/screenshotWebsite');

module.exports = async (req, res) => {
  const {
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
  } = req.body;

  validateJob(res, req.body);

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

  screenshotWebsite(linkToPosting)
    .catch((e) => console.log(e));

  res.json({
    jobId: newJob._id,
  });
};
