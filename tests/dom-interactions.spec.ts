import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements (/add_remove_elements/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/add_remove_elements/');
  });

  test('should add an element', async ({ page }) => {
    await page.click('button[onclick="addElement()"]');
    await expect(page.locator('.added-manually')).toHaveCount(1);
  });

  test('should add multiple elements', async ({ page }) => {
    await page.click('button[onclick="addElement()"]');
    await page.click('button[onclick="addElement()"]');
    await page.click('button[onclick="addElement()"]');
    await expect(page.locator('.added-manually')).toHaveCount(3);
  });

  test('should remove an added element', async ({ page }) => {
    await page.click('button[onclick="addElement()"]');
    await page.click('.added-manually');
    await expect(page.locator('.added-manually')).toHaveCount(0);
  });
});

test.describe('Checkboxes (/checkboxes)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkboxes');
  });

  test('checkbox 1 is unchecked by default, checkbox 2 is checked', async ({ page }) => {
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
  });

  test('should check checkbox 1', async ({ page }) => {
    const cb = page.locator('input[type="checkbox"]').nth(0);
    await cb.check();
    await expect(cb).toBeChecked();
  });

  test('should uncheck checkbox 2', async ({ page }) => {
    const cb = page.locator('input[type="checkbox"]').nth(1);
    await cb.uncheck();
    await expect(cb).not.toBeChecked();
  });
});

test.describe('Dropdown (/dropdown)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dropdown');
  });

  test('should show placeholder option by default', async ({ page }) => {
    await expect(page.locator('#dropdown')).toHaveValue('');
  });

  test('should select Option 1', async ({ page }) => {
    await page.selectOption('#dropdown', '1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });

  test('should select Option 2', async ({ page }) => {
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
  });
});

test.describe('Hovers (/hovers)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hovers');
  });

  test('should reveal info on hover over each figure', async ({ page }) => {
    const figures = page.locator('.figure');
    for (let i = 0; i < 3; i++) {
      await figures.nth(i).hover();
      await expect(figures.nth(i).locator('.figcaption')).toBeVisible();
    }
  });
});

test.describe('Context Menu (/context_menu)', () => {
  test('should show browser alert on right-click in the hot spot', async ({ page }) => {
    await page.goto('/context_menu');
    page.once('dialog', (dialog) => dialog.accept());
    await page.locator('#hot-spot').click({ button: 'right' });
  });
});

test.describe('Disappearing Elements (/disappearing_elements)', () => {
  test('should have at least 4 nav items', async ({ page }) => {
    await page.goto('/disappearing_elements');
    const items = page.locator('ul li');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

test.describe('Challenging DOM (/challenging_dom)', () => {
  test('should render table with rows', async ({ page }) => {
    await page.goto('/challenging_dom');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(10);
  });

  test('each row should have edit and delete links', async ({ page }) => {
    await page.goto('/challenging_dom');
    const editLinks = page.locator('table tbody tr td a').filter({ hasText: 'edit' });
    await expect(editLinks).toHaveCount(10);
  });
});

test.describe('Notification Messages (/notification_message)', () => {
  test('should show a flash notification after clicking the link', async ({ page }) => {
    await page.goto('/notification_message');
    await page.click('a[href="/notification_message"]');
    await expect(page.locator('#flash')).toBeVisible();
  });
});
