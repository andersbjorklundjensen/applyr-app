
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const is = require('is_js');
const util = require('util');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const jwtSign = util.promisify(jwt.sign);

module.exports = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !is.string(username) || username.length > 50) {
    return res.status(400).send('invalid username');
  }

  if (!password || !is.string(password) || password.length > 50 || password.length < 8) {
    return res.status(400).send('invalid password');
  }

  const accountExists = await req.app.locals.db.models.users.findOne({ username });
  if (accountExists) return res.status(400).send('account already exists');

  const passwordHash = crypto.createHash('sha512').update(password).digest('hex');
  const encryptedPassword = await bcrypt.hash(passwordHash, 11);

  const user = await req.app.locals.db.models.users.create({
    username,
    password: encryptedPassword,
    created: Date.now(),
    lastLogoutTime: 0,
  });

  const token = await jwtSign({ userId: user._id, created: Date.now() }, config.JWT_SECRET, { expiresIn: '5h' });

  res.json({
    token,
  });
};
