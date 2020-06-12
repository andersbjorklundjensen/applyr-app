
const mongoose = require('mongoose');
const fs = require('fs');

module.exports = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).send('invalid job id');
  }

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (!job) {
    return res.status(400).send('job not found');
  }

  if (job.cvPath) {
    fs.unlink(`uploads/${job.cvPath}`, (err) => {
      if (err) throw err;
    });
  }

  if (job.coverLetterPath) {
    fs.unlink(`uploads/${job.coverLetterPath}`, (err) => {
      if (err) throw err;
    });
  }

  const deletedJob = await req.app.locals.db.models.jobs
    .deleteOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (deletedJob.deletedCount !== 1) {
    return res.status(401).send('cant access job');
  }

  res.json({
    success: true,
    jobId,
  });
};
