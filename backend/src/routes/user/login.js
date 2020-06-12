
const jwt = require('jsonwebtoken');
const util = require('util');

const jwtSign = util.promisify(jwt.sign);
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const is = require('is_js');
const config = require('../../config');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !is.string(username) || username.length > 50) {
    return res.status(400).send('invalid username');
  }

  if (!password || !is.string(password) || password.length > 50) {
    return res.status(400).send('invalid password');
  }

  const account = await req.app.locals.db.models.users.findOne({ username });
  if (!account) return res.status(400).send('account does not exist');

  const passwordHash = crypto.createHash('sha512').update(password).digest('hex');
  const isPasswordValid = await bcrypt.compare(passwordHash, account.password);

  if (!isPasswordValid) return res.status(400).send('invalid login credentials');

  const token = await jwtSign({ userId: account._id, created: Date.now() }, config.JWT_SECRET, { expiresIn: '5h' });

  res.json({
    token,
  });
};
