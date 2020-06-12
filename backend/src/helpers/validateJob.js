
const is = require('is_js');
const VALID_CURRENT_STATUS = require('../constants').VALID_CURRENT_STATUS;

/**
 * 
 * @param {object} res - response object from express framework
 * @param {object} {} - job properties for validation 
 */
const validateJob = (res, {
  positionTitle,
  location,
  linkToPosting,
  company,
  dateApplied,
  currentStatus,
  notes,
}) => {
  if (!positionTitle || !is.string(positionTitle) || positionTitle.length > 50) {
    return res.status(400).send('invalid position title');
  }

  if (!location || !is.string(location) || location.length > 50) {
    return res.status(400).send('invalid location');
  }

  if (!linkToPosting || !is.string(linkToPosting) || !is.url(linkToPosting) || linkToPosting.length > 250) {
    return res.status(400).send('invalid link');
  }

  if (!company || !is.string(company) || company.length > 50) {
    return res.status(400).send('invalid company');
  }

  if (!dateApplied || !is.number(dateApplied)) {
    return res.status(400).send('invalid application date');
  }

  if (!currentStatus || !is.number(currentStatus) || !VALID_CURRENT_STATUS.has(currentStatus)) {
    return res.status(400).send('invalid status');
  }

  if (notes && (!is.string(notes) || notes.length > 5000)) {
    return res.status(400).send('invalid notes');
  }
};

module.exports = validateJob;
