import { test, expect } from '@playwright/test';

test.describe('Dynamic Loading (/dynamic_loading)', () => {
  test('Example 1: hidden element - should reveal content after start', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    await page.click('#start button');
    await expect(page.locator('#finish')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

  test('Example 2: rendered after the fact - should load content after start', async ({ page }) => {
    await page.goto('/dynamic_loading/2');
    await page.click('#start button');
    await expect(page.locator('#finish')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });
});

test.describe('Dynamic Controls (/dynamic_controls)', () => {
  test('should add and remove checkbox', async ({ page }) => {
    await page.goto('/dynamic_controls');
    await page.click('#checkbox-example button');
    await expect(page.locator('#checkbox-example #checkbox')).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator('#message')).toContainText("It's gone!");

    await page.click('#checkbox-example button');
    await expect(page.locator('#checkbox-example #checkbox')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#message')).toContainText("It's back!");
  });

  test('should enable and disable input', async ({ page }) => {
    await page.goto('/dynamic_controls');
    const input = page.locator('#input-example input');
    await expect(input).toBeDisabled();

    await page.click('#input-example button');
    await expect(input).toBeEnabled({ timeout: 10_000 });
    await expect(page.locator('#message')).toContainText("It's enabled!");
    await input.fill('Playwright');
    await expect(input).toHaveValue('Playwright');

    await page.click('#input-example button');
    await expect(input).toBeDisabled({ timeout: 10_000 });
    await expect(page.locator('#message')).toContainText("It's disabled!");
  });
});

test.describe('Dynamic Content (/dynamic_content)', () => {
  test('should display 3 content rows', async ({ page }) => {
    await page.goto('/dynamic_content');
    await expect(page.locator('.row .large-10')).toHaveCount(3);
  });

  test('content should change on reload', async ({ page }) => {
    await page.goto('/dynamic_content');
    const texts = await page.locator('.row .large-10').allTextContents();
    await page.reload();
    const newTexts = await page.locator('.row .large-10').allTextContents();
    expect(texts).not.toEqual(newTexts);
  });
});

test.describe('A/B Testing (/abtest)', () => {
  test('should show A or B variant heading', async ({ page }) => {
    await page.goto('/abtest');
    const heading = page.locator('h3');
    const text = await heading.textContent();
    expect(text).toMatch(/A\/B Test/);
  });
});

test.describe('Redirect (/redirector)', () => {
  test('should redirect to the status codes page', async ({ page }) => {
    await page.goto('/redirector');
    await page.click('a#redirect');
    await expect(page).toHaveURL('/status_codes');
  });
});

test.describe('Entry Ad (/entry_ad)', () => {
  test('should show a modal on page load', async ({ page }) => {
    await page.goto('/entry_ad');
    await expect(page.locator('.modal')).toBeVisible({ timeout: 10_000 });
  });

  test('should close the modal', async ({ page }) => {
    await page.goto('/entry_ad');
    await page.locator('.modal-footer p').click();
    await expect(page.locator('.modal')).toBeHidden();
  });
});

test.describe('Exit Intent (/exit_intent)', () => {
  test('page should load without errors', async ({ page }) => {
    await page.goto('/exit_intent');
    await expect(page.locator('h3')).toContainText('Exit Intent');
  });
});
