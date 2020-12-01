
const archiver = require('archiver');
const fs = require('fs');
const moment = require('moment');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const crypto = require('crypto');
const constants = require('../../constants');
const { Writable, Readable } = require('stream');
const fileDb = require('../../fileDb')();

module.exports = async (req, res) => {
  // check for jobs
  const allJobs = await req.app.locals.db.models.jobs
    .find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs || allJobs.length === 0)
    return res.status(400).json({ message: 'no jobs' });

  // copy files 
  // const output = fs.createWriteStream(__dirname + '/example.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.on('error', (err) => {
    console.log(err)
    throw err;
  });

  await Promise.all(allJobs.map(async (job) => {
    const allFiles = await req.app.locals.db.models.files
      .find({ jobId: job._id })
      .lean();

    // add uploaded files to archive
    await Promise.all(allFiles.map(async (file) => {
      const storedFile = await readFileFromServer('files', file.storedFilename);
      archive.append(storedFile, { name: `./${job.company}/${file.originalFilename}` })
    }));

    // add screenshot to archive
    const linkHash = crypto.createHash('md5').update(job.linkToPosting).digest('hex');
    const screenshot = await readFileFromServer('screenshots', `${linkHash}.png`);
    archive.append(screenshot, { name: `./${job.company}/screenshot.png` })

    // add db job entry to archive
    const entry = JSON.stringify({
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: constants.jobStatuses[job.currentStatus]
    }, null, 2);
    archive.append(entry, { name: `./${job.company}/info.json` });
  }))

  // add csv file
  const formattedJobs = formatJobs(allJobs)
  archive.append(getCsvString(csvHeaders, formattedJobs), {
    name: 'data.csv'
  });

  // zip files
  archive.finalize()
  // archive.pipe(output);

  // send archive back to file server
  const randomId = crypto.randomBytes(10).toString('hex');
  fileDb.putObject('backups', `backup-${randomId}-${Date.now()}.zip`, archive);

  res.json({
    success: true,
  });
};

function readFileFromServer(bucket, storedFilename) {
  const file = [];
  return new Promise((resolve, reject) => {
    fileDb.getObject(bucket, storedFilename, (err, fileStream) => {
      if (err) reject(err);

      fileStream.on('data', (chunk) => file.push(chunk))
      fileStream.on('end', () => {
        const readableFile = new Readable();
        readableFile.push(Buffer.concat(file))
        readableFile.push(null)
        resolve(readableFile);
      });
    });
  });
}

const csvHeaders = [
  { id: 'positionTitle', title: 'POSITION_TITLE' },
  { id: 'location', title: 'LOCATION' },
  { id: 'linkToPosting', title: 'LINK_TO_POSTING' },
  { id: 'company', title: 'COMPANY' },
  { id: 'dateApplied', title: 'DATE_APPLIED' },
  { id: 'currentStatus', title: 'CURRENT_STATUS' },
];

function formatJobs(allJobs) {
  return allJobs
    .map((job) => {
      delete job.notes;

      return {
        ...job,
        dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
        currentStatus: constants.jobStatuses[job.currentStatus],
      }
    });
}

function getCsvString(headers, records) {
  const csvStringifier = createCsvStringifier({
    header: headers,
  });

  return csvStringifier.getHeaderString() +
    csvStringifier.stringifyRecords(records);
}