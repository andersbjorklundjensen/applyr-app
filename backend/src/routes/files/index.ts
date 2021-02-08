const router = require('express').Router();
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';
import getAllFilesForJob from './get-all-files-for-job';

router.get('/api/files/:jobId', authCheck, getAllFilesForJob);
router.get('/api/file/:id', authCheck, require('./download-file'));
router.post('/api/file/:jobId', authCheck, busboy, require('./upload-file'));
router.delete('/api/file/:id', authCheck, require('./delete-file'));

export default router;
