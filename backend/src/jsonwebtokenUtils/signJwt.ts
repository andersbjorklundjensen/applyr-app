import jwt from 'jsonwebtoken';

export const signJwt = (data: any, secret: any, options: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, options, function(err, decoded) {
      if (err) return reject(err);
      return resolve(decoded as string)
    })
  })
}