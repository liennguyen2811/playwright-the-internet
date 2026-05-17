import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AbTestPage extends BasePage {
  readonly heading: Locator = this.page.locator('h3');

  async navigate() {
    await this.goto('/abtest');
  }
}

export class RedirectPage extends BasePage {
  readonly redirectLink: Locator = this.page.locator('a#redirect');

  async navigate() {
    await this.goto('/redirector');
  }

  async clickRedirect() {
    await this.redirectLink.click();
  }
}

export class EntryAdPage extends BasePage {
  readonly modal: Locator = this.page.locator('.modal');
  readonly closeButton: Locator = this.page.locator('.modal-footer p');

  async navigate() {
    await this.goto('/entry_ad');
  }

  async closeModal() {
    await this.closeButton.click();
  }
}

export class ExitIntentPage extends BasePage {
  readonly heading: Locator = this.page.locator('h3');

  async navigate() {
    await this.goto('/exit_intent');
  }
}
