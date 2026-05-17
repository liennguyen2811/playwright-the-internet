import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AlertsPage extends BasePage {
  readonly alertButton: Locator = this.page.locator('button[onclick="jsAlert()"]');
  readonly confirmButton: Locator = this.page.locator('button[onclick="jsConfirm()"]');
  readonly promptButton: Locator = this.page.locator('button[onclick="jsPrompt()"]');
  readonly result: Locator = this.page.locator('#result');

  async navigate() {
    await this.goto('/javascript_alerts');
  }

  async triggerAlert() {
    this.page.once('dialog', (d) => d.accept());
    await this.alertButton.click();
  }

  async acceptConfirm() {
    this.page.once('dialog', (d) => d.accept());
    await this.confirmButton.click();
  }

  async dismissConfirm() {
    this.page.once('dialog', (d) => d.dismiss());
    await this.confirmButton.click();
  }

  async fillAndAcceptPrompt(text: string) {
    this.page.once('dialog', (d) => d.accept(text));
    await this.promptButton.click();
  }

  async dismissPrompt() {
    this.page.once('dialog', (d) => d.dismiss());
    await this.promptButton.click();
  }
}
