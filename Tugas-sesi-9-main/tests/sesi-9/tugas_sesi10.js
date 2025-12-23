const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Saucedemo Automation", function () {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  beforeEach(async () => {
  await driver.get("https://www.saucedemo.com/");

  await driver.findElement(By.id("user-name"))
    .sendKeys("standard_user");

  await driver.findElement(By.id("password"))
    .sendKeys("secret_sauce");

  await driver.findElement(By.id("login-button")).click();

  await driver.wait(until.urlContains("inventory"), 5000);
});

  after(async () => {
    await driver.quit();
  });

  it("Sort produk dari A ke Z", async () => {
  const dropdown = await driver.findElement(
    By.className("product_sort_container")
  );

  await dropdown.sendKeys("Name (A to Z)");

  const items = await driver.findElements(
    By.className("inventory_item_name")
  );

  const names = [];
  for (let item of items) {
    names.push(await item.getText());
  }

  const sorted = [...names].sort();
  assert.deepStrictEqual(names, sorted);
});

 it("Sort produk dari Z ke A", async () => {
  const dropdown = await driver.findElement(
    By.className("product_sort_container")
  );

  await dropdown.sendKeys("Name (Z to A)");

  const items = await driver.findElements(
    By.className("inventory_item_name")
  );

  const names = [];
  for (let item of items) {
    names.push(await item.getText());
  }

  const sorted = [...names].sort().reverse();
  assert.deepStrictEqual(names, sorted);
});
});
