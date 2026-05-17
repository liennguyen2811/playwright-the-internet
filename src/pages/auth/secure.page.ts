import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class SecurePage extends BasePage {
  readonly successFlash: Locator = this.page.locator('.flash.success');
  readonly logoutButton: Locator = this.page.locator('a[href="/logout"]');

  async logout() {
    await this.logoutButton.click();
  }
}
