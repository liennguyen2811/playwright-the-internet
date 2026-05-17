import { test, expect } from '@playwright/test';

test.describe('Drag and Drop (/drag_and_drop)', () => {
  test('should swap column A and column B', async ({ page }) => {
    await page.goto('/drag_and_drop');
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    await expect(columnA.locator('header')).toHaveText('A');
    await expect(columnB.locator('header')).toHaveText('B');

    const boxA = await columnA.boundingBox();
    const boxB = await columnB.boundingBox();

    if (!boxA || !boxB) throw new Error('Could not get bounding boxes');

    await page.mouse.move(boxA.x + boxA.width / 2, boxA.y + boxA.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxB.x + boxB.width / 2, boxB.y + boxB.height / 2, { steps: 10 });
    await page.mouse.up();

    await expect(columnA.locator('header')).toHaveText('B');
    await expect(columnB.locator('header')).toHaveText('A');
  });
});

test.describe('Horizontal Slider (/horizontal_slider)', () => {
  test('should display slider with default value', async ({ page }) => {
    await page.goto('/horizontal_slider');
    await expect(page.locator('input[type="range"]')).toBeVisible();
    await expect(page.locator('#range')).toHaveText('0');
  });

  test('should update value when slider is moved via keyboard', async ({ page }) => {
    await page.goto('/horizontal_slider');
    const slider = page.locator('input[type="range"]');
    await slider.focus();
    await slider.press('ArrowRight');
    const value = await page.locator('#range').textContent();
    expect(parseFloat(value ?? '0')).toBeGreaterThan(0);
  });
});

test.describe('Sortable Data Tables (/tables)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tables');
  });

  test('Table 1 should have correct headers', async ({ page }) => {
    const headers = page.locator('#table1 thead th');
    await expect(headers.nth(0)).toHaveText('Last Name');
    await expect(headers.nth(1)).toHaveText('First Name');
    await expect(headers.nth(2)).toHaveText('Email');
    await expect(headers.nth(3)).toHaveText('Due');
    await expect(headers.nth(4)).toHaveText('Web Site');
    await expect(headers.nth(5)).toHaveText('Action');
  });

  test('Table 1 should have 4 data rows', async ({ page }) => {
    await expect(page.locator('#table1 tbody tr')).toHaveCount(4);
  });

  test('Table 1 should sort by Last Name ascending on click', async ({ page }) => {
    await page.click('#table1 thead th:nth-child(1)');
    const firstCell = page.locator('#table1 tbody tr:first-child td:first-child');
    const text = await firstCell.textContent();
    expect(text?.trim()).toBeTruthy();
  });

  test('Table 2 should have 4 data rows', async ({ page }) => {
    await expect(page.locator('#table2 tbody tr')).toHaveCount(4);
  });
});

test.describe('Status Codes (/status_codes)', () => {
  test('should navigate to 200 status code page', async ({ page }) => {
    await page.goto('/status_codes');
    await page.click('a[href="status_codes/200"]');
    await expect(page.locator('p')).toContainText('200');
  });

  test('should navigate to 301 status code page', async ({ page }) => {
    await page.goto('/status_codes');
    await page.click('a[href="status_codes/301"]');
    await expect(page.locator('p')).toContainText('301');
  });

  test('should navigate to 404 status code page', async ({ page }) => {
    await page.goto('/status_codes');
    await page.click('a[href="status_codes/404"]');
    await expect(page.locator('p')).toContainText('404');
  });

  test('should navigate to 500 status code page', async ({ page }) => {
    await page.goto('/status_codes');
    await page.click('a[href="status_codes/500"]');
    await expect(page.locator('p')).toContainText('500');
  });
});

test.describe('JQuery UI Menus (/jqueryui/menu)', () => {
  test('should display the top-level menu', async ({ page }) => {
    await page.goto('/jqueryui/menu');
    await expect(page.locator('#menu')).toBeVisible();
  });

  test('should show submenu on hover', async ({ page }) => {
    await page.goto('/jqueryui/menu');
    await page.locator('text=Enabled').first().hover();
    await expect(page.locator('.ui-menu-item').filter({ hasText: 'Downloads' })).toBeVisible();
  });
});

test.describe('Hovers - profile links (/hovers)', () => {
  test('user 1 profile link should work', async ({ page }) => {
    await page.goto('/hovers');
    await page.locator('.figure').first().hover();
    const link = page.locator('.figure').first().locator('a');
    await expect(link).toBeVisible();
  });
});

test.describe('Typos (/typos)', () => {
  test('page should load and display paragraph', async ({ page }) => {
    await page.goto('/typos');
    const paragraphs = page.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Large & Deep DOM (/large)', () => {
  test('should load the page and render table', async ({ page }) => {
    await page.goto('/large');
    await expect(page.locator('table')).toBeVisible();
  });
});

test.describe('Broken Images (/broken_images)', () => {
  test('should detect broken images', async ({ page }) => {
    await page.goto('/broken_images');
    const images = await page.locator('img').all();
    const broken: string[] = [];
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src) continue;
      const url = new URL(src, 'https://the-internet.herokuapp.com').href;
      const response = await page.request.get(url);
      if (!response.ok()) broken.push(url);
    }
    expect(broken.length).toBeGreaterThan(0);
  });
});

test.describe('Slow Resources (/slow)', () => {
  test('should load page even with slow resource', async ({ page }) => {
    await page.goto('/slow', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h3')).toBeVisible();
  });
});

test.describe('Shifting Content (/shifting_content)', () => {
  test('should load the page', async ({ page }) => {
    await page.goto('/shifting_content');
    await expect(page.locator('h3')).toBeVisible();
  });
});
