
const puppeteer = require('puppeteer');
const crypto = require('crypto');

/**
 * Takes a screenshot from a website
 * @param {string} link - The link to the page
 */
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

module.exports = screenshotWebsite;
