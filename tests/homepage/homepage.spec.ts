import { test, expect } from '../../src/fixtures';

test.describe('Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should display the title and all feature links', async ({ homePage, page }) => {
    await expect(page).toHaveTitle(/The Internet/);
    await expect(homePage.heading).toContainText('Welcome to the-internet');
    await expect(homePage.featureLinks).toHaveCount(44);
  });

  test('each feature link should be reachable (no 404)', async ({ homePage, page }) => {
    const hrefs = await homePage.getAllLinkHrefs();
    for (const href of hrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Failed for ${href}`).not.toBe(404);
    }
  });
});
