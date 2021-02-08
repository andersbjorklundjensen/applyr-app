import { Router } from 'express';
import { authCheck } from '../../middleware/authCheck';
import getBackupList from './get-backup-list';
import downloadBackup from './download-backup';
import requestBackup from './request-backup';

const router = Router();

router.get('/api/backup/list', authCheck, getBackupList); // get list of all backups
router.get('/api/backup/:backupId', authCheck, downloadBackup); // downloading backup
router.post('/api/backup/request', authCheck, requestBackup); // requesting backup

export default router;
