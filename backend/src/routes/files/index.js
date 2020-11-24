const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');
const multer = require('multer')
const crypto = require('crypto')
const mime = require('mime-types')
const path = require('path')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const randomId = crypto.randomBytes(10).toString('hex');
    cb(null, `${file.fieldname}-${randomId}-${Date.now()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.txt' && ext !== '.doc' && ext !== '.docx' && ext !== '.jpg') {
      return callback(new Error('Invalid file type'));
    }
    callback(null, true);
  },
})
  .fields([
    { name: 'file', maxCount: 4 },
  ]);

router.get('/api/files/:jobId', authCheck, require('./get-all-files-for-job'));
router.get('/api/file/:id', authCheck, require('./download-file'));
router.post('/api/file/:jobId', authCheck, upload, require('./upload-file'));
router.delete('/api/file/:id', authCheck, require('./delete-file'));

module.exports = router;