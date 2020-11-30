
module.exports = async (req, res) => {
  const allJobs = await req.app.locals.db.models.jobs
    .find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs || allJobs.length == 0) {
    return res.status(400).json({ message: 'no jobs found' });
  }

  res.json({
    jobs: allJobs,
  });
};
