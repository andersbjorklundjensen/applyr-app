import jwt from 'jsonwebtoken';

export default async (token: string, secret: string): Promise<string | object> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return reject(err);
      return resolve(decoded as object)
    })
  })
}