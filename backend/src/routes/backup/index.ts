const router = require('express').Router();
import { authCheck } from '../../middleware/authCheck';
import getBackupList from './get-backup-list';
import downloadBackup from './download-backup';

router.get('/api/backup/list', authCheck, getBackupList); // get list of all backups
router.get('/api/backup/:backupId', authCheck, downloadBackup); // downloading backup
router.post('/api/backup/request', authCheck, require('./request-backup')); // requesting backup

export default router;
