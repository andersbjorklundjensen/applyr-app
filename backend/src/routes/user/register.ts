import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import util from 'util';
import jwt from 'jsonwebtoken';
import config from '../../config';
import Username from '../../users/entities/Username';
import Password from '../../users/entities/Password';
import Result from '../../shared/Result';
import { Request, Response } from 'express';

const jwtSign = util.promisify(jwt.sign);

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usernameResult = Username.create(username);
  const passwordResult = Password.create(password);

  const combinedResult = Result.combine([usernameResult, passwordResult]);
  if (combinedResult.isFailure)
    return res.status(400).json({ message: combinedResult.error });

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

  
  const token = await jwtSign(
    { userId: user._id, created: Date.now() },
    config.JWT_SECRET,
    // @ts-ignore
    { expiresIn: '5h' },
  );

  res.json({
    token,
  });
};
