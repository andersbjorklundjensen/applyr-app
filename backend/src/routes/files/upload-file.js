
module.exports = async (req, res) => {
  const { jobId } = req.params;
  const file = req.files.file[0];
  console.log(file)

  const job = await req.app.locals.db.models.jobs.findOne({ _id: jobId, ownerId: res.locals.userId });

  if (!job) return res.status(400).json({ message: 'could not find job'})

  const newFile = await req.app.locals.db.models.files.create({
    jobId,
    filename: file.originalname,
    path: file.filename,
  });

  res.json({
    success: true,
    fileId: newFile._id,
  })
}