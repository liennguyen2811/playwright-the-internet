import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class InputsPage extends BasePage {
  readonly numberInput: Locator = this.page.locator('input[type="number"]');

  async navigate() {
    await this.goto('/inputs');
  }

  async fill(value: string) {
    await this.numberInput.fill(value);
  }

  async typeSequentially(value: string) {
    await this.numberInput.pressSequentially(value);
  }

  async pressKey(key: string) {
    await this.numberInput.press(key);
  }
}
