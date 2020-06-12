/* globals describe */

module.exports = function () {
  describe('[POST] /api/user/username - Check if username is taken', require('./username'));
  describe('[POST] /api/user/register - Register user', require('./register'));
  describe('[POST] /api/user/register - Login user', require('./login'));
  describe('[POST] /api/user/logout - Logout user', require('./logout'));
};
