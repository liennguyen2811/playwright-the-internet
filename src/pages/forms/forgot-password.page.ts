import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator = this.page.locator('#email');
  readonly submitButton: Locator = this.page.locator('#form_submit');

  async navigate() {
    await this.goto('/forgot_password');
  }

  async submitEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}
