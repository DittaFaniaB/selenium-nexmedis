const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
async function assertionEqualSelectorValue(selector, value) {
  // await driver.sleep(500);
  const elemen = await driver.wait(until.elementLocated(By.xpath(selector)));
  const text = await elemen.getText();
  expect(text).to.equal(value);
}

async function assertionValueExists(selector) {
  const element = await driver.wait(until.elementLocated(By.xpath(selector)));
  expect(element).to.exist;
}
async function assertionEqualValues(data1, data2) {
  expect(data1).to.equal(data2);
}

module.exports = {
  assertionEqualSelectorValue: assertionEqualSelectorValue,
  assertionEqualValues: assertionEqualValues,
  assertionValueExists: assertionValueExists,
};
  