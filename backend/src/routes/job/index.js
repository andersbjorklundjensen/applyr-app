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
    { name: 'files', maxCount: 4 },
  ]);

router.get('/api/job/all', authCheck, require('./get-all-jobs'));
router.get('/api/job/:id', authCheck, require('./get-job'));
router.post('/api/job', authCheck, upload, require('./add-job'));
router.put('/api/job/:id', authCheck, upload, require('./edit-job'));
router.delete('/api/job/:id', authCheck, require('./delete-job'));

module.exports = router;
