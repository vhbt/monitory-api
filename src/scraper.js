import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { Storage } from '@google-cloud/storage';

const urls = [
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_1m.svg',
    name: 'info1m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_2m.svg',
    name: 'info2m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_3m.svg',
    name: 'info3m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_4m.svg',
    name: 'info4m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_1m.svg',
    name: 'meca1m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_2m.svg',
    name: 'meca2m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_3m.svg',
    name: 'meca3m',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_4m.svg',
    name: 'meca4m',
  },

  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_1v.svg',
    name: 'info1v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_2v.svg',
    name: 'info2v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_3v.svg',
    name: 'info3v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_info_4v.svg',
    name: 'info4v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_1v.svg',
    name: 'meca1v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_2v.svg',
    name: 'meca2v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_3v.svg',
    name: 'meca3v',
  },
  {
    path: 'https://mange.ifrn.edu.br/horario/par/_images/int_meca_4v.svg',
    name: 'meca4v',
  },
];

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

    urls.forEach((url, index) => {
      setTimeout(async () => {
        await scrape(url.path, url.name);
      }, 10000 * index);
    });

    return res.send('scrapping started...');
  }
}

export default new Scraper();
