
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'invalid job id' });
  }

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();

  if (!job) {
    return res.status(400).json({ message: 'job not found' });
  }

  res.json({
    job,
  });
};
