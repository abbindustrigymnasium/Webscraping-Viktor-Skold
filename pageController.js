const pageScraperWillys = require("./pageScraperWillys");

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;

    // Willys
    await pageScraperWillys.scraper(
      browser,
      "sortiment/glass-godis-och-snacks",
      "Godsaker"
    );
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
