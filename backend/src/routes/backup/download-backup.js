
module.exports = async (req, res) => {
  const { filename } = req.params;

  const allBackups = await req.app.locals.db.models.backups.find({ ownerId: res.locals.userId });

  if (!allBackups) {
    return res.status(400).send('no backups available');
  }

  const exists = !!(allBackups
    .find((backup) => backup.filename === filename));

  if (!exists) {
    res.status(400).send('no such backup');
  }

  res.download(`backups/${filename}`);
};
