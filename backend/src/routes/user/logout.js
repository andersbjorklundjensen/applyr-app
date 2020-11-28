
const util = require('util');
const jwt = require('jsonwebtoken');

const verifyJwt = util.promisify(jwt.verify);
const config = require('../../config');

module.exports = async (req, res) => {
  const authToken = await verifyJwt(req.get('authorization'), config.JWT_SECRET)
    .catch((err) => err);

  await req.app.locals.db.models.users
    .updateOne({ _id: authToken.userId }, { lastLogoutTime: Date.now() });

  res.json({
    logout: true,
  });
};
