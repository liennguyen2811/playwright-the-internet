import { test, expect } from '../../src/fixtures';
import { USERS } from '../../src/data/users';

test.describe('Form Authentication (/login)', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should show login form with username and password fields', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ loginPage, securePage }) => {
    await loginPage.login(USERS.valid.username, USERS.valid.password);
    await expect(loginPage.page).toHaveURL('/secure');
    await expect(securePage.successFlash).toContainText('You logged into a secure area');
  });

  test('should show error with invalid username', async ({ loginPage }) => {
    await loginPage.login(USERS.invalidUsername.username, USERS.invalidUsername.password);
    await expect(loginPage.errorFlash).toContainText('Your username is invalid');
  });

  test('should show error with invalid password', async ({ loginPage }) => {
    await loginPage.login(USERS.invalidPassword.username, USERS.invalidPassword.password);
    await expect(loginPage.errorFlash).toContainText('Your password is invalid');
  });

  test('should logout successfully', async ({ loginPage, securePage }) => {
    await loginPage.login(USERS.valid.username, USERS.valid.password);
    await securePage.logout();
    await expect(loginPage.page).toHaveURL('/login');
    await expect(loginPage.successFlash).toContainText('You logged out of the secure area');
  });
});

test.describe('Basic Auth (/basic_auth)', () => {
  test('should access page with valid basic auth credentials', async ({ page }) => {
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('p')).toContainText('Congratulations');
  });
});
