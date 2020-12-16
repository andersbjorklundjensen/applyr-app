import { Request, Response } from "express";
import Username from '../../users/entities/Username';
import Password from '../../users/entities/Password';
import Result from '../../shared/Result';

import jwt from 'jsonwebtoken';
import util from 'util';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../../config';

const jwtSign = util.promisify(jwt.sign);

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usernameResult = Username.create(username);
  const passwordResult = Password.create(password);

  const combinedResult = Result.combine([usernameResult, passwordResult]);
  if (combinedResult.isFailure)
    return res.status(400).json({ message: combinedResult.error });

  const account = await req.app.locals.db.models.users.findOne({ username });
  if (!account) return res.status(400).send('account does not exist');

  const passwordHash = crypto.createHash('sha512').update(password).digest('hex');
  const isPasswordValid = await bcrypt.compare(passwordHash, account.password);

  if (!isPasswordValid) return res.status(400).send('invalid login credentials');

  // @ts-ignore
  const token = await jwtSign({ userId: account._id, created: Date.now() }, config.JWT_SECRET, { expiresIn: '5h' });

  res.json({
    token,
  });
};
