import util from 'util';
import jwt from 'jsonwebtoken';
import config from '../config';
import { RequestHandler } from 'express';

const verifyJwt = util.promisify(jwt.verify);

export const authCheck: RequestHandler = async (req, res, next) => {
  const authToken = await verifyJwt(
    req.get('authorization'),
    // @ts-ignore
    config.JWT_SECRET,
  ).catch((err) => err);

  if (authToken instanceof Error)
    return res.status(401).send('error verifying jwt');

  const user = await req.app.locals.db.models.users.findOne({
    _id: authToken.userId,
  });

  if (!user) {
    return res.status(401).send('account not found');
  }

  const { lastLogoutTime } = user;

  if (authToken.created < lastLogoutTime)
    return res.status(401).send('account already logged out');

  res.locals.userId = authToken.userId;

  await next();
};
