const { By, until, Key } = require("selenium-webdriver");
async function getElement(selector) {
  await driver.sleep(500);
  return await driver.wait(until.elementLocated(By.xpath(selector)));
}

async function findElementXpath(selector) {
  await driver.sleep(500);
  return await driver.findElement(By.xpath(selector));
}

async function clickElementXpath(selector) {
  await driver.sleep(500);
  var ele = await driver.wait(until.elementLocated(By.xpath(selector)));
  await driver.sleep(500);
  await ele.click();
}

async function clickButtonXpath(selector) {
  await driver.sleep(500);
  await driver.wait(until.elementLocated(By.xpath(selector))).click();
}

async function clickButtonCss(selector) {
  await driver.sleep(500);
  await driver.wait(until.elementLocated(By.css(selector))).click();
}

async function fillFilledXpath(selector, value, enter = false) {
  try {
    await driver.sleep(500);
    var ele  = await driver.findElement(By.xpath(selector));
    await driver.sleep(500);
    await ele.clear();
    await driver.sleep(500);
    await ele.sendKeys(value);
    if (enter == true) {
      await driver.sleep(500);
      await ele.sendKeys(Key.ENTER);
    }
  } catch (error) {
    console.error("Error occurred while getting input field:", error);
    throw error; // Propagate the error further if needed
  }
}

async function fillSelectXpath(selector) {
  driver.wait(until.elementLocated(By.xpath(selector))).click();
}

async function scrollByXpath(selector) {
  await driver.sleep(500);
  const scrollTo = await driver.wait(until.elementLocated(By.xpath(selector)));
  await driver.sleep(500);
  await driver.executeScript( "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", scrollTo );
}

async function clearInputXpath(selector, enter = false) {
  await driver.sleep(500);
  const ele = driver.wait(until.elementLocated(By.xpath(selector)));
  await driver.sleep(500);
  await ele.clear();
  if (enter == true) {
    await driver.sleep(500);
    await ele.sendKeys(" ");
    await driver.sleep(500);
    await ele.sendKeys(Key.ENTER);
  }
}

async function getTextXpath(selector) {
  try {
    await driver.sleep(500);
    const element = await driver.wait(until.elementLocated(By.xpath(selector)));
    await driver.sleep(500);
    const text = await element.getText();
    return text;
  } catch (error) {
    console.error("Error occurred while getting text by XPath:", error);
    throw error; // Propagate the error further if needed
  }
}
async function countElement(selector) {
  try {
    await driver.sleep(500);
    var rows = await driver.findElements(By.xpath(selector));
    return rows.length;
  } catch (error) {
    console.error("Error occurred while getting text by XPath:", error);
    throw error; // Propagate the error further if needed
  }
}

async function fillFile(selector, value) {
  await driver.sleep(500);
  await driver.findElement(By.xpath(selector)).sendKeys(value);
}

async function getValue(selector) {
  await driver.sleep(500);
  return await driver
    .wait(until.elementLocated(By.xpath(selector)))
    .getAttribute("value");
}

async function checkElementExists(selector1) {
  try {
    // Find the element
    await driver.findElement(By.xpath(selector1));

    // If the element is found, it exists
    console.log("Element exists!");
  } catch (error) {
    // If the element is not found, it does not exist
    if (error.name === "NoSuchElementError") {
      console.log("Element does not exist!");
    } else {
      console.error("Error occurred:", error);
    }
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

async function waitLoadingXpath(selector) {
  await driver.wait( until.stalenessOf(await driver.findElement(By.xpath(selector))), 60000 );
}

module.exports = {
  getElement: getElement,
  findElementXpath: findElementXpath,
  clickElementXpath: clickElementXpath,
  clickButtonXpath: clickButtonXpath,
  fillFilledXpath: fillFilledXpath,
  fillSelectXpath: fillSelectXpath,
  scrollByXpath: scrollByXpath,
  clearInputXpath: clearInputXpath,
  getTextXpath: getTextXpath,
  countElement: countElement,
  fillFile: fillFile,
  getValue: getValue,
  clickButtonCss: clickButtonCss,
  checkElementExists: checkElementExists,
  waitLoadingXpath: waitLoadingXpath,
};
