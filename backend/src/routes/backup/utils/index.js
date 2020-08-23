const fs = require('fs');

const createBackupFolderStructure = async (path) => {
  await fs.promises.mkdir(`${path}/CVs`, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  await fs.promises.mkdir(`${path}/Cover-letters`, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  await fs.promises.mkdir(`${path}/Job-Listings`, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
}

exports.createBackupFolderStructure = createBackupFolderStructure;