
module.exports = async (req, res) => {
  const { filename } = req.params;

  const allJobs = await req.app.locals.db.models.jobs.find({ ownerId: res.locals.userId })
    .lean();

  const exists = !!(allJobs
    .find((job) => ((job.coverLetterPath === filename) || (job.cvPath === filename))));

  if (!exists) {
    return res.status(400).send('file does not exist');
  }

  res.download(`uploads/${filename}`);
};
