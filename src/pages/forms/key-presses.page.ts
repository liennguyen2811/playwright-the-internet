import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class KeyPressesPage extends BasePage {
  readonly target: Locator = this.page.locator('#target');
  readonly result: Locator = this.page.locator('#result');

  async navigate() {
    await this.goto('/key_presses');
  }

  async pressKey(key: string) {
    await this.target.press(key);
  }
}
