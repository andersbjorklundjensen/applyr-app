const mongoose = require('mongoose');

/**
 * Database model for jobs
 * @name Models/Job
 */
module.exports = new mongoose.Schema({
  positionTitle: { type: String, required: true },
  location: { type: String, required: true },
  linkToPosting: { type: String, required: true },
  company: { type: String, required: true },
  dateApplied: { type: Number, required: true },
  currentStatus: { type: Number, required: true },
  notes: { type: String, required: false },
  ownerId: { type: String, required: true },
  cvPath: { type: String, required: false },
  coverLetterPath: { type: String, required: false },
});
