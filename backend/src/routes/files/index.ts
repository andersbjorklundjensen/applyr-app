const router = require('express').Router();
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';
import getAllFilesForJob from './get-all-files-for-job';
import downloadFile from './download-file';

import deleteFile from './delete-file';

router.get('/api/files/:jobId', authCheck, getAllFilesForJob);
router.get('/api/file/:id', authCheck, downloadFile);
router.post('/api/file/:jobId', authCheck, busboy, require('./upload-file'));
router.delete('/api/file/:id', authCheck, deleteFile);

export default router;
