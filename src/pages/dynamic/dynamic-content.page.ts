import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class DynamicContentPage extends BasePage {
  readonly contentRows: Locator = this.page.locator('.row .large-10');

  async navigate() {
    await this.goto('/dynamic_content');
  }

  async getContentTexts(): Promise<string[]> {
    return this.contentRows.allTextContents();
  }

  async reload() {
    await this.page.reload();
  }
}
