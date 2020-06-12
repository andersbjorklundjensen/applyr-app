const mongoose = require('mongoose');

/**
 * Database model for backups
 * @name Models/Backup
 */
module.exports = new mongoose.Schema({
  ownerId: { type: String, required: true },
  created: { type: Number, required: true },
  filename: { type: String, required: true },
});