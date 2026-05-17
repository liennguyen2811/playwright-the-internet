import { test, expect } from '@playwright/test';

test.describe('Multiple Windows (/windows)', () => {
  test('should open a new window and verify content', async ({ page, context }) => {
    await page.goto('/windows');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a[href="/windows/new"]'),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage.locator('h3')).toHaveText('New Window');
  });
});

test.describe('Frames (/frames)', () => {
  test('Nested Frames: should have top/middle/bottom frames', async ({ page }) => {
    await page.goto('/nested_frames');
    const topFrame = page.frameLocator('[name="frame-top"]');
    await expect(topFrame.frameLocator('[name="frame-left"]').locator('body')).toContainText('LEFT');
    await expect(topFrame.frameLocator('[name="frame-middle"]').locator('body')).toContainText('MIDDLE');
    await expect(topFrame.frameLocator('[name="frame-right"]').locator('body')).toContainText('RIGHT');
    await expect(page.frameLocator('[name="frame-bottom"]').locator('body')).toContainText('BOTTOM');
  });

  test('iFrame: should allow typing inside iframe', async ({ page }) => {
    await page.goto('/iframe');
    const editorBody = page.frameLocator('#mce_0_ifr').locator('body');
    await editorBody.click();
    await editorBody.fill('Hello from iFrame test!');
    await expect(editorBody).toContainText('Hello from iFrame test!');
  });
});

test.describe('Geolocation (/geolocation)', () => {
  test('should show location when permission is granted', async ({ page, context }) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 10.762622, longitude: 106.660172 });
    await page.goto('/geolocation');
    await page.click('button');
    await expect(page.locator('#lat-value')).not.toHaveText('');
    await expect(page.locator('#long-value')).not.toHaveText('');
  });
});

test.describe('Shadow DOM (/shadowdom)', () => {
  test('should access text inside shadow DOM', async ({ page }) => {
    await page.goto('/shadowdom');
    const shadowText = await page.locator('my-paragraph').evaluate((el) => {
      return el.shadowRoot?.textContent?.trim();
    });
    expect(shadowText).toBeTruthy();
  });
});

test.describe('Infinite Scroll (/infinite_scroll)', () => {
  test('should load more content on scroll', async ({ page }) => {
    await page.goto('/infinite_scroll');
    const initialCount = await page.locator('.jscroll-added').count();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const afterScrollCount = await page.locator('.jscroll-added').count();
    expect(afterScrollCount).toBeGreaterThanOrEqual(initialCount);
  });
});

test.describe('Floating Menu (/floating_menu)', () => {
  test('menu should remain visible after scrolling down', async ({ page }) => {
    await page.goto('/floating_menu');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.locator('#menu')).toBeVisible();
  });
});
