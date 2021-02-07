const Busboy = require('busboy');
const fileDb = require('../fileDb')();
const crypto = require('crypto');

module.exports = async (req, res, next) => {
  var busboy = new Busboy({ headers: req.headers });
  const fields = {};
  const files = [];

  //upload files
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    const randomId = crypto.randomBytes(10).toString('hex');
    const objectName = `${filename}-${randomId}-${Date.now()}`;

    fileDb.putObject('files', objectName, file);
    file.on('end', function () {
      files.push({ originalFilename: filename, storedFilename: objectName });
    });
  });

  //add a array of fields
  busboy.on('field', function (property, value) {
    fields[property] = value;
  });

  busboy.on('finish', () => {
    res.locals.fields = fields;
    res.locals.files = files;
    next();
  });
  req.pipe(busboy);
};
