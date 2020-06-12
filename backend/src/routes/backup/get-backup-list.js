
module.exports = async (req, res) => {
  const allBackups = await req.app.locals.db.models.backups.find({ ownerId: res.locals.userId });

  if (!allBackups) {
    res.status(400).send('no backups have been requested');
  }

  res.json({
    backups: allBackups,
  });
};
