
const utils = require('./utils')
const jobValidationSchema = require('./utils/jobValidationSchema');

module.exports = async (req, res) => {
  const job = {
    ...res.locals.fields,
    currentStatus: parseInt(res.locals.fields.currentStatus),
    dateApplied: parseInt(res.locals.fields.dateApplied)
  }

  const { value, error } = jobValidationSchema.validate(job);

  if (error) return res.status(400).json({ message: error.message });

  const newJob = await req.app.locals.db.models.jobs.create({
    ...job,
    ownerId: res.locals.userId,
  });

  if (res.locals.files.length != 0) {
    await Promise.all(res.locals.files.map(async (file) => {
      await req.app.locals.db.models.files.create({
        jobId: newJob._id,
        filename: file.filename,
        path: 'asdf',
      });
    }));
  }

  utils.screenshotWebsite(job.linkToPosting)
    .catch((e) => console.log(e));

  res.json({
    jobId: newJob._id,
  });
}