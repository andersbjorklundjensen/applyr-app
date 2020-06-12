const fs = require('fs');

/**
 * Class with helper functions
 */
class Helper {

  /**
   * Function which creates a folder structure consisting of 3 folders: CVs, Cover-letters and Job-Listings
   * @param {string} path - path to the where the backup folder should be created
   */
  async createBackupFolderStructure(path) {
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
};

module.exports = Helper;