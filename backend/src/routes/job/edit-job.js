
const mongoose = require('mongoose');
const utils = require('./utils');
const fs = require('fs');

module.exports = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).send('invalid job id');
  }

  const jobInfo = {
    ...req.body,
    filesToBeDeleted: JSON.parse(req.body.filesToBeDeleted),
    currentStatus: parseInt(req.body.currentStatus),
    dateApplied: parseInt(req.body.dateApplied)
  }

  if (!utils.isJobValid(jobInfo)) {
    return res.status(400).send('invalid job parameters');
  }

  const {
    positionTitle,
    location,
    linkToPosting,
    company,
    dateApplied,
    currentStatus,
    notes,
    filesToBeDeleted,
  } = jobInfo;

  const job = await req.app.locals.db.models.jobs
    .findOne({ _id: jobId, ownerId: res.locals.userId }).lean();


  const { cv, coverLetter } = req.files;
  utils.screenshotWebsite(linkToPosting)
    .catch((e) => console.log(e));

  await req.app.locals.db.models.jobs
    .updateOne({ _id: jobId, ownerId: res.locals.userId }, {
      $set: {
        positionTitle,
        location,
        linkToPosting,
        company,
        dateApplied,
        currentStatus,
        notes,
        cvPath: cv ? cv[0].filename : job.cvPath,
        coverLetterPath: coverLetter ? coverLetter[0].filename : job.coverLetterPath,
      },
    });

  res.json({});
};
