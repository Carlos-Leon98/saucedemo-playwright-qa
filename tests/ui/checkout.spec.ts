import { test, expect } from '../../fixtures/pages';
import { users, checkoutInfo } from '../../fixtures/test-data';
import { attachScreenshot } from '../../fixtures/screenshot-helper';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
  });

  test('user can complete a purchase end-to-end', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }, testInfo) => {
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(2);
    await attachScreenshot(page, testInfo, '01-cart-with-items');

    await cartPage.checkout();
    await checkoutPage.fillInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode,
    );

    await expect(checkoutPage.summaryTotalLabel).toContainText('Total');
    await attachScreenshot(page, testInfo, '02-order-summary');

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
    await attachScreenshot(page, testInfo, '03-order-complete');
  });

  test('checkout requires all personal info fields', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });
});
