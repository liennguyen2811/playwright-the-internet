import { test, expect } from '@playwright/test';

test.describe('Form Authentication (/login)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should show login form with username and password fields', async ({ page }) => {
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/secure');
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area');
  });

  test('should show error with invalid username', async ({ page }) => {
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid');
  });

  test('should show error with invalid password', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid');
  });

  test('should logout successfully', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await page.click('a[href="/logout"]');
    await expect(page).toHaveURL('/login');
    await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area');
  });
});

test.describe('Basic Auth (/basic_auth)', () => {
  test('should access page with valid basic auth credentials', async ({ page }) => {
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('p')).toContainText('Congratulations');
  });
});
