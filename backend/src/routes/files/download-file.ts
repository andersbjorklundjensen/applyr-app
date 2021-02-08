import initFileDb from '../../fileDb';
import { Request, Response } from 'express';
const fileDb = initFileDb();

export default async (req: Request, res: Response) => {
  const { id: fileId } = req.params;

  const file = await req.app.locals.db.models.files
    .findOne({ _id: fileId })
    .lean();
    
  if (!file) return res.status(400).json({ message: 'file does not exist' });

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: file.jobId, ownerId: res.locals.userId })
    .lean();

  if (!job) return res.status(400).json({ message: 'file is inaccessible' });

  fileDb.getObject('files', file.storedFilename, (err, fileStream) => {
    if (err) return console.log(err);

    fileStream.on('data', (chunk) => res.write(chunk));
    fileStream.on('end', () => res.end());
  });
};
