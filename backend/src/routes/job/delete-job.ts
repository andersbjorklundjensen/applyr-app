import mongoose from 'mongoose';
import { Request, Response } from 'express';
import initFileDb from '../../fileDb';
const fileDb = initFileDb();

export default async (req: Request, res: Response) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'invalid job id' });
  }

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId })
    .lean();

  if (!job) {
    return res.status(400).json({ message: 'job not found' });
  }

  const files = await req.app.locals.db.models.files.find({ jobId }).lean();

  await Promise.all(
    files.map(async (file: any) => {
      fileDb.removeObject('files', file.storedFilename);

      await req.app.locals.db.models.files.deleteOne({ _id: file._id });
    }),
  );

  await req.app.locals.db.models.jobs
    .deleteOne({ _id: jobId, ownerId: res.locals.userId })
    .lean();

  res.json({
    success: true,
    jobId,
  });
};
