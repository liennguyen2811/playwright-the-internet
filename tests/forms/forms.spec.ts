import { test, expect } from '../../src/fixtures';
import path from 'path';
import fs from 'fs';
import os from 'os';

test.describe('Inputs (/inputs)', () => {
  test.beforeEach(async ({ inputsPage }) => {
    await inputsPage.navigate();
  });

  test('should accept numeric input', async ({ inputsPage }) => {
    await inputsPage.fill('42');
    await expect(inputsPage.numberInput).toHaveValue('42');
  });

  test('should not accept non-numeric characters', async ({ inputsPage }) => {
    await inputsPage.typeSequentially('abc');
    await expect(inputsPage.numberInput).toHaveValue('');
  });

  test('should increment value with ArrowUp key', async ({ inputsPage }) => {
    await inputsPage.fill('5');
    await inputsPage.pressKey('ArrowUp');
    await expect(inputsPage.numberInput).toHaveValue('6');
  });
});

test.describe('Key Presses (/key_presses)', () => {
  test.beforeEach(async ({ keyPressesPage }) => {
    await keyPressesPage.navigate();
  });

  test('should display the pressed key', async ({ keyPressesPage }) => {
    await keyPressesPage.pressKey('A');
    await expect(keyPressesPage.result).toContainText('You entered: A');
  });

  test('should display Enter key', async ({ keyPressesPage }) => {
    await keyPressesPage.pressKey('Enter');
    await expect(keyPressesPage.result).toContainText('You entered: ENTER');
  });

  test('should display Tab key', async ({ keyPressesPage }) => {
    await keyPressesPage.pressKey('Tab');
    await expect(keyPressesPage.result).toContainText('You entered: TAB');
  });
});

test.describe('Forgot Password (/forgot_password)', () => {
  test.beforeEach(async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.navigate();
  });

  test('should show email input and submit button', async ({ forgotPasswordPage }) => {
    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.submitButton).toBeVisible();
  });

  test('should submit the form', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.submitEmail('test@example.com');
    await expect(page).toHaveURL('/email_sent');
  });
});

test.describe('File Upload (/upload)', () => {
  test('should upload a file successfully', async ({ fileUploadPage }) => {
    await fileUploadPage.navigate();

    const tmpFile = path.join(os.tmpdir(), 'playwright-upload-test.txt');
    fs.writeFileSync(tmpFile, 'Playwright test upload content');

    await fileUploadPage.uploadFile(tmpFile);
    await expect(fileUploadPage.uploadedFiles).toContainText('playwright-upload-test.txt');

    fs.unlinkSync(tmpFile);
  });
});

test.describe('File Download (/download)', () => {
  test('should trigger a file download', async ({ fileDownloadPage }) => {
    await fileDownloadPage.navigate();
    const download = await fileDownloadPage.downloadFirstFile();
    expect(download.suggestedFilename()).toBeTruthy();
    await download.cancel();
  });
});

test.describe('WYSIWYG Editor (/tinymce)', () => {
  test.beforeEach(async ({ wysiwygPage }) => {
    await wysiwygPage.navigate();
  });

  test('should load the TinyMCE editor', async ({ wysiwygPage }) => {
    await expect(wysiwygPage.editorBody).toBeVisible();
  });

  test('should allow typing in the editor', async ({ wysiwygPage }) => {
    await wysiwygPage.typeInEditor('Hello from Playwright!');
    await expect(wysiwygPage.editorBody).toContainText('Hello from Playwright!');
  });
});
