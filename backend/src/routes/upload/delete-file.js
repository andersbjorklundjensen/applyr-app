
const fs = require('fs');

module.exports = async (req, res) => {
  const documentType = req.params.documenttype;
  const jobId = req.params.jobid;

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (!job && (!job.cvPath || !job.coverLetterPath)) {
    return res.status(400).send('invalid job id');
  }

  // change the path on that job to empty string
  if (documentType === 'cv') {
    await req.app.locals.db.models.jobs
      .updateOne({ _id: job._id, ownerId: res.locals.userId }, {
        $set: {
          cvPath: '',
        },
      });

    if (`./uploads/${job.cvPath}` !== './uploads/') {
      fs.unlink(`./uploads/${job.cvPath}`, (err) => {
        if (err) throw err;
      });
    }
  } else {
    await req.app.locals.db.models.jobs
      .updateOne({ _id: job._id, ownerId: res.locals.userId }, {
        $set: {
          coverLetterPath: '',
        },
      });

    if (`./uploads/${job.coverLetterPath}` !== './uploads/') {
      fs.unlink(`./uploads/${job.coverLetterPath}`, (err) => {
        if (err) throw err;
      });
    }
  }

  res.json({
    success: true,
  });
};
