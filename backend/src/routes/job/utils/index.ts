import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import crypto from 'crypto';
import initFileDb from '../../../fileDb/';
const fileDb = initFileDb();

async function statObject(bucket: any, fileObject: any) {
  return new Promise((resolve, reject) => {
    fileDb.statObject(bucket, fileObject, (err, stat) => {
      if (err) reject(err);
      resolve(stat);
    });
  });
}

const screenshotExist = async (link: string) => {
  const linkHash = crypto.createHash('md5').update(link).digest('hex');
  return await statObject('screenshots', `${linkHash}.png`)
    .then(() => true)
    .catch(() => false);
};

export const screenshotWebsite = async (link: string) => {
  if (await screenshotExist(link)) return;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(link);
  const linkHash = crypto.createHash('md5').update(link).digest('hex');
  const screenshot = await page.screenshot({ fullPage: true });

  const screenshotStream = new Readable();
  screenshotStream.push(screenshot);
  screenshotStream.push(null);

  fileDb.putObject('screenshots', `${linkHash}.png`, screenshotStream);

  await browser.close();
};
