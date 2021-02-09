import { Router } from 'express';
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';
import getAllFilesForJob from './get-all-files-for-job';
import downloadFile from './download-file';
import uploadFile from './upload-file';
import deleteFile from './delete-file';

const router = Router();

router.get('/api/files/:jobId', authCheck, getAllFilesForJob);
router.get('/api/file/:id', authCheck, downloadFile);
router.post('/api/file/:jobId', authCheck, busboy, uploadFile);
router.delete('/api/file/:id', authCheck, deleteFile);

export default router;
