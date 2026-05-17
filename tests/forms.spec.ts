import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

test.describe('Inputs (/inputs)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inputs');
  });

  test('should accept numeric input', async ({ page }) => {
    await page.fill('input[type="number"]', '42');
    await expect(page.locator('input[type="number"]')).toHaveValue('42');
  });

  test('should not accept non-numeric characters', async ({ page }) => {
    await page.locator('input[type="number"]').pressSequentially('abc');
    await expect(page.locator('input[type="number"]')).toHaveValue('');
  });

  test('should increment value with ArrowUp key', async ({ page }) => {
    await page.fill('input[type="number"]', '5');
    await page.locator('input[type="number"]').press('ArrowUp');
    await expect(page.locator('input[type="number"]')).toHaveValue('6');
  });
});

test.describe('Key Presses (/key_presses)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/key_presses');
  });

  test('should display the pressed key', async ({ page }) => {
    await page.locator('#target').press('A');
    await expect(page.locator('#result')).toContainText('You entered: A');
  });

  test('should display Enter key', async ({ page }) => {
    await page.locator('#target').press('Enter');
    await expect(page.locator('#result')).toContainText('You entered: ENTER');
  });

  test('should display Tab key', async ({ page }) => {
    await page.locator('#target').press('Tab');
    await expect(page.locator('#result')).toContainText('You entered: TAB');
  });
});

test.describe('Forgot Password (/forgot_password)', () => {
  test('should show email input and submit button', async ({ page }) => {
    await page.goto('/forgot_password');
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#form_submit')).toBeVisible();
  });

  test('should submit the form', async ({ page }) => {
    await page.goto('/forgot_password');
    await page.fill('#email', 'test@example.com');
    await page.click('#form_submit');
    await expect(page).toHaveURL('/email_sent');
  });
});

test.describe('File Upload (/upload)', () => {
  test('should upload a file successfully', async ({ page }) => {
    await page.goto('/upload');

    const tmpFile = path.join(os.tmpdir(), 'playwright-upload-test.txt');
    fs.writeFileSync(tmpFile, 'Playwright test upload content');

    await page.setInputFiles('#file-upload', tmpFile);
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('playwright-upload-test.txt');

    fs.unlinkSync(tmpFile);
  });
});

test.describe('File Download (/download)', () => {
  test('should trigger a file download', async ({ page }) => {
    await page.goto('/download');
    const links = page.locator('a');
    const firstLink = links.first();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      firstLink.click(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();
    await download.cancel();
  });
});

test.describe('WYSIWYG Editor (/tinymce)', () => {
  test('should load the TinyMCE editor', async ({ page }) => {
    await page.goto('/tinymce');
    await expect(page.frameLocator('#mce_0_ifr').locator('body')).toBeVisible();
  });

  test('should allow typing in the editor', async ({ page }) => {
    await page.goto('/tinymce');
    const editorBody = page.frameLocator('#mce_0_ifr').locator('body');
    await editorBody.click();
    await editorBody.fill('Hello from Playwright!');
    await expect(editorBody).toContainText('Hello from Playwright!');
  });
});
