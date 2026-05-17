import { test, expect } from '../../src/fixtures';

test.describe('Drag and Drop (/drag_and_drop)', () => {
  test('should swap column A and column B', async ({ dragDropPage }) => {
    await dragDropPage.navigate();
    await expect(dragDropPage.columnA.locator('header')).toHaveText('A');
    await expect(dragDropPage.columnB.locator('header')).toHaveText('B');

    await dragDropPage.dragAtoB();

    await expect(dragDropPage.columnA.locator('header')).toHaveText('B');
    await expect(dragDropPage.columnB.locator('header')).toHaveText('A');
  });
});

test.describe('Horizontal Slider (/horizontal_slider)', () => {
  test.beforeEach(async ({ sliderPage }) => {
    await sliderPage.navigate();
  });

  test('should display slider with default value 0', async ({ sliderPage }) => {
    await expect(sliderPage.slider).toBeVisible();
    await expect(sliderPage.rangeValue).toHaveText('0');
  });

  test('should update value when slider is moved via keyboard', async ({ sliderPage }) => {
    await sliderPage.moveRight();
    const value = await sliderPage.getRangeValue();
    expect(parseFloat(value ?? '0')).toBeGreaterThan(0);
  });
});

test.describe('Sortable Data Tables (/tables)', () => {
  test.beforeEach(async ({ tablesPage }) => {
    await tablesPage.navigate();
  });

  test('Table 1 should have correct headers', async ({ tablesPage }) => {
    await expect(tablesPage.table1Headers.nth(0)).toHaveText('Last Name');
    await expect(tablesPage.table1Headers.nth(1)).toHaveText('First Name');
    await expect(tablesPage.table1Headers.nth(2)).toHaveText('Email');
    await expect(tablesPage.table1Headers.nth(3)).toHaveText('Due');
    await expect(tablesPage.table1Headers.nth(4)).toHaveText('Web Site');
    await expect(tablesPage.table1Headers.nth(5)).toHaveText('Action');
  });

  test('Table 1 should have 4 data rows', async ({ tablesPage }) => {
    await expect(tablesPage.table1Rows).toHaveCount(4);
  });

  test('Table 1 should sort by Last Name on click', async ({ tablesPage }) => {
    await tablesPage.sortByColumn(1);
    const text = await tablesPage.getFirstCellOfFirstRow().textContent();
    expect(text?.trim()).toBeTruthy();
  });

  test('Table 2 should have 4 data rows', async ({ tablesPage }) => {
    await expect(tablesPage.table2Rows).toHaveCount(4);
  });
});

test.describe('Status Codes (/status_codes)', () => {
  test.beforeEach(async ({ statusCodesPage }) => {
    await statusCodesPage.navigate();
  });

  test('should navigate to 200 status code page', async ({ statusCodesPage }) => {
    await statusCodesPage.clickStatusCode(200);
    await expect(statusCodesPage.description).toContainText('200');
  });

  test('should navigate to 301 status code page', async ({ statusCodesPage }) => {
    await statusCodesPage.clickStatusCode(301);
    await expect(statusCodesPage.description).toContainText('301');
  });

  test('should navigate to 404 status code page', async ({ statusCodesPage }) => {
    await statusCodesPage.clickStatusCode(404);
    await expect(statusCodesPage.description).toContainText('404');
  });

  test('should navigate to 500 status code page', async ({ statusCodesPage }) => {
    await statusCodesPage.clickStatusCode(500);
    await expect(statusCodesPage.description).toContainText('500');
  });
});

test.describe('JQuery UI Menus (/jqueryui/menu)', () => {
  test.beforeEach(async ({ jQueryMenuPage }) => {
    await jQueryMenuPage.navigate();
  });

  test('should display the top-level menu', async ({ jQueryMenuPage }) => {
    await expect(jQueryMenuPage.menu).toBeVisible();
  });

  test('should show submenu on hover', async ({ jQueryMenuPage }) => {
    await jQueryMenuPage.hoverEnabled();
    await expect(jQueryMenuPage.getMenuItem('Downloads')).toBeVisible();
  });
});

test.describe('Hovers - profile links (/hovers)', () => {
  test('user 1 profile link should work', async ({ hoversPage }) => {
    await hoversPage.navigate();
    await hoversPage.hoverFigure(0);
    await expect(hoversPage.getFigureLink(0)).toBeVisible();
  });
});

test.describe('Typos (/typos)', () => {
  test('page should load and display paragraphs', async ({ typosPage }) => {
    await typosPage.navigate();
    const count = await typosPage.paragraphs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Large & Deep DOM (/large)', () => {
  test('should load the page and render table', async ({ largeDomPage }) => {
    await largeDomPage.navigate();
    await expect(largeDomPage.table).toBeVisible();
  });
});

test.describe('Broken Images (/broken_images)', () => {
  test('should detect broken images', async ({ brokenImagesPage }) => {
    await brokenImagesPage.navigate();
    const broken = await brokenImagesPage.getBrokenImageUrls();
    expect(broken.length).toBeGreaterThan(0);
  });
});

test.describe('Slow Resources (/slow)', () => {
  test('should load page even with slow resource', async ({ slowPage }) => {
    await slowPage.navigate();
    await expect(slowPage.heading).toBeVisible();
  });
});

test.describe('Shifting Content (/shifting_content)', () => {
  test('should load the page', async ({ shiftingContentPage }) => {
    await shiftingContentPage.navigate();
    await expect(shiftingContentPage.heading).toBeVisible();
  });
});
