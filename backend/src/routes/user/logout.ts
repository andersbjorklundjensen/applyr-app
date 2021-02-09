import { Request, Response } from 'express';
import config from '../../config';
import verifyJwt from '../../jsonwebtokenUtils/verifyJwt';

export default async (req: Request, res: Response) => {
  const authToken = await verifyJwt(
    req.get('authorization') as string,
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
