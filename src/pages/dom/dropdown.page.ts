import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class DropdownPage extends BasePage {
  readonly dropdown: Locator = this.page.locator('#dropdown');

  async navigate() {
    await this.goto('/dropdown');
  }

  async selectOption(value: string) {
    await this.dropdown.selectOption(value);
  }
}
