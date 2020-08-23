
const is = require('is_js');
const VALID_CURRENT_STATUS = require('../../../constants').VALID_CURRENT_STATUS;
const puppeteer = require('puppeteer');
const crypto = require('crypto');

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

const screenshotWebsite = async (link) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.goto(link);
  const linkHash = crypto.createHash('md5').update(link).digest('hex');
  await page.screenshot({
    path: `./screenshots/${linkHash}.png`,
    fullPage: true,
  });
  await browser.close();
};

exports.screenshotWebsite = screenshotWebsite;
exports.isJobValid = isJobValid;