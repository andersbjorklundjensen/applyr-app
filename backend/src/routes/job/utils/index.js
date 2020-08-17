
const is = require('is_js');
const VALID_CURRENT_STATUS = require('../../../constants').VALID_CURRENT_STATUS;

/**
 * 
 * @param {object} res - response object from express framework
 * @param {object} {} - job properties for validation 
 */
const isJobValid = ({
  positionTitle,
  location,
  linkToPosting,
  company,
  dateApplied,
  currentStatus,
  notes,
}) => {
  if (!positionTitle || !is.string(positionTitle) || positionTitle.length === 0 || positionTitle.length > 50) {
    return false;
  }

  if (!location || !is.string(location) || location.length > 50) {
    return false;
  }

  if (!linkToPosting || !is.string(linkToPosting) || !is.url(linkToPosting) || linkToPosting.length > 250) {
    return false;
  }

  if (!company || !is.string(company) || company.length > 50) {
    return false;
  }

  if (!dateApplied || !is.number(dateApplied)) {
    return false;
  }

  if (!currentStatus || !is.number(currentStatus) || !VALID_CURRENT_STATUS.has(currentStatus)) {
    return false;
  }

  if (notes && (!is.string(notes) || notes.length > 5000)) {
    return false;
  }

  return true;
};

exports.isJobValid = isJobValid;