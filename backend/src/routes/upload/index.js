const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');

router.get('/api/upload/:filename', authCheck, require('./download-files'));

module.exports = router;
