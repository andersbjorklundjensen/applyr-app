const router = require('express').Router();
import { authCheck } from '../../middleware/authCheck';
import { busboy } from '../../middleware/busboy';

router.get('/api/job/all', authCheck, require('./get-all-jobs'));
router.get('/api/job/:id', authCheck, require('./get-job'));
router.post('/api/job', authCheck, busboy, require('./add-job'));
router.put('/api/job/:id', authCheck, require('./edit-job'));
router.delete('/api/job/:id', authCheck, require('./delete-job'));

module.exports = router;
