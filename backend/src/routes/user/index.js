
const router = require('express').Router();

router.post('/api/user/login', require('./login'));
router.post('/api/user/register', require('./register'));
router.post('/api/user/logout', require('./logout'));
router.post('/api/user/username', require('./username'));

module.exports = router;
