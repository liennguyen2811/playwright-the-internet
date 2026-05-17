import { test, expect } from '../../src/fixtures';

test.describe('JavaScript Alerts (/javascript_alerts)', () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.navigate();
  });

  test('should handle JS Alert (OK)', async ({ alertsPage }) => {
    await alertsPage.triggerAlert();
    await expect(alertsPage.result).toContainText('You successfully clicked an alert');
  });

  test('should handle JS Confirm - accept', async ({ alertsPage }) => {
    await alertsPage.acceptConfirm();
    await expect(alertsPage.result).toContainText('You clicked: Ok');
  });

  test('should handle JS Confirm - dismiss', async ({ alertsPage }) => {
    await alertsPage.dismissConfirm();
    await expect(alertsPage.result).toContainText('You clicked: Cancel');
  });

  test('should handle JS Prompt - type text and accept', async ({ alertsPage }) => {
    await alertsPage.fillAndAcceptPrompt('Hello Playwright');
    await expect(alertsPage.result).toContainText('You entered: Hello Playwright');
  });

  test('should handle JS Prompt - dismiss returns null', async ({ alertsPage }) => {
    await alertsPage.dismissPrompt();
    await expect(alertsPage.result).toContainText('You entered: null');
  });
});
