
module.exports = async (req, res) => {
  const { fileId } = req.params;

  const file = await req.app.locals.db.models.files.findOne({ _id: fileId }).lean();
  if (!file) return res.status(400).send('file does not exist');

  const job = await req.app.locals.db.models.jobs.findOne({ _id: file.jobId, ownerId: res.locals.userId }).lean();
  if (!job) return res.status(400).send('file is inaccessible');

  res.download(`uploads/${file.path}`);
};
