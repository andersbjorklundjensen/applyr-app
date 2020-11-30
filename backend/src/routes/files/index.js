const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');
const busboy = require('../../middleware/busboy');

router.get('/api/files/:jobId', authCheck, require('./get-all-files-for-job'));
router.get('/api/file/:id', authCheck, require('./download-file'));
router.post('/api/file/:jobId', authCheck, busboy, require('./upload-file'));
router.delete('/api/file/:id', authCheck, require('./delete-file'));

module.exports = router;