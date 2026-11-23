import { test, expect } from '../../fixtures/pages';
import { users } from '../../fixtures/test-data';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });

  test('invalid credentials show an error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('empty username shows a required-field error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', users.standard.password);

    await loginPage.expectErrorMessage('Username is required');
  });
});
