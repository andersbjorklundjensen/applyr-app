
const puppeteer = require('puppeteer');
const crypto = require('crypto');
const fs = require("fs");

const doesScreenshotOfWebsiteExist = (link) => {
  const linkHash = crypto.createHash('md5').update(link).digest('hex');
  return fs.existsSync(`./screenshots/${linkHash}.png`);
}

const screenshotWebsite = async (link) => {
  if (doesScreenshotOfWebsiteExist(link)) return;

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