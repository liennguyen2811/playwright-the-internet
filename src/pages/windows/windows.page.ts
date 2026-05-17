import { BrowserContext, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class WindowsPage extends BasePage {
  readonly newWindowLink: Locator = this.page.locator('a[href="/windows/new"]');

  async navigate() {
    await this.goto('/windows');
  }

  async openNewWindow(context: BrowserContext): Promise<Page> {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.newWindowLink.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
