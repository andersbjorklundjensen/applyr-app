const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  jobId: { type: String, required: true },
  storedFilename: { type: String, required: true },
  originalFilename: { type: String, required: true },
});