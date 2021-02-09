import { Request, Response } from 'express';
import isUsernameValid from './utils/validation/isUsernameValid';

export default async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!isUsernameValid(username))
    return res.status(400).json({ message: 'invalid username' });

  const exists = !!(await req.app.locals.db.models.users.findOne({ username }));

  res.json({
    usernameExists: exists,
  });
};
