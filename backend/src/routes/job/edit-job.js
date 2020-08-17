
const mongoose = require('mongoose');
const utils = require('./utils');
const screenshotWebsite = require('../../helpers/screenshotWebsite');

module.exports = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).send('invalid job id');
  }

  const jobInfo = {
    ...req.body,
    currentStatus: parseInt(req.body.currentStatus),
    dateApplied: parseInt(req.body.dateApplied)
  }

  if (!utils.isJobValid(jobInfo)) {
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
  } = jobInfo;

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (job.linkToPosting !== linkToPosting) {
    screenshotWebsite(linkToPosting)
      .catch((e) => console.log(e));
  }

  await req.app.locals.db.models.jobs
    .updateOne({ _id: jobId, ownerId: res.locals.userId }, {
      $set: {
        positionTitle,
        location,
        linkToPosting,
        company,
        dateApplied,
        currentStatus,
        notes,
      },
    });

  res.json({});
};
