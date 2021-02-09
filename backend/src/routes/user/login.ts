import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../../config';
import isUsernameValid from './utils/validation/isUsernameValid';
import isPasswordValid from './utils/validation/isPasswordValid';
import { signJwt } from '../../jsonwebtokenUtils/signJwt';

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!isUsernameValid(username) || !isPasswordValid(password))
    return res.status(400).json({ message: 'invalid credentials' });

  const account = await req.app.locals.db.models.users.findOne({ username });
  if (!account)
    return res.status(400).json({ message: 'account does not exist' });

  const passwordHash: any = crypto
    .createHash('sha512')
    .update(password)
    .digest('hex');

  const validPassword = await bcrypt.compare(passwordHash, account.password);

  if (!validPassword)
    return res.status(400).json({ message: 'invalid login credentials' });

  const token = await signJwt(
    { userId: account._id, created: Date.now() },
    config.JWT_SECRET,
    { expiresIn: '5h' },
  );

  res.json({
    token,
  });
};
