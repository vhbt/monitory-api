import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { Storage } from '@google-cloud/storage';

import Schedule from './app/models/Schedule';

class Scraper {
  async run(req, res) {
    async function scrape(path, name) {
      console.log(`[STARTED] Baixando horario de ${name}`);
      const file_path = resolve(__dirname, '..', 'tmp', `${name}.png`);
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1140, height: 775 });
      await page.goto(path);
      await page.screenshot({
        path: file_path,
      });

      const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT,
      });

      const bucket = storage.bucket(process.env.GCLOUD_BUCKET);

      await bucket.upload(file_path, {
        public: true,
      });

      await browser.close();
    }

    const urls = await Schedule.findAll();

    urls.forEach((url, index) => {
      setTimeout(async () => {
        await scrape(url.path, url.name);
        if (index === urls.length - 1) {
          res.json({ type: 'success', detail: 'schedules scraped' });
          console.log('[FINISHED SCRAPING]');
        }
      }, 1000 * index);
    });
  }
}

export default new Scraper();
