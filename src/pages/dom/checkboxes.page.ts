import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class CheckboxesPage extends BasePage {
  readonly checkbox1: Locator = this.page.locator('input[type="checkbox"]').nth(0);
  readonly checkbox2: Locator = this.page.locator('input[type="checkbox"]').nth(1);

  async navigate() {
    await this.goto('/checkboxes');
  }
}
