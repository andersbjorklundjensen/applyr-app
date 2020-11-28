
module.exports = async (req, res) => {
  const { backupId } = req.params;

  const backup = await req.app.locals.db.models.backups
    .findOne({ _id: backupId, ownerId: res.locals.userId })
    .lean();

  if (!backup) {
    return res.status(400).send('backup not available');
  }

  res.download(`backups/${backup.filename}`);
};
