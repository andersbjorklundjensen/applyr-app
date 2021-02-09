import initFileDb from '../../fileDb';
import { Request, Response } from 'express';
const fileDb = initFileDb();

export default async (req: Request, res: Response) => {
  const { backupId } = req.params;

  const backup = await req.app.locals.db.models.backups
    .findOne({ _id: backupId, ownerId: res.locals.userId })
    .lean();

  if (!backup) {
    return res.status(400).send('backup not available');
  }

  fileDb.getObject('backups', backup.filename, (err, fileStream) => {
    if (err) return console.log(err);

    fileStream.on('data', (chunk) => res.write(chunk));
    fileStream.on('end', () => res.end());
  });
};
