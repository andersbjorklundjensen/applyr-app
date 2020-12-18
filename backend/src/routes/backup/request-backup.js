
const archiver = require('archiver');
const crypto = require('crypto');
const fileDb = require('../../fileDb')();
const {
  appendAllFilesToArchive,
  appendScreenshotToArchive,
  appendDbJobEntryToArchive,
} = require('./request-backup/');

const {
  appendCsvOverviewFileToArchive
} = require('./request-backup/createCsvString');

module.exports = async (req, res) => {
  const allJobs = await req.app.locals.db.models.jobs
    .find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs || allJobs.length === 0)
    return res.status(400).json({ message: 'no jobs' });

  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  archive.on('error', (err) => {
    console.log(err)
    throw err;
  });

  await Promise.all(allJobs.map(async (job) => {
    const allFiles = await req.app.locals.db.models.files
      .find({ jobId: job._id })
      .lean();

    await appendAllFilesToArchive(allFiles, job, archive);
    await appendScreenshotToArchive(job, archive);
    await appendDbJobEntryToArchive(job, archive);
  }))

  appendCsvOverviewFileToArchive(allJobs, archive);

  archive.finalize()

  const randomId = crypto.randomBytes(10).toString('hex');
  const backupFilename = `backup-${randomId}-${Date.now()}.zip`;
  fileDb.putObject('backups', backupFilename, archive);

  const newBackup = await req.app.locals.db.models.backups
    .create({
      ownerId: res.locals.userId,
      created: Date.now(),
      filename: backupFilename,
    });

  res.json({
    backupId: newBackup._id,
    success: true,
  });
};
