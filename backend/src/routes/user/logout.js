
module.exports = async (req, res) => {
  await req.app.locals.db.models.users
    .updateOne({ _id: res.locals.userId }, { lastLogoutTime: Date.now() });

  res.json({
    logout: true,
  });
};
