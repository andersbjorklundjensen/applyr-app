
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const { cv, coverLetter } = req.files;

  const jobId = req.params.jobid;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).send('invalid job id');
  }

  const jobExists = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId });

  if (!jobExists) {
    return res.status(400).send('job doesnt exist');
  }

  if (cv) {
    await req.app.locals.db.models.jobs
      .updateOne({ _id: jobId, ownerId: res.locals.userId }, {
        $set: {
          cvPath: cv[0].filename,
        },
      });
  }

  if (coverLetter) {
    await req.app.locals.db.models.jobs
      .updateOne({ _id: jobId, ownerId: res.locals.userId }, {
        $set: {
          coverLetterPath: coverLetter[0].filename,
        },
      });
  }

  res.json({
    success: true,
  });
};
