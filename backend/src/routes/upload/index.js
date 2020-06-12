const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime-types');
const path = require('path');
const authCheck = require('../../middleware/authCheck');

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
    if (ext !== '.pdf' && ext !== '.txt' && ext !== '.doc' && ext !== '.docx') {
      return callback(new Error('Invalid file type'));
    }
    callback(null, true);
  },
})
  .fields([
    { name: 'cv', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
  ]);

router.get('/api/upload/:filename', authCheck, require('./download-files'));
router.put('/api/upload/:jobid/', authCheck, upload, require('./upload-files'));
router.delete('/api/upload/:jobid/:documenttype', authCheck, require('./delete-file'));

module.exports = router;
