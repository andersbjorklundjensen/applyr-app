const { Readable } = require('stream');
import initFileDb from '../../../fileDb';
const fileDb = initFileDb();
const crypto = require('crypto');
const moment = require('moment');
const constants = require('../../../constants');

async function appendAllFilesToArchive(allFiles, job, archive) {
  await Promise.all(
    allFiles.map(async (file) => {
      const storedFile = await readFileFromServer('files', file.storedFilename);
      archive.append(storedFile, {
        name: `./${job.company}/${file.originalFilename}`,
      });
    }),
  );
}

async function appendScreenshotToArchive(job, archive) {
  const linkHash = crypto
    .createHash('md5')
    .update(job.linkToPosting)
    .digest('hex');
  const screenshot = await readFileFromServer('screenshots', `${linkHash}.png`);
  archive.append(screenshot, { name: `./${job.company}/screenshot.png` });
}

function appendDbJobEntryToArchive(job, archive) {
  const entry = JSON.stringify(
    {
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: constants.jobStatuses[job.currentStatus],
    },
    null,
    2,
  );
  archive.append(entry, { name: `./${job.company}/info.json` });
}

module.exports = {
  appendAllFilesToArchive,
  appendScreenshotToArchive,
  appendDbJobEntryToArchive,
  readFileFromServer,
};

function readFileFromServer(bucket, storedFilename) {
  const file = [];
  return new Promise((resolve, reject) => {
    fileDb.getObject(bucket, storedFilename, (err, fileStream) => {
      if (err) return reject(err);

      fileStream.on('data', (chunk) => file.push(chunk));
      fileStream.on('end', () => {
        const readableFile = new Readable();
        readableFile.push(Buffer.concat(file));
        readableFile.push(null);
        resolve(readableFile);
      });
    });
  });
}
