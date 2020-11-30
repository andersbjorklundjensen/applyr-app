
const mongoose = require('mongoose');
const utils = require('./utils');
const fs = require('fs');

module.exports = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'invalid job id' });
  }

  const job = {
    ...res.locals.fields,
    currentStatus: parseInt(res.locals.fields.currentStatus),
    dateApplied: parseInt(res.locals.fields.dateApplied)
  }

  const { value, error } = jobValidationSchema.validate(job);

  if (error) return res.status(400).json({ message: error.message });

  const currentJob = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (!currentJob) return res.status(400).json({ message: 'job not found' });

  utils.screenshotWebsite(job.linkToPosting)
    .catch((e) => console.log(e));

  await req.app.locals.db.models.jobs
    .updateOne({ _id: jobId, ownerId: res.locals.userId }, {
      $set: {
        ...job
      },
    });

  res.json({});
};
