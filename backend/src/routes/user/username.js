
const is = require('is_js');

module.exports = async (req, res) => {
  const { username } = req.body;

  if (!username || !is.string(username) || username.length > 50) {
    return res.status(400).send('invalid username');
  }

  const exists = !!(await req.app.locals.db.models.users.findOne({ username }));

  res.json({
    usernameExists: exists,
  });
};
