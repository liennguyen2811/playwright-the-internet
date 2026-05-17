import { test, expect } from '../../src/fixtures';

test.describe('Multiple Windows (/windows)', () => {
  test('should open a new window and verify content', async ({ windowsPage, context }) => {
    await windowsPage.navigate();
    const newPage = await windowsPage.openNewWindow(context);
    await expect(newPage.locator('h3')).toHaveText('New Window');
  });
});

test.describe('Frames (/frames)', () => {
  test('Nested Frames: should have top/middle/bottom frames', async ({ nestedFramesPage }) => {
    await nestedFramesPage.navigate();
    const topFrame = nestedFramesPage.getTopFrame();
    await expect(topFrame.frameLocator('[name="frame-left"]').locator('body')).toContainText('LEFT');
    await expect(topFrame.frameLocator('[name="frame-middle"]').locator('body')).toContainText('MIDDLE');
    await expect(topFrame.frameLocator('[name="frame-right"]').locator('body')).toContainText('RIGHT');
    await expect(nestedFramesPage.getBottomFrame().locator('body')).toContainText('BOTTOM');
  });

  test('iFrame: should allow typing inside iframe', async ({ iFramePage }) => {
    await iFramePage.navigate();
    await iFramePage.typeInEditor('Hello from iFrame test!');
    await expect(iFramePage.editorBody).toContainText('Hello from iFrame test!');
  });
});

test.describe('Geolocation (/geolocation)', () => {
  test('should show location when permission is granted', async ({ geolocationPage, context }) => {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 10.762622, longitude: 106.660172 });
    await geolocationPage.navigate();
    await geolocationPage.triggerGeolocation();
    await expect(geolocationPage.latValue).not.toHaveText('');
    await expect(geolocationPage.longValue).not.toHaveText('');
  });
});

test.describe('Shadow DOM (/shadowdom)', () => {
  test('should access text inside shadow DOM', async ({ shadowDomPage }) => {
    await shadowDomPage.navigate();
    const text = await shadowDomPage.getShadowText();
    expect(text).toBeTruthy();
  });
});

test.describe('Infinite Scroll (/infinite_scroll)', () => {
  test('should load more content on scroll', async ({ infiniteScrollPage }) => {
    await infiniteScrollPage.navigate();
    const initialCount = await infiniteScrollPage.addedItems.count();
    await infiniteScrollPage.scrollToBottom();
    const afterScrollCount = await infiniteScrollPage.addedItems.count();
    expect(afterScrollCount).toBeGreaterThanOrEqual(initialCount);
  });
});

test.describe('Floating Menu (/floating_menu)', () => {
  test('menu should remain visible after scrolling down', async ({ floatingMenuPage }) => {
    await floatingMenuPage.navigate();
    await floatingMenuPage.scrollDown();
    await expect(floatingMenuPage.menu).toBeVisible();
  });
});
