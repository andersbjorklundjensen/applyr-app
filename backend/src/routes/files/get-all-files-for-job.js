
module.exports = async (req, res) => {
  const { jobId } = req.params;

  const job = await req.app.locals.db.models.jobs
    .findOne({ ownerId: res.locals.userId, _id: jobId });

  if (!job) return res.status(400).json({ message: 'job doesnt exist' });

  const files = await req.app.locals.db.models.files.find({ jobId });

  res.json({
    files,
  });
}