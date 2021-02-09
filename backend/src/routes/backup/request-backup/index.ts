import { Readable } from 'stream';
import initFileDb from '../../../fileDb';
import crypto from 'crypto';
import moment from 'moment';
import { jobStatuses } from '../../../constants';
const fileDb = initFileDb();

async function appendAllFilesToArchive(allFiles: any, job: any, archive: any) {
  await Promise.all(
    allFiles.map(async (file: any) => {
      const storedFile = await readFileFromServer('files', file.storedFilename);
      archive.append(storedFile, {
        name: `./${job.company}/${file.originalFilename}`,
      });
    }),
  );
}

async function appendScreenshotToArchive(job: any, archive: any) {
  const linkHash = crypto
    .createHash('md5')
    .update(job.linkToPosting)
    .digest('hex');
  const screenshot = await readFileFromServer('screenshots', `${linkHash}.png`);
  archive.append(screenshot, { name: `./${job.company}/screenshot.png` });
}

function appendDbJobEntryToArchive(job: any, archive: any) {
  const entry = JSON.stringify(
    {
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: jobStatuses[job.currentStatus],
    },
    null,
    2,
  );
  archive.append(entry, { name: `./${job.company}/info.json` });
}

export {
  appendAllFilesToArchive,
  appendScreenshotToArchive,
  appendDbJobEntryToArchive,
  readFileFromServer,
};

function readFileFromServer(bucket: any, storedFilename: any) {
  const file: any = [];
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
