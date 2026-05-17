import { test, expect } from '../../src/fixtures';

test.describe('Dynamic Loading (/dynamic_loading)', () => {
  test('Example 1: hidden element - should reveal content after start', async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.navigateToExample(1);
    await dynamicLoadingPage.clickStart();
    await expect(dynamicLoadingPage.finishElement).toBeVisible({ timeout: 15_000 });
    await expect(dynamicLoadingPage.finishHeading).toHaveText('Hello World!');
  });

  test('Example 2: rendered after the fact - should load content after start', async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.navigateToExample(2);
    await dynamicLoadingPage.clickStart();
    await expect(dynamicLoadingPage.finishElement).toBeVisible({ timeout: 15_000 });
    await expect(dynamicLoadingPage.finishHeading).toHaveText('Hello World!');
  });
});

test.describe('Dynamic Controls (/dynamic_controls)', () => {
  test.beforeEach(async ({ dynamicControlsPage }) => {
    await dynamicControlsPage.navigate();
  });

  test('should add and remove checkbox', async ({ dynamicControlsPage }) => {
    await dynamicControlsPage.toggleCheckbox();
    await expect(dynamicControlsPage.checkbox).toHaveCount(0, { timeout: 10_000 });
    await expect(dynamicControlsPage.message).toContainText("It's gone!");

    await dynamicControlsPage.toggleCheckbox();
    await expect(dynamicControlsPage.checkbox).toBeVisible({ timeout: 10_000 });
    await expect(dynamicControlsPage.message).toContainText("It's back!");
  });

  test('should enable and disable input', async ({ dynamicControlsPage }) => {
    await expect(dynamicControlsPage.input).toBeDisabled();

    await dynamicControlsPage.toggleInput();
    await expect(dynamicControlsPage.input).toBeEnabled({ timeout: 10_000 });
    await expect(dynamicControlsPage.message).toContainText("It's enabled!");
    await dynamicControlsPage.input.fill('Playwright');
    await expect(dynamicControlsPage.input).toHaveValue('Playwright');

    await dynamicControlsPage.toggleInput();
    await expect(dynamicControlsPage.input).toBeDisabled({ timeout: 10_000 });
    await expect(dynamicControlsPage.message).toContainText("It's disabled!");
  });
});

test.describe('Dynamic Content (/dynamic_content)', () => {
  test.beforeEach(async ({ dynamicContentPage }) => {
    await dynamicContentPage.navigate();
  });

  test('should display 3 content rows', async ({ dynamicContentPage }) => {
    await expect(dynamicContentPage.contentRows).toHaveCount(3);
  });

  test('content should change on reload', async ({ dynamicContentPage }) => {
    const texts = await dynamicContentPage.getContentTexts();
    await dynamicContentPage.reload();
    const newTexts = await dynamicContentPage.getContentTexts();
    expect(texts).not.toEqual(newTexts);
  });
});

test.describe('A/B Testing (/abtest)', () => {
  test('should show A or B variant heading', async ({ abTestPage }) => {
    await abTestPage.navigate();
    const text = await abTestPage.heading.textContent();
    expect(text).toMatch(/A\/B Test/);
  });
});

test.describe('Redirect (/redirector)', () => {
  test('should redirect to the status codes page', async ({ redirectPage, page }) => {
    await redirectPage.navigate();
    await redirectPage.clickRedirect();
    await expect(page).toHaveURL('/status_codes');
  });
});

test.describe('Entry Ad (/entry_ad)', () => {
  test('should show a modal on page load', async ({ entryAdPage }) => {
    await entryAdPage.navigate();
    await expect(entryAdPage.modal).toBeVisible({ timeout: 10_000 });
  });

  test('should close the modal', async ({ entryAdPage }) => {
    await entryAdPage.navigate();
    await entryAdPage.closeModal();
    await expect(entryAdPage.modal).toBeHidden();
  });
});

test.describe('Exit Intent (/exit_intent)', () => {
  test('page should load without errors', async ({ exitIntentPage }) => {
    await exitIntentPage.navigate();
    await expect(exitIntentPage.heading).toContainText('Exit Intent');
  });
});
