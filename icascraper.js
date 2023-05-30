const puppeteer = require('puppeteer');
const fs = require('fs');
const EXT = 'C:\\Users\\21viksko\\Desktop\\webscraping\\project\\EXT';

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXT}`,
      `--load-extension=${EXT}`,
      `--enable-automation`,
    ],
  });


  url: "https://willys.se/"
  sortiment: "sortiment/glass-godis-och-snacks"


  const page = await browser.newPage();
  await page.goto(`${this.url}${this.sortiment}`, {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector('.base__Wrapper-sc-1mnb0pd-6.base__FixedHeightWrapper-sc-1mnb0pd-41.fop__FixedHeightWrapper-sc-1e1rsqo-0.gMlFiL.jNtybn.viewports-enabled-standard-fop__ViewportsEnabledFop-sc-nz4zf7-0.iGEpfJ > .box__Box-sc-eqtis8-0');

  const candyData = [];

  const viewportHeight = await page.evaluate(() => window.innerHeight);
  let previousHeight = 0;
  let currentHeight = viewportHeight;

  while (previousHeight !== currentHeight) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await page.waitForTimeout(1000);

    const newCandyData = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('.base__Wrapper-sc-1mnb0pd-6.base__FixedHeightWrapper-sc-1mnb0pd-41.fop__FixedHeightWrapper-sc-1e1rsqo-0.gMlFiL.jNtybn.viewports-enabled-standard-fop__ViewportsEnabledFop-sc-nz4zf7-0.iGEpfJ > .box__Box-sc-eqtis8-0'));
      return elements.map(element => element.innerText);
    });

    candyData.push(...newCandyData);

    previousHeight = currentHeight;
    currentHeight = await page.evaluate(() => window.pageYOffset + window.innerHeight);
  }

  console.log(candyData);

  await browser.close();

  const jsonData = JSON.stringify(candyData, null, 2);
  fs.writeFileSync('candyData.json', jsonData);
};

getQuotes();
