import puppeteer from 'puppeteer-core';
import lighthouse from 'lighthouse';

(async () => {
  try {
    const urlList = ['http://arquisisproject.me'];

    for (const url of urlList) {
      const browser = await puppeteer.connect({
        browserWSEndpoint: 'http://arquisisproject.me'
      });

      console.log(url);
      const { lhr } = await lighthouse(url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'silent',
      });

      console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);

      await browser.close();
      await new Promise((resolve) => setTimeout(() => resolve(), 3000));
    }
  } catch (error) {
    console.error(error);
  }
})();
