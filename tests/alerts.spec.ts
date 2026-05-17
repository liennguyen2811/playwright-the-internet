import { test, expect } from '@playwright/test';

test.describe('JavaScript Alerts (/javascript_alerts)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/javascript_alerts');
  });

  test('should handle JS Alert (OK)', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept());
    await page.click('button[onclick="jsAlert()"]');
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');
  });

  test('should handle JS Confirm - accept', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept());
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.locator('#result')).toContainText('You clicked: Ok');
  });

  test('should handle JS Confirm - dismiss', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.dismiss());
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.locator('#result')).toContainText('You clicked: Cancel');
  });

  test('should handle JS Prompt - type text and accept', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept('Hello Playwright'));
    await page.click('button[onclick="jsPrompt()"]');
    await expect(page.locator('#result')).toContainText('You entered: Hello Playwright');
  });

  test('should handle JS Prompt - dismiss returns null', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.dismiss());
    await page.click('button[onclick="jsPrompt()"]');
    await expect(page.locator('#result')).toContainText('You entered: null');
  });
});
