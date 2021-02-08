import archiver from 'archiver';
import crypto from 'crypto';
import initFileDb from '../../fileDb';
const fileDb = initFileDb();
import {
  appendAllFilesToArchive,
  appendScreenshotToArchive,
  appendDbJobEntryToArchive,
} from './request-backup/';

import {
  appendCsvOverviewFileToArchive,
} from './request-backup/createCsvString';

import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  const allJobs = await req.app.locals.db.models.jobs
    .find({ ownerId: res.locals.userId })
    .lean();

  if (!allJobs || allJobs.length === 0)
    return res.status(400).json({ message: 'no jobs' });

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('error', (err: any) => {
    console.log(err);
    throw err;
  });

  await Promise.all(
    allJobs.map(async (job: any) => {
      const allFiles = await req.app.locals.db.models.files
        .find({ jobId: job._id })
        .lean();

      await appendAllFilesToArchive(allFiles, job, archive);
      await appendScreenshotToArchive(job, archive);
      await appendDbJobEntryToArchive(job, archive);
    }),
  );

  appendCsvOverviewFileToArchive(allJobs, archive);

  archive.finalize();

  const randomId = crypto.randomBytes(10).toString('hex');
  const backupFilename = `backup-${randomId}-${Date.now()}.zip`;
  fileDb.putObject('backups', backupFilename, archive);

  const newBackup = await req.app.locals.db.models.backups.create({
    ownerId: res.locals.userId,
    created: Date.now(),
    filename: backupFilename,
  });

  res.json({
    backupId: newBackup._id,
    success: true,
  });
};
