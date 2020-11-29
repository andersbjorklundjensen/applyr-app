const Busboy = require('busboy');
const fileDb = require('../fileDb')();

module.exports = async (req, res, next) => {
  var busboy = new Busboy({ headers: req.headers });
  const fields = {};
  const files = [];

  //upload files
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    fileDb.putObject('bucket', filename, file);
    file.on('end', function() {
      files.push({ filename })
    })
  });

  //add a array of fields
  busboy.on('field', function (property, value) {
    fields[property] = value;
  });

  busboy.on('finish', () => {
    res.locals.fields = fields;
    res.locals.files = files;
    next();
  })
  req.pipe(busboy);
}