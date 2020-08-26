
const archiver = require('archiver');
const fs = require('fs');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const crypto = require('crypto');
const constants = require('../../constants');

module.exports = async (req, res) => {
  const randomId = crypto.randomBytes(10).toString('hex');
  const backupFolderName = `backup-${randomId}-${Date.now()}`;
  const folderAbsolutePath = `./backups/${backupFolderName}`;

  const allJobs = await req.app.locals.db.models.jobs.find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs) return res.status(400).send('no jobs');

  await Promise.all(allJobs.map(async (job) => {
    const currentJobFolder = `${folderAbsolutePath}/${job.company}-${Date.now()}`;
    await fs.promises.mkdir(currentJobFolder, { recursive: true }, (err) => {
      if (err) throw (err);
    });

    if (job.cvPath) {
      fs.copyFile(`./uploads/${job.cvPath}`, `${currentJobFolder}/${job.cvPath}`, (err) => {
        if (err) throw err;
      });
    }

    if (job.coverLetterPath) {
      fs.copyFile(`./uploads/${job.coverLetterPath}`, `${currentJobFolder}/${job.coverLetterPath}`, (err) => {
        if (err) throw err;
      });
    }

    if (job.linkToPosting) {
      const linkHash = crypto.createHash('md5').update(job.linkToPosting).digest('hex');
      fs.copyFile(`./screenshots/${linkHash}.png`, `${currentJobFolder}/${linkHash}.png`, (err) => {
        if (err) throw err;
      });
    }

    fs.writeFile(`${currentJobFolder}/info.txt`, JSON.stringify({
      ...job,
      currentStatus: constants.jobStatuses[job.currentStatus]
    }, null, 2), function (err) {
      if (err) throw err;
    });
  }));

  const csvWriter = createCsvWriter({
    path: `${folderAbsolutePath}/data.csv`,
    header: [
      { id: 'positionTitle', title: 'POSITION_TITLE' },
      { id: 'location', title: 'LOCATION' },
      { id: 'linkToPosting', title: 'LINK_TO_POSTING' },
      { id: 'company', title: 'COMPANY' },
      { id: 'dateApplied', title: 'DATE_APPLIED' },
      { id: 'currentStatus', title: 'CURRENT_STATUS' },
      { id: 'cvPath', title: 'CV_PATH' },
      { id: 'coverLetterPath', title: 'COVER_LETTER_PATH' },
    ],
  });

  const allJobsFormatted = allJobs
    .map((job) => {
      delete job.notes;

      return {
        ...job,
        dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
        currentStatus: constants.jobStatuses[job.currentStatus],
      }
    });

  await csvWriter.writeRecords(allJobsFormatted).catch((e) => console.log(e));

  // creating the zip archive
  const output = fs.createWriteStream(`${folderAbsolutePath}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(folderAbsolutePath, false);
  archive.finalize();

  await req.app.locals.db.models.backups.create({
    ownerId: res.locals.userId,
    created: Date.now(),
    filename: `${backupFolderName}.zip`,
  });

  res.json({
    success: true,
  });
};
