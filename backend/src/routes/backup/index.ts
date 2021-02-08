const router = require('express').Router();
import { authCheck } from '../../middleware/authCheck';

router.get('/api/backup/list', authCheck, require('./get-backup-list')); // get list of all backups
router.get('/api/backup/:backupId', authCheck, require('./download-backup')); // downloading backup
router.post('/api/backup/request', authCheck, require('./request-backup')); // requesting backup

export default router;
