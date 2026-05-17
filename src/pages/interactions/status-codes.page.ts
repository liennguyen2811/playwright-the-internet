import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class StatusCodesPage extends BasePage {
  readonly description: Locator = this.page.locator('p');

  async navigate() {
    await this.goto('/status_codes');
  }

  async clickStatusCode(code: number) {
    await this.page.click(`a[href="status_codes/${code}"]`);
  }
}
