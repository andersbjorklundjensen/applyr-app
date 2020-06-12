const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');

router.get('/api/job/all', authCheck, require('./get-all-jobs'));
router.get('/api/job/:id', authCheck, require('./get-job'));
router.post('/api/job', authCheck, require('./add-job'));
router.put('/api/job/:id', authCheck, require('./edit-job'));
router.delete('/api/job/:id', authCheck, require('./delete-job'));

module.exports = router;
