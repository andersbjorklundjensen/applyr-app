import Busboy from 'busboy';
import crypto from 'crypto';
import { RequestHandler } from 'express';
import initFileDb from '../fileDb';

const fileDb = initFileDb();

interface File {
  originalFilename: string,
  storedFilename: string
}

export const busboy: RequestHandler = async (req, res, next) => {
  var busboy = new Busboy({ headers: req.headers });
  const fields: any = {};
  const files: File[] = [];

  //upload files
  busboy.on('file', function (fieldname: any, file: any, filename: any, encoding: any, mimetype: any) {
    const randomId = crypto.randomBytes(10).toString('hex');
    const objectName = `${filename}-${randomId}-${Date.now()}`;

    fileDb.putObject('files', objectName, file);
    file.on('end', function () {
      files.push({ originalFilename: filename, storedFilename: objectName });
    });
  });

  //add a array of fields
  busboy.on('field', function (property: string | number, value: any) {
    fields[property] = value;
  });

  busboy.on('finish', () => {
    res.locals.fields = fields;
    res.locals.files = files;
    next();
  });
  req.pipe(busboy);
};
