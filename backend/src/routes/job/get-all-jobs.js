
module.exports = async (req, res) => {
  const allJobs = await req.app.locals.db.models.jobs.find({ ownerId: res.locals.userId }).lean();

  if (!allJobs) {
    return res.status(400).send('no jobs found');
  }

  res.json({
    jobs: allJobs,
  });
};
