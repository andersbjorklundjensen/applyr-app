import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { screenshotWebsite } from './utils';
import jobValidationSchema from './utils/jobValidationSchema';

export default async (req: Request, res: Response) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'invalid job id' });
  }

  const job = {
    ...req.body,
    currentStatus: parseInt(req.body.currentStatus),
    dateApplied: parseInt(req.body.dateApplied),
  };

  const { value, error } = jobValidationSchema.validate(job);

  if (error) return res.status(400).json({ message: error.message });

  const currentJob = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId })
    .lean();

  if (!currentJob) return res.status(400).json({ message: 'job not found' });

  screenshotWebsite(job.linkToPosting).catch((e) => console.log(e));

  await req.app.locals.db.models.jobs.updateOne(
    { _id: jobId, ownerId: res.locals.userId },
    {
      $set: {
        ...job,
      },
    },
  );

  res.json({});
};
