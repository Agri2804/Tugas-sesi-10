const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Saucedemo Automation", function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("Login sukses dengan user valid", async () => {
    await driver.get("https://www.saucedemo.com/");

    await driver.findElement(By.id("user-name"))
      .sendKeys("standard_user");

    await driver.findElement(By.id("password"))
      .sendKeys("secret_sauce");

    await driver.findElement(By.id("login-button")).click();

    await driver.wait(until.urlContains("inventory"), 60000);

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes("inventory.html"));
  });

    it("Sort produk dari Z ke A", async () => {
    const sortDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    await sortDropdown.sendKeys("Name (Z to A)");

    const items = await driver.findElements(
      By.className("inventory_item_name")
    );

    const productNames = [];
    for (let item of items) {
      productNames.push(await item.getText());
    }

    const sortedNames = [...productNames].sort();

    assert.deepStrictEqual(productNames, sortedNames);
  });
});
