
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

  const files = await req.app.locals.db.models.files.find({ jobId }).lean();

  await Promise.all(files.map(async (file) => {
    fs.unlink(`uploads/${file.path}`, (err) => {
      if (err) throw err;
    });

    await req.app.locals.db.models.files.deleteOne({ _id: file._id });
  }));

  await req.app.locals.db.models.jobs
    .deleteOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  res.json({
    success: true,
    jobId,
  });
};
