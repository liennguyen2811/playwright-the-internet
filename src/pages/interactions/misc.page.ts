import { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class JQueryMenuPage extends BasePage {
  readonly menu: Locator = this.page.locator('#menu');

  async navigate() {
    await this.goto('/jqueryui/menu');
  }

  async hoverEnabled() {
    await this.page.locator('text=Enabled').first().hover();
  }

  getMenuItem(text: string): Locator {
    return this.page.locator('.ui-menu-item').filter({ hasText: text });
  }
}

export class TyposPage extends BasePage {
  readonly paragraphs: Locator = this.page.locator('p');

  async navigate() {
    await this.goto('/typos');
  }
}

export class LargeDomPage extends BasePage {
  readonly table: Locator = this.page.locator('table');

  async navigate() {
    await this.goto('/large');
  }
}

export class BrokenImagesPage extends BasePage {
  readonly images: Locator = this.page.locator('img');

  async navigate() {
    await this.goto('/broken_images');
  }

  async getBrokenImageUrls(): Promise<string[]> {
    const imgs = await this.images.all();
    const broken: string[] = [];
    for (const img of imgs) {
      const src = await img.getAttribute('src');
      if (!src) continue;
      const url = new URL(src, 'https://the-internet.herokuapp.com').href;
      const response = await this.page.request.get(url);
      if (!response.ok()) broken.push(url);
    }
    return broken;
  }
}

export class SlowPage extends BasePage {
  readonly heading: Locator = this.page.locator('h3');

  async navigate() {
    await this.goto('/slow', { waitUntil: 'domcontentloaded' });
  }
}

export class ShiftingContentPage extends BasePage {
  readonly heading: Locator = this.page.locator('h3');

  async navigate() {
    await this.goto('/shifting_content');
  }
}
