import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the title and all feature links', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Internet/);
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    const links = page.locator('ul li a');
    await expect(links).toHaveCount(44);
  });

  test('each feature link should be reachable (no 404)', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('ul li a').evaluateAll(
      (els) => els.map((el) => (el as HTMLAnchorElement).href)
    );
    for (const href of hrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Failed for ${href}`).not.toBe(404);
    }
  });
});
