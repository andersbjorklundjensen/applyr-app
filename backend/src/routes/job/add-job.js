const utils = require('./utils');
const jobValidationSchema = require('./utils/jobValidationSchema');

module.exports = async (req, res) => {
  const job = {
    ...req.body,
    currentStatus: parseInt(req.body.currentStatus),
    dateApplied: parseInt(req.body.dateApplied)
  }

  const { value, error } = jobValidationSchema.validate(job);

  if (error) return res.status(400).json({ message: error.message });

  const newJob = await req.app.locals.db.models.jobs.create({
    ...job,
    ownerId: res.locals.userId,
  });

  if (req.files.files) {
    await Promise.all(req.files.files.map(async (file) => {
      await req.app.locals.db.models.files.create({
        jobId: newJob._id,
        filename: file.originalname,
        path: file.filename,
      });
    }));
  }

  utils.screenshotWebsite(job.linkToPosting)
    .catch((e) => console.log(e));

  res.json({
    jobId: newJob._id,
  });
};
