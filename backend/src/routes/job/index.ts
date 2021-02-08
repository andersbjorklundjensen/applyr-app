import { Router } from 'express';
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';
import getAllJobs from './get-all-jobs';
import addJob from './add-job';


import deleteJob from './delete-job';

const router = Router();

router.get('/api/job/all', authCheck, getAllJobs);
router.get('/api/job/:id', authCheck, addJob);
router.post('/api/job', authCheck, busboy, require('./add-job'));
router.put('/api/job/:id', authCheck, require('./edit-job'));
router.delete('/api/job/:id', authCheck, deleteJob);

export default router;
