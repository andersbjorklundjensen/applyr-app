import { Request, Response } from 'express';
import util from 'util';
import jwt from 'jsonwebtoken';
import config from '../../config';

const verifyJwt = util.promisify(jwt.verify);

export default async (req: Request, res: Response) => {
  // @ts-ignore
  const authToken = await verifyJwt(
    req.get('authorization'),
    config.JWT_SECRET,
  ).catch((err) => err);

  await req.app.locals.db.models.users.updateOne(
    { _id: authToken.userId },
    { lastLogoutTime: Date.now() },
  );

  res.json({
    logout: true,
  });
};
