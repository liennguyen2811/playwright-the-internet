import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly heading: Locator = this.page.locator('h1');
  readonly featureLinks: Locator = this.page.locator('ul li a');

  async navigate() {
    await this.goto('/');
  }

  async getAllLinkHrefs(): Promise<string[]> {
    return this.featureLinks.evaluateAll(
      (els) => els.map((el) => (el as HTMLAnchorElement).href),
    );
  }
}
