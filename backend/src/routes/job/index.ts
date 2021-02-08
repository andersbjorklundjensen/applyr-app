import { Router } from 'express';
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';
import getAllJobs from './get-all-jobs';
import getJob from './get-job';
import addJob from './add-job';
import editJob from './edit-job';
import deleteJob from './delete-job';

const router = Router();

router.get('/api/job/all', authCheck, getAllJobs);
router.get('/api/job/:id', authCheck, getJob);
router.post('/api/job', authCheck, busboy, addJob);
router.put('/api/job/:id', authCheck, editJob);
router.delete('/api/job/:id', authCheck, deleteJob);

export default router;
