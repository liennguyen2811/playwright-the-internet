import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class DynamicControlsPage extends BasePage {
  readonly checkboxToggleButton: Locator = this.page.locator('#checkbox-example button');
  readonly checkbox: Locator = this.page.locator('#checkbox-example #checkbox');
  readonly inputToggleButton: Locator = this.page.locator('#input-example button');
  readonly input: Locator = this.page.locator('#input-example input');
  readonly message: Locator = this.page.locator('#message');

  async navigate() {
    await this.goto('/dynamic_controls');
  }

  async toggleCheckbox() {
    await this.checkboxToggleButton.click();
  }

  async toggleInput() {
    await this.inputToggleButton.click();
  }
}
