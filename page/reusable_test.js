const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

const firefox = require("selenium-webdriver/firefox");
const element = require('../helpers/element');
const assertion = require('../helpers/assertion');

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

async function inputOrganizationID() {
  await element.fillFilledXpath(`//input[@id='id']`, process.env.organization_id );
  await element.clickButtonXpath(`//button[@class="btn solid"]`);
  await assertion.assertionValueExists(`//input[@id='id']`);
  await assertion.assertionValueExists(`//input[@id='password']`);
}
module.exports = {
  accessWeb: accessWeb,
  inputOrganizationID: inputOrganizationID,
};
  