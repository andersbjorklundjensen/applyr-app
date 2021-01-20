
module.exports = async (req, res) => {
  const allBackups = await req.app.locals.db.models.backups
    .find({ ownerId: res.locals.userId })

  if (!allBackups || allBackups.length === 0) {
    return res.status(400).json({ message: 'no backups have been requested' });
  }

  res.json({
    backups: allBackups,
  });
};
