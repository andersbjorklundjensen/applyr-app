import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { Request, Response } from 'express';
import isUsernameValid from './utils/validation/isUsernameValid';
import isPasswordValid from './utils/validation/isPasswordValid';
import { signJwt } from '../../jsonwebtokenUtils/signJwt';

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!isUsernameValid(username) || !isPasswordValid(password))
    return res.status(400).json({ message: 'invalid credentials' });

  const accountExists = await req.app.locals.db.models.users.findOne({
    username,
  });
  if (accountExists)
    return res.status(400).json({ message: 'account already exists' });

  const passwordHash = crypto
    .createHash('sha512')
    .update(password)
    .digest('hex');
  const encryptedPassword = await bcrypt.hash(passwordHash, 11);

  const user = await req.app.locals.db.models.users.create({
    username,
    password: encryptedPassword,
    created: Date.now(),
    lastLogoutTime: 0,
  });

  const token = await signJwt(
    { userId: user._id, created: Date.now() },
    config.JWT_SECRET,
    { expiresIn: '5h' },
  );

  res.json({
    token,
  });
};
