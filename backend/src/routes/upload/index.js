const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');

router.get('/api/upload/:filename', authCheck, require('./download-files'));
router.delete('/api/upload/:jobid/:documenttype', authCheck, require('./delete-file'));

module.exports = router;
