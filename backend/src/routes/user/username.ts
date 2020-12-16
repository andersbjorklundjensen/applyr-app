import { Request, Response } from 'express';
import Username from '../../users/entities/Username';

export default async (req: Request, res: Response) => {
  const { username } = req.body;

  const usernameResult = Username.create(username);
  if (usernameResult.isFailure)
    return res.status(400).json({ message: usernameResult.error });

  const exists = !!(await req.app.locals.db.models.users.findOne({ username }));

  res.json({
    usernameExists: exists,
  });
};
