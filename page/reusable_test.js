const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

const firefox = require("selenium-webdriver/firefox");

async function accessWeb() {
  options = new firefox.Options();
  // options.addArguments("--headless");
  options.setPreference("browser.download.folderList", 2); // Custom location
  options.setPreference("browser.download.dir", process.env.path_download);
  options.setPreference(
    "browser.helperApps.neverAsk.saveToDisk",
    "application/octet-stream"
  );

  driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions((options = options))
    .build();
  // driver = await new Builder().forBrowser('chrome').build();
  expect = require("chai").expect;
  // actions = new Actions(driver);
  vars = {};
  await driver.get(process.env.BASE_URL);
  await driver.manage().window().maximize();


  // driver = await new Builder().forBrowser('chrome').build();
  // expect = require('chai').expect;
  // vars = {};
  // await driver.get(process.env.BASE_URL);
}

module.exports = {accessWeb: accessWeb,};
  