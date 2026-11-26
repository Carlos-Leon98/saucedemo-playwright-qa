import { test, expect } from '../../fixtures/pages';
import { users } from '../../fixtures/test-data';
import { attachScreenshot } from '../../fixtures/screenshot-helper';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('sorting by price low to high orders items correctly', async ({ page, inventoryPage }, testInfo) => {
    await attachScreenshot(page, testInfo, '01-before-sort-default-order');

    await inventoryPage.sortBy('lohi');
    await attachScreenshot(page, testInfo, '02-after-sort-low-to-high');

    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('sorting by price high to low orders items correctly', async ({ page, inventoryPage }, testInfo) => {
    await attachScreenshot(page, testInfo, '01-before-sort-default-order');

    await inventoryPage.sortBy('hilo');
    await attachScreenshot(page, testInfo, '02-after-sort-high-to-low');

    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  test('sorting by name A to Z orders items alphabetically', async ({ page, inventoryPage }, testInfo) => {
    await attachScreenshot(page, testInfo, '01-before-sort-default-order');

    await inventoryPage.sortBy('az');
    await attachScreenshot(page, testInfo, '02-after-sort-a-to-z');

    const names = await inventoryPage.getAllNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sorted);
  });

  test('adding an item to the cart updates the cart badge', async ({ page, inventoryPage }, testInfo) => {
    await attachScreenshot(page, testInfo, '01-before-add-to-cart');

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await attachScreenshot(page, testInfo, '02-after-add-to-cart-badge-1');

    await inventoryPage.expectCartCount(1);
  });

  test('adding multiple items accumulates the cart badge count', async ({ page, inventoryPage }, testInfo) => {
    await attachScreenshot(page, testInfo, '01-before-add-to-cart');

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await attachScreenshot(page, testInfo, '02-after-add-to-cart-badge-2');

    await inventoryPage.expectCartCount(2);
  });
});
