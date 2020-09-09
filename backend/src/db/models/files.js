const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  jobId: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
});