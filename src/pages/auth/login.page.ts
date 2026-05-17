import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator = this.page.locator('#username');
  readonly passwordInput: Locator = this.page.locator('#password');
  readonly submitButton: Locator = this.page.locator('button[type="submit"]');
  readonly errorFlash: Locator = this.page.locator('.flash.error');
  readonly successFlash: Locator = this.page.locator('.flash.success');

  async navigate() {
    await this.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
