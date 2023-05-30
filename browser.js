const puppeteer = require("puppeteer");
const fsp = require('fs').promises;
const EXT = 'C:\\users\\21viksko\\Downloads\\BetterRustplus\\BetterRustplus\\biktor\\EXT';

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: false,
      args: [
      "--disable-setuid-sandbox", 
      `--disable-extensions-except=${EXT}`,
      `--load-extension=${EXT}`,
      `--enable-automation`,],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};


// const puppeteer = require('puppeteer');
// const fsp = require('fs').promises;
// const EXT = 'C:\\users\\21viksko\\Downloads\\BetterRustplus\\BetterRustplus\\biktor\\EXT';
// // Jag kopierade filerna för extension "I still don't care about cookies" till mappen Puppeteer/EXT
// // Hitta extension genom att surfa till chrome://version/ och titta efter Executable Path
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: [
//       `--disable-extensions-except=${EXT}`,
//       `--load-extension=${EXT}`,
//       `--enable-automation`,
//     ],
//   });

//   //await browser.close();
// })();
