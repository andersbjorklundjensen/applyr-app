
const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');

router.post('/api/user/login', require('./login'));
router.post('/api/user/register', require('./register'));
router.post('/api/user/logout', authCheck, require('./logout'));
router.post('/api/user/username', require('./username'));

module.exports = router;
