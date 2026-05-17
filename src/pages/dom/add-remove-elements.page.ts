import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AddRemoveElementsPage extends BasePage {
  readonly addButton: Locator = this.page.locator('button[onclick="addElement()"]');
  readonly deleteButtons: Locator = this.page.locator('.added-manually');

  async navigate() {
    await this.goto('/add_remove_elements/');
  }

  async addElement() {
    await this.addButton.click();
  }

  async removeElement(index = 0) {
    await this.deleteButtons.nth(index).click();
  }
}
