
const archiver = require('archiver');
const fs = require('fs');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const crypto = require('crypto');
const utils = require('./utils');

module.exports = async (req, res) => {
  const randomId = crypto.randomBytes(10).toString('hex');
  const filename = `backup-${randomId}-${Date.now()}`;
  const folderAbsolutePath = `./backups/${filename}`;

  const allJobs = await req.app.locals.db.models.jobs.find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs) return res.status(400).send('no jobs');

  await utils.createBackupFolderStructure(folderAbsolutePath).catch((e) => console.log(e));

  // copying CVs
  allJobs.map((job) => {
    if (job.cvPath) {
      fs.copyFile(`./uploads/${job.cvPath}`, `${folderAbsolutePath}/CVs/${job.cvPath}`, (err) => {
        if (err) console.log(err);
        console.log(`${job.cvPath} copied`);
      });
    }
  });

  // copying cover letters
  allJobs.map((job) => {
    if (job.coverLetterPath) {
      fs.copyFile(`./uploads/${job.coverLetterPath}`, `${folderAbsolutePath}/Cover-letters/${job.cvPath}`, (err) => {
        if (err) console.log(err);
      });
    }
  });

  // copying job listings
  allJobs.map((job) => {
    if (job.linkToPosting) {
      const linkHash = crypto.createHash('md5').update(job.linkToPosting).digest('hex');
      fs.copyFile(`./screenshots/${linkHash}.png`, `${folderAbsolutePath}/Cover-letters/${linkHash}.png`, (err) => {
        if (err) console.log(err);
      });
    }
  });


  const jobStatuses = ['', 'Applied', 'Interviewing', 'Under review', 'Offer received', 'Rejected'];
  const csvWriter = createCsvWriter({
    path: `${folderAbsolutePath}/data.csv`,
    header: [
      { id: 'positionTitle', title: 'POSITION_TITLE' },
      { id: 'location', title: 'LOCATION' },
      { id: 'linkToPosting', title: 'LINK_TO_POSTING' },
      { id: 'company', title: 'COMPANY' },
      { id: 'dateApplied', title: 'DATE_APPLIED' },
      { id: 'currentStatus', title: 'CURRENT_STATUS' },
      { id: 'notes', title: 'NOTES' },
      { id: 'cvPath', title: 'CV_PATH' },
      { id: 'coverLetterPath', title: 'COVER_LETTER_PATH' },
    ],
  });

  const allJobsFormatted = allJobs
    .map((job) => ({
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: jobStatuses[job.currentStatus],
    }));

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
    filename: `${filename}.zip`,
  });

  res.json({
    success: true,
  });
};
