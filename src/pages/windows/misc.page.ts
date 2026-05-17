import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class GeolocationPage extends BasePage {
  readonly triggerButton: Locator = this.page.locator('button');
  readonly latValue: Locator = this.page.locator('#lat-value');
  readonly longValue: Locator = this.page.locator('#long-value');

  async navigate() {
    await this.goto('/geolocation');
  }

  async triggerGeolocation() {
    await this.triggerButton.click();
  }
}

export class ShadowDomPage extends BasePage {
  async navigate() {
    await this.goto('/shadowdom');
  }

  async getShadowText(): Promise<string | null | undefined> {
    return this.page.locator('my-paragraph').first().evaluate(
      (el) => el.shadowRoot?.textContent?.trim(),
    );
  }
}

export class InfiniteScrollPage extends BasePage {
  readonly addedItems: Locator = this.page.locator('.jscroll-added');

  async navigate() {
    await this.goto('/infinite_scroll');
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(1500);
  }
}

export class FloatingMenuPage extends BasePage {
  readonly menu: Locator = this.page.locator('#menu');

  async navigate() {
    await this.goto('/floating_menu');
  }

  async scrollDown(pixels = 1000) {
    await this.page.evaluate((y) => window.scrollTo(0, y), pixels);
  }
}
